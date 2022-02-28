import { EntityActionTypes } from '../actions/action-types';
import { DeselectMany, DeselectManyByKeys } from '../actions/deselection-actions';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { safeGetKey, setNewState } from './reduction.utils';

export const deselectManyReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.DeselectMany: {
      const deselectManyEntities = (action as DeselectMany<any>).entities || [];
      const deselectingEntities = Array.isArray(deselectManyEntities) ? deselectManyEntities : [];
      const deselectManyEntityKeys = deselectingEntities.map(entity => safeGetKey(action, entity));
      const deselectManyCurrentKeys = entityState.selections.currentEntitiesKeys || [];
      const newState: IEntityState<any> = {
        ...entityState,
        selections: {
          ...entityState.selections,
          currentEntitiesKeys: deselectManyCurrentKeys.filter(key => !deselectManyEntityKeys.some(k => k === key))
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.DeselectManyByKeys: {
      const deselectManyByKeysKeys = (action as DeselectManyByKeys<any>).entitiesKeys || [];
      const deselectManyByKeysGuaranteedKeys = Array.isArray(deselectManyByKeysKeys) ? deselectManyByKeysKeys : [];
      const deselectManyByKeysCurrentKeys = entityState.selections.currentEntitiesKeys || [];

      const newState: IEntityState<any> = {
        ...entityState,
        selections: {
          ...entityState.selections,
          currentEntitiesKeys: deselectManyByKeysCurrentKeys.filter(key => !deselectManyByKeysGuaranteedKeys.some(k => k === key))
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.DeselectAll: {
      const newState: IEntityState<any> = {
        ...entityState,
        selections: {
          ...entityState.selections,
          currentEntitiesKeys: undefined
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
  }
};
