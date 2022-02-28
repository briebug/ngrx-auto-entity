import { ActionReducer } from '@ngrx/store';
import { EntityActions } from '../actions/entity-actions-union';
import { autoEntityReducer } from './reducer';

/**
 * Provides standard reducer functions to support entity store structure
 *
 * @param reducer: The next reducer to be applied
 */
export function autoEntityMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action: EntityActions<any>) => {
    return autoEntityReducer(reducer, state, action);
  };
}
