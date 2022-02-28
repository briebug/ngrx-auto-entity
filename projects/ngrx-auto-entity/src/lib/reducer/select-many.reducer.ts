import { EntityActionTypes } from '../actions/action-types';
import { SelectMany, SelectManyByKeys, SelectMore, SelectMoreByKeys } from '../actions/selection-actions';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { safeGetKey, setNewState } from './reduction.utils';

export const selectManyReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.SelectMany: {
      const selectManyEntities = (action as SelectMany<any>).entities || [];
      const selectingEntities = Array.isArray(selectManyEntities) ? selectManyEntities : [];
      const selectManyKeys = selectingEntities.map(entity => safeGetKey(action, entity));
      const newState: IEntityState<any> = {
        ...entityState,
        selections: {
          ...entityState.selections,
          currentEntitiesKeys: selectManyKeys
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.SelectMore: {
      const selectMoreEntities = (action as SelectMore<any>).entities || [];
      const selectingEntities = Array.isArray(selectMoreEntities) ? selectMoreEntities : [];
      const selectMoreKeys = selectingEntities.map(entity => safeGetKey(action, entity));
      const selectMoreCurrentKeys = entityState.selections.currentEntitiesKeys || [];
      const selectMoreCombinedKeys = new Set([...selectMoreCurrentKeys, ...selectMoreKeys]);
      const newState: IEntityState<any> = {
        ...entityState,
        selections: {
          ...entityState.selections,
          currentEntitiesKeys: [...selectMoreCombinedKeys]
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.SelectManyByKeys: {
      const selectManyByKeysKeys = (action as SelectManyByKeys<any>).entitiesKeys || [];
      const selectManyByKeysGuaranteedKeys = Array.isArray(selectManyByKeysKeys) ? selectManyByKeysKeys : [];
      const newState: IEntityState<any> = {
        ...entityState,
        selections: {
          ...entityState.selections,
          currentEntitiesKeys: selectManyByKeysGuaranteedKeys
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.SelectMoreByKeys: {
      const selectMoreByKeysKeys = (action as SelectMoreByKeys<any>).entitiesKeys || [];
      const selectMoreByKeysGuaranteedKeys = Array.isArray(selectMoreByKeysKeys) ? selectMoreByKeysKeys : [];
      const selectMoreByKeysCurrentKeys = entityState.selections.currentEntitiesKeys || [];
      const selectMoreByKeysCombinedKeys = new Set([...selectMoreByKeysCurrentKeys, ...selectMoreByKeysGuaranteedKeys]);
      const newState: IEntityState<any> = {
        ...entityState,
        selections: {
          ...entityState.selections,
          currentEntitiesKeys: [...selectMoreByKeysCombinedKeys]
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
  }
};
