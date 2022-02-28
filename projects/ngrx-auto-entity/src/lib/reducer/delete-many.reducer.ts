import { EntityActionTypes } from '../actions/action-types';
import { DeleteManySuccess } from '../actions/delete-actions';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { cloneEntities, deleteMany, safeGetKey, setNewState } from './reduction.utils';

export const deleteManyReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.DeleteMany: {
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
    case EntityActionTypes.DeleteManyFailure: {
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
    case EntityActionTypes.DeleteManySuccess: {
      const deleteManyEntities = (action as DeleteManySuccess<any>).entities;
      const deletedIds = deleteManyEntities.map(entity => safeGetKey(action, entity));
      const clonedEntities = cloneEntities(entityState.entities);
      const entities = deleteMany(clonedEntities, deletedIds);
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
