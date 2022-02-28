import { EntityActionTypes } from '../actions/action-types';
import { DeleteSuccess } from '../actions/delete-actions';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { cloneEntities, deleteSingle, safeGetKey, setNewState } from './reduction.utils';

export const deleteReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.Delete: {
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
    case EntityActionTypes.DeleteFailure: {
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
    case EntityActionTypes.DeleteSuccess: {
      const deleteEntity = (action as DeleteSuccess<any>).entity;
      const deleteKey = safeGetKey(action, deleteEntity);
      const entities = cloneEntities(entityState.entities);
      const ids = entityState.ids.filter(eid => eid !== deleteKey);

      // Better to NOT delete the entity key, but set it to undefined,
      // to avoid re-generating the underlying runtime class (TODO: find and add link to V8 jit and runtime)
      const newState: IEntityState<any> = {
        ...entityState,
        entities: deleteSingle(entities || {}, deleteKey),
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
