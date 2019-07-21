import { ActionReducer } from '@ngrx/store';
import { camelCase } from 'change-case';
import {
  CreateManySuccess,
  CreateSuccess,
  DeleteManySuccess,
  DeleteSuccess,
  DeselectMany,
  DeselectManyByKeys,
  EntityAction,
  EntityActions,
  EntityActionTypes,
  LoadPageSuccess,
  LoadRangeSuccess,
  LoadSuccess,
  ReplaceManySuccess,
  ReplaceSuccess,
  Select,
  SelectByKey,
  SelectMany,
  SelectManyByKeys,
  UpdateManySuccess,
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
      // console.debug('[NGRX-AE] Create action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isSaving: true
        }
      };
      // console.debug('[NGRX-AE] Create acton reduced');

      return reduced;
    }
    case EntityActionTypes.CreateFailure: {
      // console.debug('[NGRX-AE] CreateFailure action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isSaving: false
        }
      };
      // console.debug('[NGRX-AE] CreateFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.CreateSuccess: {
      // console.debug('[NGRX-AE] CreateSuccess action reducing...');
      const entity = (action as CreateSuccess<any>).entity;
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
          isSaving: false,
          createdAt: new Date()
        }
      };
      // console.debug('[NGRX-AE] CreateSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.CreateMany: {
      // console.debug('[NGRX-AE] CreateMany action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isSaving: true
        }
      };
      // console.debug('[NGRX-AE] CreateMany acton reduced');

      return reduced;
    }
    case EntityActionTypes.CreateManyFailure: {
      // console.debug('[NGRX-AE] CreateManyFailure action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isSaving: false
        }
      };
      // console.debug('[NGRX-AE] CreateManyFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.CreateManySuccess: {
      // console.debug('[NGRX-AE] CreateManySuccess action reducing...');
      const createdEntities = (action as CreateManySuccess<any>).entities;
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          entities: {
            ...(entityState.entities || {}),
            ...createdEntities.reduce(
              (entities, entity) => ({
                ...entities,
                [getKey(action, entity)]: entity
              }),
              {}
            )
          },
          ids: [...(entityState.ids || []), ...createdEntities.map(entity => getKey(action, entity))],
          isSaving: false,
          createdAt: new Date()
        }
      };
      // console.debug('[NGRX-AE] CreateManySuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.Load: {
      // console.debug('[NGRX-AE] Load action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isLoading: true
        }
      };
      // console.debug('[NGRX-AE] Load action reduced');
      return reduced;
    }
    case EntityActionTypes.LoadFailure: {
      // console.debug('[NGRX-AE] LoadFailure action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isLoading: false
        }
      };
      // console.debug('[NGRX-AE] Load action reduced');
      return reduced;
    }
    case EntityActionTypes.LoadSuccess: {
      // console.debug('[NGRX-AE] LoadSuccess action reducing...');
      const entity = (action as LoadSuccess<any>).entity;
      const key = getKey(action, entity);
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          entities: {
            ...(entityState.entities || {}),
            [key]: entity
          },
          ids: [...(entityState.ids || []).filter(k => k !== key), key],
          isLoading: false,
          loadedAt: new Date()
        }
      };
      // console.debug('[NGRX-AE] LoadSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.LoadMany: {
      // console.debug('[NGRX-AE] LoadMany action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isLoading: true
        }
      };
      // console.debug('[NGRX-AE] LoadMany action reduced');
      return reduced;
    }
    case EntityActionTypes.LoadManyFailure: {
      // console.debug('[NGRX-AE] LoadManyFailure action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isLoading: false
        }
      };
      // console.debug('[NGRX-AE] LoadManyFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.LoadManySuccess: {
      // console.debug('[NGRX-AE] LoadManySuccess action reducing...');
      const loadedEntities = action['entities'];

      const loadedIds = loadedEntities.map(entity => getKey(action, entity));
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
          ids: [
            ...(entityState.ids || []),
            ...loadedIds.filter(lid => !(entityState.ids || []).some(sid => lid === sid))
          ],
          isLoading: false,
          loadedAt: new Date()
        }
      };
      // console.debug('[NGRX-AE] LoadManySuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.LoadAll: {
      // console.debug('[NGRX-AE] LoadAll action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isLoading: true
        }
      };
      // console.debug('[NGRX-AE] LoadAll action reduced');
      return reduced;
    }
    case EntityActionTypes.LoadAllFailure: {
      // console.debug('[NGRX-AE] LoadAllFailure action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isLoading: false
        }
      };
      // console.debug('[NGRX-AE] LoadAllFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.LoadAllSuccess: {
      // console.debug('[NGRX-AE] LoadAllSuccess action reducing...');
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
          loadedAt: new Date(),
          currentPage: 1,
          totalPageableCount: loadedEntities.length
        }
      };
      // console.debug('[NGRX-AE] LoadAllSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.LoadPage: {
      // console.debug('[NGRX-AE] LoadPage action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isLoading: true
        }
      };
      // console.debug('[NGRX-AE] LoadPage action reduced');
      return reduced;
    }
    case EntityActionTypes.LoadPageFailure: {
      // console.debug('[NGRX-AE] LoadPageFailure action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isLoading: false
        }
      };
      // console.debug('[NGRX-AE] LoadPageFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.LoadPageSuccess: {
      // console.debug('[NGRX-AE] LoadPageSuccess action reducing...');
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
          isLoading: false,
          loadedAt: new Date()
        }
      };
      // console.debug('[NGRX-AE] LoadPageSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.LoadRange: {
      // console.debug('[NGRX-AE] LoadRange action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isLoading: true
        }
      };
      // console.debug('[NGRX-AE] LoadRange action reduced');
      return reduced;
    }
    case EntityActionTypes.LoadRangeFailure: {
      // console.debug('[NGRX-AE] LoadRangeFailure action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isLoading: false
        }
      };
      // console.debug('[NGRX-AE] LoadRangeFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.LoadRangeSuccess: {
      // console.debug('[NGRX-AE] LoadRangeSuccess action reducing...');
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
          isLoading: false,
          loadedAt: new Date()
        }
      };
      // console.debug('[NGRX-AE] LoadRangeSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.Update: {
      // console.debug('[NGRX-AE] Update action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isSaving: true
        }
      };
      // console.debug('[NGRX-AE] Update action reduced');
      return reduced;
    }
    case EntityActionTypes.UpdateFailure: {
      // console.debug('[NGRX-AE] UpdateFailure action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isSaving: false
        }
      };
      // console.debug('[NGRX-AE] UpdateFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.UpdateSuccess: {
      // console.debug('[NGRX-AE] UpdateSuccess action reducing...');
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
          isSaving: false,
          savedAt: new Date()
        }
      };
      // console.debug('[NGRX-AE] UpdateSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.UpdateMany: {
      // console.debug('[NGRX-AE] UpdateMany action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isSaving: true
        }
      };
      // console.debug('[NGRX-AE] UpdateMany action reduced');
      return reduced;
    }
    case EntityActionTypes.UpdateManyFailure: {
      // console.debug('[NGRX-AE] UpdateManyFailure action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isSaving: false
        }
      };
      // console.debug('[NGRX-AE] UpdateManyFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.UpdateManySuccess: {
      // console.debug('[NGRX-AE] UpdateManySuccess action reducing...');
      const updatedEntities = (action as UpdateManySuccess<any>).entities;

      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          entities: {
            ...(entityState.entities || {}),
            ...updatedEntities.reduce(
              (entities, entity) => ({
                ...entities,
                [getKey(action, entity)]: entity
              }),
              {}
            )
          },
          isSaving: false,
          savedAt: new Date()
        }
      };
      // console.debug('[NGRX-AE] UpdateManySuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.Replace: {
      // console.debug('[NGRX-AE] Replace action reduced');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isSaving: true
        }
      };
      // console.debug('[NGRX-AE] UpdateFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.ReplaceFailure: {
      // console.debug('[NGRX-AE] ReplaceFailure action reduced');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isSaving: false
        }
      };
      // console.debug('[NGRX-AE] ReplaceFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.ReplaceSuccess: {
      // console.debug('[NGRX-AE] ReplaceSuccess action reducing...');
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
          isSaving: false,
          savedAt: new Date()
        }
      };
      // console.debug('[NGRX-AE] ReplaceSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.ReplaceMany: {
      // console.debug('[NGRX-AE] ReplaceMany action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isSaving: true
        }
      };
      // console.debug('[NGRX-AE] ReplaceMany action reduced');
      return reduced;
    }
    case EntityActionTypes.ReplaceManyFailure: {
      // console.debug('[NGRX-AE] ReplaceManyFailure action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isSaving: false
        }
      };
      // console.debug('[NGRX-AE] ReplaceManyFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.ReplaceManySuccess: {
      // console.debug('[NGRX-AE] ReplaceManySuccess action reducing...');
      const replacedEntities = (action as ReplaceManySuccess<any>).entities;

      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          entities: {
            ...(entityState.entities || {}),
            ...replacedEntities.reduce(
              (entities, entity) => ({
                ...entities,
                [getKey(action, entity)]: entity
              }),
              {}
            )
          },
          isSaving: false,
          savedAt: new Date()
        }
      };
      // console.debug('[NGRX-AE] ReplaceManySuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.Delete: {
      // console.debug('[NGRX-AE] Delete action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isDeleting: true
        }
      };
      // console.debug('[NGRX-AE] Delete action reduced');
      return reduced;
    }
    case EntityActionTypes.DeleteFailure: {
      // console.debug('[NGRX-AE] DeleteFailure action reduced');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isDeleting: false
        }
      };
      // console.debug('[NGRX-AE] DeleteFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.DeleteSuccess: {
      // console.debug('[NGRX-AE] DeleteSuccess action reducing...');
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
          isDeleting: false,
          deletedAt: new Date()
        }
      };
      // console.debug('[NGRX-AE] DeleteSuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.DeleteMany: {
      // console.debug('[NGRX-AE] DeleteMany action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isDeleting: true
        }
      };
      // console.debug('[NGRX-AE] ReplaceMany action reduced');
      return reduced;
    }
    case EntityActionTypes.DeleteManyFailure: {
      // console.debug('[NGRX-AE] DeleteManyFailure action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          isDeleting: false
        }
      };
      // console.debug('[NGRX-AE] DeleteManyFailure action reduced');
      return reduced;
    }
    case EntityActionTypes.DeleteManySuccess: {
      // console.debug('[NGRX-AE] DeleteManySuccess action reducing...');
      const deletedEntities = (action as DeleteManySuccess<any>).entities;
      const deletedIds = deletedEntities.map(entity => getKey(action, entity));

      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          entities: {
            ...(entityState.entities || {}),
            ...deletedEntities.reduce(
              (entities, entity) => ({
                ...entities,
                [getKey(action, entity)]: undefined
              }),
              {}
            )
          },
          ids: [...entityState.ids.filter(sid => !deletedIds.some(did => did === sid))],
          isDeleting: false,
          deletedAt: new Date()
        }
      };
      // console.debug('[NGRX-AE] DeletedManySuccess action reduced');
      return reduced;
    }

    case EntityActionTypes.Clear: {
      // console.debug('[NGRX-AE] Clear action reducing...');
      const reduced = {
        ...state,
        [stateName]: {
          entities: {},
          ids: [],
          currentEntityKey: undefined,
          currentEntitiesKeys: undefined,
          currentPage: undefined,
          currentRange: undefined,
          totalPageableCount: undefined,
          isLoading: undefined,
          isSaving: undefined,
          isDeleting: undefined,
          loadedAt: undefined,
          savedAt: undefined,
          deletedAt: undefined
        }
      };
      // console.debug('[NGRX-AE] Clear action reduced');
      return reduced;
    }

    case EntityActionTypes.Select: {
      // console.debug('[NGRX-AE] Select action reducing...');
      const entity = (action as Select<any>).entity;
      const key = getKey(action, entity);

      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          currentEntityKey: key
        }
      };
      // console.debug('[NGRX-AE] Select action reduced');
      return reduced;
    }

    case EntityActionTypes.SelectByKey: {
      // console.debug('[NGRX-AE] Select by Key action reducing...');
      const key = (action as SelectByKey<any>).entityKey;

      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          currentEntityKey: key
        }
      };
      // console.debug('[NGRX-AE] Select by Key action reduced');
      return reduced;
    }

    case EntityActionTypes.SelectMany: {
      // console.debug('[NGRX-AE] Select Many action reducing...');
      const selectingEntities = (action as SelectMany<any>).entities;
      const keys = selectingEntities.map(entity => getKey(action, entity));

      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          currentEntitiesKeys: keys
        }
      };
      // console.debug('[NGRX-AE] Select Many action reduced');
      return reduced;
    }

    case EntityActionTypes.SelectManyByKeys: {
      // console.debug('[NGRX-AE] Select Many by Keys action reducing...');
      const keys = (action as SelectManyByKeys<any>).entitiesKeys;

      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          currentEntitiesKeys: keys
        }
      };
      // console.debug('[NGRX-AE] Select Many by Keys action reduced');
      return reduced;
    }

    case EntityActionTypes.Deselect: {
      // console.debug('[NGRX-AE] Deselect action reducing...');

      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          currentEntityKey: undefined
        }
      };
      // console.debug('[NGRX-AE] Deselect action reduced');
      return reduced;
    }

    case EntityActionTypes.DeselectMany: {
      // console.debug('[NGRX-AE] Deselect Many action reducing...');
      const deselectingEntities = (action as DeselectMany<any>).entities;
      const keys = deselectingEntities.map(entity => getKey(action, entity));

      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          currentEntitiesKeys: entityState.currentEntitiesKeys.filter(key => !keys.some(key))
        }
      };
      // console.debug('[NGRX-AE] Deselect Many action reduced');
      return reduced;
    }

    case EntityActionTypes.DeselectManyByKeys: {
      // console.debug('[NGRX-AE] Deselect Many action reducing...');
      const keys = (action as DeselectManyByKeys<any>).entitiesKeys;

      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          currentEntitiesKeys: entityState.currentEntitiesKeys.filter(key => !keys.some(key))
        }
      };
      // console.debug('[NGRX-AE] Deselect Many action reduced');
      return reduced;
    }

    case EntityActionTypes.DeselectAll: {
      // console.debug('[NGRX-AE] Deselect All action reducing...');

      const reduced = {
        ...state,
        [stateName]: {
          ...entityState,
          currentEntitiesKeys: undefined
        }
      };
      // console.debug('[NGRX-AE] Deselect All action reduced');
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
