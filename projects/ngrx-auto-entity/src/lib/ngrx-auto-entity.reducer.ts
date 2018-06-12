import { ActionReducer } from '@ngrx/store';

import { EntityAction, EntityActionTypes } from './ngrx-auto-entity.actions';

export function reactiveEntityMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    switch (action.type) {
      case EntityActionTypes.LoadSuccess: {
        const stateName = (action as EntityAction).info.modelName;
        const entityState = state[stateName];
        // TODO: Merge in single object into appropriate entity state
        return { ...state, [stateName]: entityState };
      }
      case EntityActionTypes.LoadManySuccess: {
        const stateName = (action as EntityAction).info.modelName;
        const entityState = state[stateName];
        // TODO: Merge in array of objects into appropriate entity state
        return { ...state, [stateName]: entityState };
      }
      case EntityActionTypes.CreateSuccess: {
        const stateName = (action as EntityAction).info.modelName;
        const entityState = state[stateName];
        // TODO: Add new object into appropriate entity state
        return { ...state, [stateName]: entityState };
      }
      case EntityActionTypes.UpdateSuccess: {
        const stateName = (action as EntityAction).info.modelName;
        const entityState = state[stateName];
        // TODO: Update existing object in entity state
        return { ...state, [stateName]: entityState };
      }
      case EntityActionTypes.DeleteSuccess: {
        const stateName = (action as EntityAction).info.modelName;
        const entityState = state[stateName];
        // TODO: Remove existing object in entity state
        return { ...state, [stateName]: entityState };
      }
    }

    return reducer(state, action);
  };
}
