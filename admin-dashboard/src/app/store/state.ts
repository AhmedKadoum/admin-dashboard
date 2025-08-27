import * as auth from './slices/auth/auth.store';
import { featureKey } from './slices/auth/auth.store';
/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {

  [auth.featureKey]: auth.AuthState;

}
