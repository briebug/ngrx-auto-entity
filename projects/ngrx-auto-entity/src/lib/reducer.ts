import { ActionReducer } from '@ngrx/store';
import { camelCase } from 'change-case';
import {
  CreateSuccess,
  DeleteSuccess,
  EntityAction,
  EntityActions,
  EntityActionTypes,
  LoadPageSuccess,
  LoadRangeSuccess,
  LoadSuccess,
  ReplaceSuccess,
  Select,
  SelectByKey,
  UpdateSuccess
} from './actions';
import { getKey } from './decorators';

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
      console.log('[NGRX-AE] Create action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isSaving: true
        }
      };
      console.log('[NGRX-AE] Create acton reduced');

      return reduced;
    }
    case EntityActionTypes.CreateFailure: {
      console.log('[NGRX-AE] CreateFailure action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isSaving: false
        }
      };
      console.log('[NGRX-AE] CreateFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.CreateSuccess: {
      console.log('[NGRX-AE] CreateSuccess action reducing...');
      const entity = (action as CreateSuccess<any>).entity;
      // todo: support composite keys
      const key = getKey(action, entity);
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          entities: {
            ...(entityState.entities || {}),
            [key]: entity
          },
          ids: [...(entityState.ids || []), key],
          isSaving: false
        }
      };
      console.log('[NGRX-AE] CreateSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.Load: {
      console.log('[NGRX-AE] Load action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isLoading: true
        }
      };
      console.log('[NGRX-AE] Load action reduced');
      return reduced;
    }
    case EntityActionTypes.LoadFailure: {
      console.log('[NGRX-AE] LoadFailure action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isLoading: false
        }
      };
      console.log('[NGRX-AE] Load action reduced');
      return reduced;
    }
    case EntityActionTypes.LoadSuccess: {
      console.log('[NGRX-AE] LoadSuccess action reducing...');
      const entity = (action as LoadSuccess<any>).entity;
      // todo: support composite keys
      const key = getKey(action, entity);
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          entities: {
            ...(entityState.entities || {}),
            [key]: entity
          },
          ids: [...(entityState.ids || []), key],
          isLoading: false
        }
      };
      console.log('[NGRX-AE] LoadSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.LoadAll: {
      console.log('[NGRX-AE] LoadAll action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isLoading: true
        }
      };
      console.log('[NGRX-AE] LoadAll action reduced');
      return reduced;
    }
    case EntityActionTypes.LoadAllFailure: {
      console.log('[NGRX-AE] LoadAllFailure action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isLoading: false
        }
      };
      console.log('[NGRX-AE] LoadAllFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.LoadAllSuccess: {
      console.log('[NGRX-AE] LoadAllSuccess action reducing...');
      const loadedEntities = action['entities'];
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          entities: loadedEntities.reduce(
            (entities, entity) => ({
              ...entities,
              [getKey(action, entity)]: entity
            }),
            {}
          ),
          ids: loadedEntities.map(entity => getKey(action, entity)),
          isLoading: false,
          currentPage: 1,
          totalPageableCount: loadedEntities.length
        }
      };
      console.log('[NGRX-AE] LoadAllSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.LoadPage: {
      console.log('[NGRX-AE] LoadPage action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isLoading: true
        }
      };
      console.log('[NGRX-AE] LoadPage action reduced');
      return reduced;
    }
    case EntityActionTypes.LoadPageFailure: {
      console.log('[NGRX-AE] LoadPageFailure action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isLoading: false
        }
      };
      console.log('[NGRX-AE] LoadPageFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.LoadPageSuccess: {
      console.log('[NGRX-AE] LoadPageSuccess action reducing...');
      const loadedEntities = action['entities'];
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          entities: loadedEntities.reduce(
            (entities, entity) => ({
              ...entities,
              [getKey(action, entity)]: entity
            }),
            {}
          ),
          ids: loadedEntities.map(entity => getKey(action, entity)),
          currentPage: (action as LoadPageSuccess<any>).pageInfo.page,
          totalPageableCount: (action as LoadPageSuccess<any>).pageInfo.totalCount,
          isLoading: false
        }
      };
      console.log('[NGRX-AE] LoadPageSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.LoadRange: {
      console.log('[NGRX-AE] LoadRange action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isLoading: true
        }
      };
      console.log('[NGRX-AE] LoadRange action reduced');
      return reduced;
    }
    case EntityActionTypes.LoadRangeFailure: {
      console.log('[NGRX-AE] LoadRangeFailure action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isLoading: false
        }
      };
      console.log('[NGRX-AE] LoadRangeFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.LoadRangeSuccess: {
      console.log('[NGRX-AE] LoadRangeSuccess action reducing...');
      const loadedEntities = action['entities'];
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          entities: {
            ...(entityState.entities || {}),
            ...loadedEntities.reduce(
              (entities, entity) => ({
                ...entities,
                [getKey(action, entity)]: entity
              }),
              {}
            )
          },
          ids: [...(entityState.ids || []), ...loadedEntities.map(entity => getKey(action, entity))],
          currentRange: (action as LoadRangeSuccess<any>).rangeInfo.range,
          totalPageableCount: (action as LoadRangeSuccess<any>).rangeInfo.totalCount,
          isLoading: false
        }
      };
      console.log('[NGRX-AE] LoadRangeSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.Update: {
      console.log('[NGRX-AE] Update action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isSaving: true
        }
      };
      console.log('[NGRX-AE] Update action reduced');
      return reduced;
    }
    case EntityActionTypes.UpdateFailure: {
      console.log('[NGRX-AE] UpdateFailure action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isSaving: false
        }
      };
      console.log('[NGRX-AE] UpdateFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.UpdateSuccess: {
      console.log('[NGRX-AE] UpdateSuccess action reducing...');
      const entity = (action as UpdateSuccess<any>).entity;
      const key = getKey(action, entity);

      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          entities: {
            ...entityState.entities,
            [key]: entity
          },
          ids: [...entityState.ids],
          isSaving: false
        }
      };
      console.log('[NGRX-AE] UpdateSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.Replace: {
      console.log('[NGRX-AE] Replace action reduced');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isSaving: true
        }
      };
      console.log('[NGRX-AE] UpdateFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.ReplaceFailure: {
      console.log('[NGRX-AE] ReplaceFailure action reduced');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isSaving: false
        }
      };
      console.log('[NGRX-AE] ReplaceFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.ReplaceSuccess: {
      console.log('[NGRX-AE] ReplaceSuccess action reducing...');
      const entity = (action as ReplaceSuccess<any>).entity;
      const key = getKey(action, entity);

      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          entities: {
            ...entityState.entities,
            [key]: entity
          },
          ids: [...entityState.ids],
          isSaving: false
        }
      };
      console.log('[NGRX-AE] ReplaceSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.Delete: {
      console.log('[NGRX-AE] Delete action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isDeleting: true
        }
      };
      console.log('[NGRX-AE] Delete action reduced');
      return reduced;
    }
    case EntityActionTypes.DeleteFailure: {
      console.log('[NGRX-AE] DeleteFailure action reduced');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isDeleting: false
        }
      };
      console.log('[NGRX-AE] DeleteFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.DeleteSuccess: {
      console.log('[NGRX-AE] DeleteSuccess action reducing...');
      const entity = (action as DeleteSuccess<any>).entity;
      const key = getKey(action, entity);

      // Better to NOT delete the entity key, but set it to undefined,
      // to avoid re-generating the underlying runtime class (TODO: find and add link to V8 jit and runtime)
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          entities: {
            ...entityState.entities,
            [key]: undefined
          },
          ids: entityState.ids.filter(eid => eid !== key),
          isDeleting: false
        }
      };
      console.log('[NGRX-AE] DeleteSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.Select: {
      console.log('[NGRX-AE] Select action reducing...');
      const entity = (action as Select<any>).entity;
      const key = getKey(action, entity);

      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          currentEntityKey: key
        }
      };
      console.log('[NGRX-AE] Select action reduced');
      return reduced;
    }

    case EntityActionTypes.SelectByKey: {
      console.log('[NGRX-AE] Select by Key action reducing...');
      const key = (action as SelectByKey<any>).entityKey;

      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          currentEntityKey: key
        }
      };
      console.log('[NGRX-AE] Select by Key action reduced');
      return reduced;
    }

    case EntityActionTypes.Deselect: {
      console.log('[NGRX-AE] Deselect action reducing...');

      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          currentEntityKey: undefined
        }
      };
      console.log('[NGRX-AE] Deselect action reduced');
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
