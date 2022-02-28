import { EntityActionTypes } from '../actions/action-types';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { setNewState } from './reduction.utils';

export const deselectReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.Deselect: {
      const newState: IEntityState<any> = {
        ...entityState,
        selections: {
          ...entityState.selections,
          currentEntityKey: undefined
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
  }
};
