import { EntityActionTypes } from '../actions/action-types';
import { ReplaceManySuccess } from '../actions/replace-actions';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { cloneEntities, mergeMany, setNewState } from './reduction.utils';

export const replaceManyReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.ReplaceMany: {
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
    case EntityActionTypes.ReplaceManyFailure: {
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
    case EntityActionTypes.ReplaceManySuccess: {
      const replaceManyEntities = (action as ReplaceManySuccess<any>).entities;
      const entities = cloneEntities(entityState.entities);

      const newState: IEntityState<any> = {
        ...entityState,
        entities: mergeMany(entities, replaceManyEntities, action),
        tracking: {
          ...entityState.tracking,
          isSaving: false,
          savedAt: Date.now(),
          replacedAt: Date.now()
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
  }
};
