import { ActionReducer } from '@ngrx/store';
import { camelCase } from 'change-case';
import { clone } from 'ramda';
import { EntityAction, EntityActions, EntityActionTypes, LoadSuccess } from './ngrx-auto-entity.actions';
import { NAE_ID } from './ngrx-auto-entity.decorators';

function stateNameFromAction(action: EntityAction): string {
  return camelCase(action.info.modelName);
}

function keyName(action: EntityAction): string {
  return action.info.modelType.prototype[NAE_ID];
}

/**
 * Provides standard reducer functions to support entity store structure
 *
 * @param reducer
 */
export function reactiveEntityMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action: EntityActions<any>) => {
    switch (action.actionType) {
      case EntityActionTypes.LoadSuccess: {
        // get feature state property name
        const stateName = stateNameFromAction(action);

        // get feature state
        // todo: avoid any
        const entityState = state[stateName];

        // get entity
        const entity = (action as LoadSuccess<any>).entity;

        // get key
        // todo: support composite keys
        const key = entity[keyName(action)];

        // return new state
        return {
          ...state,
          [stateName]: {
            ...entityState,
            entities: {
              ...entityState.entities,
              [key]: entity
            },
            ids: [...entityState.ids, key]
          }
        };
      }

      case EntityActionTypes.LoadManySuccess: {
        const stateName = stateNameFromAction(action);
        const entityState = clone(state[stateName]);
        entityState.entities = action['entities'].reduce((acc, entity) => {
          const keyValue = entity[keyName(action)];
          acc[keyValue] = entity;
          entityState.ids.push(keyValue);
          return acc;
        }, entityState.entities);
        return { ...state, [stateName]: entityState };
      }

      case EntityActionTypes.CreateSuccess: {
        const stateName = action.info.modelName;
        const entityState = state[stateName];
        // TODO: Add new object into appropriate entity state
        return { ...state, [stateName]: entityState };
      }

      case EntityActionTypes.UpdateSuccess: {
        const stateName = action.info.modelName;
        const entityState = state[stateName];
        // TODO: Update existing object in entity state
        return { ...state, [stateName]: entityState };
      }

      case EntityActionTypes.DeleteSuccess: {
        const stateName = stateNameFromAction(action);
        const entityState = clone(state[stateName]);
        const key = keyName(action);
        const keyValue = action['entity'][key];
        delete entityState.entities[keyValue];
        entityState.ids = entityState.ids.filter(eid => eid !== keyValue);
        return { ...state, [stateName]: entityState };
      }
    }

    return reducer(state, action);
  };
}
