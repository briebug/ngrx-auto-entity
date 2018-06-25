import { ActionReducer } from '@ngrx/store';
import { camelCase } from 'change-case';
import { clone } from 'ramda';

import { EntityAction, EntityActionTypes } from './ngrx-auto-entity.actions';
import { NAE_ID } from './ngrx-auto-entity.decorators';

function stateNameFromAction(action: EntityAction): string {
  return camelCase(action.info.modelName);
}

function keyName(action: EntityAction): string {
  return action.info.modelType.prototype[NAE_ID];
}

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
        const stateName = stateNameFromAction(action as EntityAction);
        const entityState = clone(state[stateName]);
        entityState.entities = action['entities'].reduce((acc, entity) => {
          const keyValue = entity[keyName(action as EntityAction)];
          acc[keyValue] = entity;
          entityState.ids.push(keyValue);
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
        const stateName = stateNameFromAction(action as EntityAction);
        const entityState = clone(state[stateName]);
        const key = keyName(action as EntityAction);
        const keyValue = action['entity'][key];
        delete entityState.entities[keyValue];
        entityState.ids = entityState.ids.filter(eid => eid !== keyValue);
        return { ...state, [stateName]: entityState };
      }
    }

    return reducer(state, action);
  };
}
