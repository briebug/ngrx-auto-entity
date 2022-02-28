import { EntityActionTypes } from '../actions/action-types';
import { UpsertSuccess } from '../actions/upsert-actions';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { cloneEntities, cloneIds, combineUnique, mergeSingle, safeGetKey, setNewState } from './reduction.utils';

export const upsertReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.Upsert: {
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
    case EntityActionTypes.UpsertFailure: {
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
    case EntityActionTypes.UpsertSuccess: {
      const upsertEntity = (action as UpsertSuccess<any>).entity;
      const upsertKey = safeGetKey(action, upsertEntity);
      const entities = cloneEntities(entityState.entities);
      const ids = cloneIds(entityState.ids);

      const newState: IEntityState<any> = {
        ...entityState,
        ids: combineUnique(ids, entities, [upsertEntity], action),
        entities: mergeSingle(entities, upsertKey, upsertEntity),
        tracking: {
          ...entityState.tracking,
          isSaving: false,
          savedAt: Date.now()
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
  }
};
