import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as auth from './slices/auth/auth.store';
import * as category from './slices/categories/category.store';
import * as medication from './slices/medications/medication.store';
// import * as test from './slices/test/test.store';
// import * as user from './slices/users/users.store';
import { userReducer } from './slices/users/users.store';
import { categoriesFeature } from './slices/categories/category.store';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all the exports into a single object.
 */

export const rootReducers: ActionReducerMap<any> = {
  [auth.featureKey]: auth.authReducer,
  // test:test.testReducer,
  // users:user.userReducer,
  [category.featureKey]: category.reducer,
  [medication.featureKey]:medication.reducer,
};

// export const metaReducers: MetaReducer<any>[] = [];
