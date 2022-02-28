import { EntityActionTypes } from '../actions/action-types';
import { CreateSuccess } from '../actions/create-actions';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { cloneEntities, cloneIds, mergeSingle, pushSingle, safeGetKey, setNewState } from './reduction.utils';

export const createReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.Create: {
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
    case EntityActionTypes.CreateFailure: {
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
    case EntityActionTypes.CreateSuccess: {
      const createEntity = (action as CreateSuccess<any>).entity;
      const createKey = safeGetKey(action, createEntity);
      const entities = cloneEntities(entityState.entities);
      const ids = cloneIds(entityState.ids);

      const newState: IEntityState<any> = {
        ...entityState,
        entities: mergeSingle(entities, createKey, createEntity),
        ids: pushSingle(ids, createKey),
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
