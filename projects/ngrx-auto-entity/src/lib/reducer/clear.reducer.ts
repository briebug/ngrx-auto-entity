import { EntityActionTypes } from '../actions/action-types';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { setNewState } from './reduction.utils';

export const clearReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.Clear: {
      const newState: IEntityState<any> = {
        // If the developer has included their own extra state properties with buildState(Entity, { /* custom */ })
        // then we don't want to mess with it. We want to leave any custom developer state as-is!
        // Spread in the current state to ensure we KEEP custom developer-defined extra state properties:
        ...entityState,
        // Now reset the auto-entity managed properties to their default states:
        entities: {},
        ids: [],
        selections: undefined,
        edits: undefined,
        paging: undefined,
        tracking: undefined
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
  }
};
