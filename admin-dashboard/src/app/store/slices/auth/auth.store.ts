import{createReducer, on,createAction,props,createFeatureSelector, createSelector, createFeature}from'@ngrx/store';


// Define actions for authentication
export const actions={
 login:createAction(
  '[Auth] Login',
  props<{username:string;password:string}>()
),
 loginSuccess:createAction(
  '[Auth] Login Success',
  props<{token:string;user:User}>()
),
loginFailure:createAction(
  '[Auth] Login Failure',
  props<{error:string}>()
),
logout:createAction(
  '[Auth] Logout'
)
}
export const featureKey = 'auth';
export interface User {
  id: number;
  username: string;
  password: string;//check if this is needed
  role: string;
  name: string;
  profilePictureUrl?: string; // Optional field for user's profile picture URL

}

export interface AuthState {
  token: string|null;
  user: User|null;
  error: string|null;
  loading: boolean;
}


// Define the initial state for authentication
export const initialAuthState: AuthState = {
  token:null,
  user:null,
  loading: false,
  error: null,
}
// Create a reducer to handle authentication actions
export const authReducer=createReducer(
  initialAuthState,
  on(actions.login, (state) => ({
    ...state,
    loading: true,//start spinner
    error: null,
  })),
  on(
    actions.loginSuccess, (state, { token, user }) => ({
      ...state,
      token:token,
      user:user,
      loading: false,//stop spinner
      error: null,
    })),
    on(actions.loginFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    })),
    on(actions.logout, (state) => ({
      ...state,
      token: null,
      user: null,
      error: null,
      loading: false,
    }))
  )




  // selectors
export const authFeatures = createFeature({
  name: featureKey,
  reducer: authReducer
})



