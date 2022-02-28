import { EntityActionTypes } from '../actions/action-types';
import { DeleteManyByKeysSuccess } from '../actions/delete-by-key-actions';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { cloneEntities, deleteMany, setNewState } from './reduction.utils';

export const deleteManyByKeysReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.DeleteManyByKeys: {
      const newState: IEntityState<any> = {
        ...entityState,
        tracking: {
          ...entityState.tracking,
          isDeleting: true
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.DeleteManyByKeysFailure: {
      const newState: IEntityState<any> = {
        ...entityState,
        tracking: {
          ...entityState.tracking,
          isDeleting: false
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.DeleteManyByKeysSuccess: {
      const deleteKeys = (action as DeleteManyByKeysSuccess<any>).keys;
      const clonedEntities = cloneEntities(entityState.entities);
      const entities = deleteMany(clonedEntities, deleteKeys);
      const ids = entityState.ids.filter(eid => eid in entities);

      const newState: IEntityState<any> = {
        ...entityState,
        entities,
        ids,
        tracking: {
          ...entityState.tracking,
          isDeleting: false,
          deletedAt: Date.now()
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
  }
};
