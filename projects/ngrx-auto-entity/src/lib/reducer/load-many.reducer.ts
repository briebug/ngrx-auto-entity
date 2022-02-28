import { EntityActionTypes } from '../actions/action-types';
import { LoadManySuccess } from '../actions/load-many-actions';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { cloneEntities, cloneIds, mergeMany, pushManyUnique, safeGetKey, setNewState } from './reduction.utils';

export const loadManyReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.LoadMany: {
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
    case EntityActionTypes.LoadManyFailure: {
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
    case EntityActionTypes.LoadManySuccess: {
      const loadManyEntities = (action as LoadManySuccess<any>).entities;
      const loadedIds = loadManyEntities.map(entity => safeGetKey(action, entity));
      const entities = cloneEntities(entityState.entities);
      const ids = cloneIds(entityState.ids);

      const newState: IEntityState<any> = {
        ...entityState,
        ids: pushManyUnique(entities, ids, loadedIds), // ALERT: IDS FIRST!!
        entities: mergeMany(entities, loadManyEntities, action), // ALERT: Then entities!
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
