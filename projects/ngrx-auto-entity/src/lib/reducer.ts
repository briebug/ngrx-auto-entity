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
import { getKeyName } from './decorators';

export function stateNameFromAction(action: EntityAction): string {
  return camelCase(action.info.modelName);
}

export function autoEntityReducer(reducer: ActionReducer<any>, state, action: EntityActions<any>) {
  let stateName: string;
  let entityState: any;

  if (Object.values(EntityActionTypes).includes(action.actionType)) {
    stateName = stateNameFromAction(action);
    entityState = state[stateName];
  }

  switch (action.actionType) {
    case EntityActionTypes.Create: {
      console.log('[NGRX-AE] Create action reduced');
      return state;
    }
    case EntityActionTypes.CreateFailure: {
      console.log('[NGRX-AE] CreateFailure action reduced');
      return state;
    }
    case EntityActionTypes.CreateSuccess: {
      console.log('[NGRX-AE] CreateSuccess action reducing...');
      const entity = (action as CreateSuccess<any>).entity;
      // todo: support composite keys
      const key = entity[getKeyName(action)];
      const reduced = {
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
      console.log('[NGRX-AE] CreateSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.Load: {
      console.log('[NGRX-AE] Load action reduced');
      return state;
    }
    case EntityActionTypes.LoadFailure: {
      console.log('[NGRX-AE] LoadFailure action reduced');
      return state;
    }
    case EntityActionTypes.LoadSuccess: {
      console.log('[NGRX-AE] LoadSuccess action reducing...');
      const entity = (action as LoadSuccess<any>).entity;
      // todo: support composite keys
      const key = entity[getKeyName(action)];
      const reduced = {
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
      console.log('[NGRX-AE] LoadSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.LoadAll: {
      console.log('[NGRX-AE] LoadAll action reduced');
      return state;
    }
    case EntityActionTypes.LoadAllFailure: {
      console.log('[NGRX-AE] LoadAllFailure action reduced');
      return state;
    }
    case EntityActionTypes.LoadAllSuccess: {
      console.log('[NGRX-AE] LoadAllSuccess action reducing...');
      const loadedEntities = action['entities'];
      const reduced = {
        ...state,
        [stateName]: {
          entities: loadedEntities.reduce(
            (entities, entity) => ({
              ...entities,
              [entity[getKeyName(action)]]: entity
            }),
            {}
          ),
          ids: loadedEntities.map(entity => entity[getKeyName(action)])
        }
      };
      console.log('[NGRX-AE] LoadAllSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.LoadPage: {
      console.log('[NGRX-AE] LoadPage action reduced');
      return state;
    }
    case EntityActionTypes.LoadPageFailure: {
      console.log('[NGRX-AE] LoadPageFailure action reduced');
      return state;
    }
    case EntityActionTypes.LoadPageSuccess: {
      console.log('[NGRX-AE] LoadPageSuccess action reducing...');
      const loadedEntities = action['entities'];
      const reduced = {
        ...state,
        [stateName]: {
          entities: loadedEntities.reduce(
            (entities, entity) => ({
              ...entities,
              [entity[getKeyName(action)]]: entity
            }),
            {}
          ),
          ids: loadedEntities.map(entity => entity[getKeyName(action)]),
          currentPage: (action as LoadPageSuccess<any>).pageInfo.page,
          totalPageableCount: (action as LoadPageSuccess<any>).pageInfo.totalCount
        }
      };
      console.log('[NGRX-AE] LoadPageSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.LoadRange: {
      console.log('[NGRX-AE] LoadRange action reduced');
      return state;
    }
    case EntityActionTypes.LoadRangeFailure: {
      console.log('[NGRX-AE] LoadRangeFailure action reduced');
      return state;
    }
    case EntityActionTypes.LoadRangeSuccess: {
      console.log('[NGRX-AE] LoadRangeSuccess action reducing...');
      const loadedEntities = action['entities'];
      const reduced = {
        ...state,
        [stateName]: {
          entities: {
            ...(entityState.entities || {}),
            ...loadedEntities.reduce(
              (entities, entity) => ({
                ...entities,
                [entity[getKeyName(action)]]: entity
              }),
              {}
            )
          },
          ids: [...(entityState.ids || []), ...loadedEntities.map(entity => entity[getKeyName(action)])],
          currentRange: (action as LoadRangeSuccess<any>).rangeInfo.range,
          totalPageableCount: (action as LoadRangeSuccess<any>).rangeInfo.totalCount
        }
      };
      console.log('[NGRX-AE] LoadRangeSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.Update: {
      console.log('[NGRX-AE] Update action reduced');
      return state;
    }
    case EntityActionTypes.UpdateFailure: {
      console.log('[NGRX-AE] UpdateFailure action reduced');
      return state;
    }
    case EntityActionTypes.UpdateSuccess: {
      console.log('[NGRX-AE] UpdateSuccess action reducing...');
      const entity = (action as UpdateSuccess<any>).entity;
      // todo: support composite keys
      const key = entity[getKeyName(action)];

      const reduced = {
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
      console.log('[NGRX-AE] LoadRangeSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.Delete: {
      console.log('[NGRX-AE] Delete action reduced');
      return state;
    }
    case EntityActionTypes.DeleteFailure: {
      console.log('[NGRX-AE] DeleteFailure action reduced');
      return state;
    }
    case EntityActionTypes.DeleteSuccess: {
      console.log('[NGRX-AE] DeleteSuccess action reducing...');
      const key = getKeyName(action);
      const keyValue = action['entity'][key];

      // Better to NOT delete the entity key, but set it to undefined,
      // to avoid re-generating the underlying runtime class (TODO: find and add link to V8 jit and runtime)
      const reduced = {
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
      console.log('[NGRX-AE] DeleteSuccess action reduced');
      return reduced;
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
