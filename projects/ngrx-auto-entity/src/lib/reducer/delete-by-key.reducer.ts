import { EntityActionTypes } from '../actions/action-types';
import { DeleteByKeySuccess } from '../actions/delete-by-key-actions';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { cloneEntities, deleteSingle, setNewState } from './reduction.utils';

export const deleteByKeyReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.DeleteByKey: {
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
    case EntityActionTypes.DeleteByKeyFailure: {
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
    case EntityActionTypes.DeleteByKeySuccess: {
      const deleteKey = (action as DeleteByKeySuccess<any>).key;
      const clonedEntities = cloneEntities(entityState.entities);
      const entities = deleteSingle(clonedEntities || {}, deleteKey);
      const ids = entityState.ids.filter(eid => eid in entities);

      // Better to NOT delete the entity key, but set it to undefined,
      // to avoid re-generating the underlying runtime class (TODO: find and add link to V8 jit and runtime)
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
