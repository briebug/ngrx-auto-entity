import { EntityActionTypes } from '../actions/action-types';
import { UpsertManySuccess } from '../actions/upsert-actions';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { cloneEntities, cloneIds, combineUnique, mergeMany, setNewState } from './reduction.utils';

export const upsertManyReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.UpsertMany: {
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
    case EntityActionTypes.UpsertManyFailure: {
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
    case EntityActionTypes.UpsertManySuccess: {
      const upsertManyEntities = (action as UpsertManySuccess<any>).entities;
      const entities = cloneEntities(entityState.entities);
      const ids = cloneIds(entityState.ids);

      const newState: IEntityState<any> = {
        ...entityState,
        ids: combineUnique(ids, entities, upsertManyEntities, action),
        entities: mergeMany(entities, upsertManyEntities, action),
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
