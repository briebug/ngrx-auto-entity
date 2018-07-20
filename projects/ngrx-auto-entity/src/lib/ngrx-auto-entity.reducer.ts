import { ActionReducer } from '@ngrx/store';
import { camelCase } from 'change-case';
import { EntityAction, EntityActions, EntityActionTypes, LoadSuccess, UpdateSuccess } from './ngrx-auto-entity.actions';
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
        return {
          ...state,
          [stateName]: {
            entities: action['entities'].reduce(
              (entities, entity) => ({
                ...entities,
                [entity[keyName(action)]]: entity
              }),
              {}
            ),
            ids: action['entities'].map(entity => entity[keyName(action)])
          }
        };
      }

      case EntityActionTypes.CreateSuccess: {
        const stateName = action.info.modelName;
        const entityState = state[stateName];
        // TODO: Add new object into appropriate entity state
        return { ...state, [stateName]: entityState };
      }

      case EntityActionTypes.UpdateSuccess: {
        // get feature state property name
        const stateName = stateNameFromAction(action);

        // get feature state
        // todo: avoid any
        const entityState = state[stateName];

        // get entity
        const entity = (action as UpdateSuccess<any>).entity;

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
            ids: [...entityState.ids]
          }
        };
      }

      case EntityActionTypes.DeleteSuccess: {
        const stateName = stateNameFromAction(action);
        const key = keyName(action);
        const keyValue = action['entity'][key];
        const entityState = state[stateName];

        // Better to NOT delete the entity key, but set it to undefined,
        // to avoid re-generating the underlying runtime class (TODO: find and add link to V8 jit and runtime)
        return {
          ...state,
          [stateName]: {
            ...entityState,
            entities: {
              ...entityState.entities,
              [keyValue]: undefined
            },
            ids: state[stateName].ids.filter(eid => eid !== keyValue)
          }
        };
      }
    }

    return reducer(state, action);
  };
}
