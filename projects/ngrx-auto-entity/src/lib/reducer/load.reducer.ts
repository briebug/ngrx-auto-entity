import { EntityActionTypes } from '../actions/action-types';
import { LoadSuccess } from '../actions/load-actions';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { cloneEntities, cloneIds, mergeSingle, pushUnique, safeGetKey, setNewState } from './reduction.utils';

export const loadReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.Load: {
      const newState: IEntityState<any> = {
        ...entityState,
        tracking: {
          ...entityState.tracking,
          isLoading: true
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.LoadFailure: {
      const newState: IEntityState<any> = {
        ...entityState,
        tracking: {
          ...entityState.tracking,
          isLoading: false
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.LoadSuccess: {
      const loadEntity = (action as LoadSuccess<any>).entity;
      const loadKey = safeGetKey(action, loadEntity);
      const entities = cloneEntities(entityState.entities);
      const ids = cloneIds(entityState.ids);

      const newState: IEntityState<any> = {
        ...entityState,
        ids: pushUnique(entities, ids, loadKey), // ALERT: IDS FIRST!!!
        entities: mergeSingle(entities, loadKey, loadEntity), // ALERT: Then entities!
        tracking: {
          ...entityState.tracking,
          isLoading: false,
          loadedAt: Date.now()
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
  }
};
