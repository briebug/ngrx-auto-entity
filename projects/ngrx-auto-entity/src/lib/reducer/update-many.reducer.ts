import { EntityActionTypes } from '../actions/action-types';
import { UpdateManySuccess } from '../actions/update-actions';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { cloneEntities, mergeMany, setNewState } from './reduction.utils';

export const updateManyReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.UpdateMany: {
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
    case EntityActionTypes.UpdateManyFailure: {
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
    case EntityActionTypes.UpdateManySuccess: {
      const updateManyEntities = (action as UpdateManySuccess<any>).entities;
      const entities = cloneEntities(entityState.entities);

      const newState: IEntityState<any> = {
        ...entityState,
        entities: mergeMany(entities, updateManyEntities, action),
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
