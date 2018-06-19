import { ActionReducer } from '@ngrx/store';
import { camelCase } from 'change-case';
import { clone } from 'ramda';

import { EntityAction, EntityActionTypes } from './ngrx-auto-entity.actions';

export function reactiveEntityMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    switch (action['actionType']) {
      case EntityActionTypes.LoadSuccess: {
        const stateName = (action as EntityAction).info.modelName;
        const entityState = state[stateName];
        // TODO: Merge in single object into appropriate entity state
        return { ...state, [stateName]: entityState };
      }
      case EntityActionTypes.LoadManySuccess: {
        const stateName = camelCase((action as EntityAction).info.modelName);
        const entityState = clone(state[stateName]);
        entityState.entities = action['entities'].reduce((acc, entity) => {
          acc[entity.id] = entity;
          entityState.ids.push(entity.id);
          return acc;
        }, entityState.entities);
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
