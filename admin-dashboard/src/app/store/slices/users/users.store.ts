// src/app/store/user/user.actions.ts
import { createAction, createFeatureSelector, createSelector, props } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as UserActions from './users.store';




export const actions=
{
  loadUsers : createAction('[User] Load Users'),
  loadUsersSuccess : createAction(
  '[User] Load Users Success',
  props<{ users: any[] }>()
),
 loadUsersFailure : createAction(
  '[User] Load Users Failure',
  props<{ error: string }>()
),

 addUser : createAction(
  '[User] Add User',
  props<{ user: Omit<any, 'id'> }>()
),
 addUserSuccess : createAction(
  '[User] Add User Success',
  props<{ user: any }>()
),}
// src/app/store/user/user.reducer.ts

export interface UserState extends EntityState<any> {
  loading: boolean;
  error: string | null;
}

export const userAdapter = createEntityAdapter<any>();

export const initialState: UserState = userAdapter.getInitialState({
  loading: false,
  error: null
});

export const userReducer = createReducer(
  initialState,
  on(UserActions.actions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.actions.loadUsersSuccess, (state, { users }) =>
    userAdapter.setAll(users, { ...state, loading: false })
  ),
  on(UserActions.actions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UserActions.actions.addUserSuccess, (state, { user }) =>
    userAdapter.addOne(user, state)
  )
);
// selectors => selectAllUsers&selectUserLoading, selectUserError
// src/app/store/user/user.selectors.ts

// Select the entire user feature state
export const selectUserState = createFeatureSelector<UserState>('users');

// Get the selectors from the entity adapter
export const {
  selectAll: selectAllUsers,
  selectEntities: selectUserEntities,
  selectIds: selectUserIds,
  selectTotal: selectUserTotal
} = userAdapter.getSelectors(selectUserState);

// Select loading state
export const selectUserLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

// Select error state
export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

// Select user by ID
export const selectUserById = (id: number) => createSelector(
  selectUserEntities,
  (entities) => entities[id]
);

// Select total number of users
export const selectUsersCount = createSelector(
  selectUserTotal,
  (total) => total
);

// Select users with specific criteria (example: by name)
export const selectUsersByName = (name: string) => createSelector(
  selectAllUsers,
  (users) => users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()))
);

// Select loading and error combined
export const selectUserStatus = createSelector(
  selectUserLoading,
  selectUserError,
  (loading, error) => ({ loading, error })
);
