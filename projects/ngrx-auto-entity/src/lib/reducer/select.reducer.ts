import { EntityActionTypes } from '../actions/action-types';
import { Select, SelectByKey } from '../actions/selection-actions';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { safeGetKey, setNewState } from './reduction.utils';

export const selectReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.Select: {
      const selectEntity = (action as Select<any>).entity;
      if (!selectEntity) {
        return state;
      }

      const selectKey = safeGetKey(action, selectEntity);
      const newState: IEntityState<any> = {
        ...entityState,
        selections: {
          ...entityState.selections,
          currentEntityKey: selectKey
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.SelectByKey: {
      const selectByKeyKey = (action as SelectByKey<any>).entityKey;
      if (!selectByKeyKey) {
        return state;
      }

      const newState: IEntityState<any> = {
        ...entityState,
        selections: {
          ...entityState.selections,
          currentEntityKey: selectByKeyKey
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
  }
};
