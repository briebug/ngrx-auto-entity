import { EntityActionTypes } from '../actions/action-types';
import { ReplaceSuccess } from '../actions/replace-actions';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { cloneEntities, mergeSingle, safeGetKey, setNewState } from './reduction.utils';

export const replaceReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.Replace: {
      const newState: IEntityState<any> = {
        ...entityState,
        tracking: {
          ...entityState.tracking,
          isSaving: true
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.ReplaceFailure: {
      const newState: IEntityState<any> = {
        ...entityState,
        tracking: {
          ...entityState.tracking,
          isSaving: false
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.ReplaceSuccess: {
      const replaceEntity = (action as ReplaceSuccess<any>).entity;
      const replaceKey = safeGetKey(action, replaceEntity);
      const entities = cloneEntities(entityState.entities);

      const newState: IEntityState<any> = {
        ...entityState,
        entities: mergeSingle(entities, replaceKey, replaceEntity),
        tracking: {
          ...entityState.tracking,
          isSaving: false,
          savedAt: Date.now(),
          replacedAt: Date.now()
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
  }
};
