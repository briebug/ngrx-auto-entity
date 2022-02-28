import { EntityActionTypes } from '../actions/action-types';
import { UpdateSuccess } from '../actions/update-actions';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { cloneEntities, mergeSingle, safeGetKey, setNewState } from './reduction.utils';

export const updateReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.Update: {
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
    case EntityActionTypes.UpdateFailure: {
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
    case EntityActionTypes.UpdateSuccess: {
      const updateEntity = (action as UpdateSuccess<any>).entity;
      const updateKey = safeGetKey(action, updateEntity);
      const entities = cloneEntities(entityState.entities);

      const newState: IEntityState<any> = {
        ...entityState,
        entities: mergeSingle(entities, updateKey, updateEntity),
        tracking: {
          ...entityState.tracking,
          isSaving: false,
          savedAt: Date.now(),
          updatedAt: Date.now()
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
  }
};
