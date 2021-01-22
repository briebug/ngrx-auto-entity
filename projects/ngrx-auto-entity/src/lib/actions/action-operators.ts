import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { merge, Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

import { EntityActionTypes } from './action-types';
import { EntityAction, IEntityAction } from './entity-action';
import { isEntityActionInstance } from './entity-actions-union';
import { setType } from './util';

/**
 * Operator to filter actions by an entity action type or multiple action types.
 *
 * @param allowedActionTypes One or more action type string constants
 */
export function ofEntityAction<T extends IEntityAction>(...allowedActionTypes: EntityActionTypes[]): OperatorFunction<Action, T> {
  return filter((action: IEntityAction): action is T => {
    return isEntityActionInstance(action) ? allowedActionTypes.some(type => setType(type, action.info) === action.type) : false;
  });
}

/**
 * Operator to filter actions by an entity and action type or multiple action types.
 *
 * @param entity The entity class
 * @param allowedActionTypes One or more action type string constants
 */
export function ofEntityType<TModel, T extends EntityAction<TModel>>(
  entity: new () => TModel,
  ...allowedActionTypes: EntityActionTypes[]
): OperatorFunction<Action, T> {
  return filter((action: EntityAction<TModel>): action is T => {
    return isEntityActionInstance(action)
      ? action.info.modelType === entity && allowedActionTypes.some(type => setType(type, action.info) === action.type)
      : false;
  });
}

/**
 * Operator to filter many actions by entity type and entity action types.
 *
 * @param actions$ The NgRx effects Actions stream
 * @param entity The entity types to filter for
 * @param allowedActionTypes The entity actions to filter for
 */
export function fromEntityActions<T extends EntityAction<any>>(
  actions$: Actions,
  entity: Array<new () => any>,
  ...allowedActionTypes: EntityActionTypes[]
): Observable<Action> {
  const entityActions = entity.map(e => actions$.pipe(ofEntityType(e, ...allowedActionTypes)));
  return merge(...entityActions);
}
