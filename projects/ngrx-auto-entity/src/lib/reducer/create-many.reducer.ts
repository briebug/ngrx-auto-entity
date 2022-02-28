import { EntityActionTypes } from '../actions/action-types';
import { CreateManySuccess } from '../actions/create-actions';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { cloneEntities, cloneIds, mergeMany, pushMany, setNewState } from './reduction.utils';

export const createManyReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.CreateMany: {
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
    case EntityActionTypes.CreateManyFailure: {
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
    case EntityActionTypes.CreateManySuccess: {
      const createdEntities = (action as CreateManySuccess<any>).entities;
      const entities = cloneEntities(entityState.entities);
      const ids = cloneIds(entityState.ids);

      const newState: IEntityState<any> = {
        ...entityState,
        entities: mergeMany(entities, createdEntities, action),
        ids: pushMany(ids, createdEntities, action),
        tracking: {
          ...entityState.tracking,
          isSaving: false,
          createdAt: Date.now()
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
  }
};
