import * as auth from '../store/slices/auth/auth.store';
import { featureKey } from '../store/slices/auth/auth.store';
/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {

  [auth.featureKey]: auth.AuthState;

}
