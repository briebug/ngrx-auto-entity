import { ActionReducer } from '@ngrx/store';
import { camelCase } from 'change-case';
import {
  CreateSuccess,
  EntityAction,
  EntityActions,
  EntityActionTypes,
  LoadPageSuccess,
  LoadRangeSuccess,
  LoadSuccess,
  UpdateSuccess
} from './actions';
import { NAE_ID } from './decorators';

export function stateNameFromAction(action: EntityAction): string {
  return camelCase(action.info.modelName);
}

export function keyName(action: EntityAction): string {
  return action.info.modelType.prototype[NAE_ID];
}

export function autoEntityReducer(reducer: ActionReducer<any>, state, action: EntityActions<any>) {
  let stateName: string;
  let entityState: any;

  if (Object.values(EntityActionTypes).includes(action.actionType)) {
    stateName = stateNameFromAction(action);
    entityState = state[stateName];
  }

  switch (action.actionType) {
    case EntityActionTypes.CreateSuccess: {
      const entity = (action as CreateSuccess<any>).entity;
      // todo: support composite keys
      const key = entity[keyName(action)];

      return {
        ...state,
        [stateName]: {
          ...entityState,
          entities: {
            ...(entityState.entities || {}),
            [key]: entity
          },
          ids: [...(entityState.ids || []), key]
        }
      };
    }

    case EntityActionTypes.LoadSuccess: {
      const entity = (action as LoadSuccess<any>).entity;
      // todo: support composite keys
      const key = entity[keyName(action)];

      return {
        ...state,
        [stateName]: {
          ...entityState,
          entities: {
            ...(entityState.entities || {}),
            [key]: entity
          },
          ids: [...(entityState.ids || []), key]
        }
      };
    }

    case EntityActionTypes.LoadAllSuccess: {
      const loadedEntities = action['entities'];
      return {
        ...state,
        [stateName]: {
          entities: loadedEntities.reduce(
            (entities, entity) => ({
              ...entities,
              [entity[keyName(action)]]: entity
            }),
            {}
          ),
          ids: loadedEntities.map(entity => entity[keyName(action)])
        }
      };
    }

    case EntityActionTypes.LoadPageSuccess: {
      const loadedEntities = action['entities'];
      return {
        ...state,
        [stateName]: {
          entities: loadedEntities.reduce(
            (entities, entity) => ({
              ...entities,
              [entity[keyName(action)]]: entity
            }),
            {}
          ),
          ids: loadedEntities.map(entity => entity[keyName(action)]),
          currentPage: (action as LoadPageSuccess<any>).pageInfo.page,
          totalCount: (action as LoadPageSuccess<any>).pageInfo.totalCount
        }
      };
    }

    case EntityActionTypes.LoadRangeSuccess: {
      const loadedEntities = action['entities'];
      return {
        ...state,
        [stateName]: {
          entities: {
            ...(entityState.entities || {}),
            ...loadedEntities.reduce(
              (entities, entity) => ({
                ...entities,
                [entity[keyName(action)]]: entity
              }),
              {}
            )
          },
          ids: [...(entityState.ids || []), ...loadedEntities.map(entity => entity[keyName(action)])],
          currentRange: (action as LoadRangeSuccess<any>).rangeInfo.range,
          totalCount: (action as LoadRangeSuccess<any>).rangeInfo.totalCount
        }
      };
    }

    case EntityActionTypes.UpdateSuccess: {
      const entity = (action as UpdateSuccess<any>).entity;
      // todo: support composite keys
      const key = entity[keyName(action)];

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
      const key = keyName(action);
      const keyValue = action['entity'][key];

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
}

/**
 * Provides standard reducer functions to support entity store structure
 *
 * @param reducer
 */
export function autoEntityMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action: EntityActions<any>) => {
    return autoEntityReducer(reducer, state, action);
  };
}
