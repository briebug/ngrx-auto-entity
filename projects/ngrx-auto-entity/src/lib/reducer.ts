import { ActionReducer } from '@ngrx/store';
import { camelCase } from '../util/case';
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
  IEntityAction,
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
import { FEATURE_AFFINITY } from './util';

export function stateNameFromAction(action: IEntityAction): string {
  return camelCase(action.info.modelName);
}

export function featureNameFromAction(action: IEntityAction): string {
  return (action.info.modelType as any)[FEATURE_AFFINITY];
}

export function setNewState(featureName: string, stateName: string, state, newState) {
  const nextState = featureName
    ? { ...state, [featureName]: { ...state[featureName], [stateName]: newState } }
    : { ...state, [stateName]: newState };
  return nextState;
}

export function autoEntityReducer(reducer: ActionReducer<any>, state, action: EntityActions<any>) {
  let stateName: string;
  let featureName: string;
  let entityState: any;

  if (Object.values(EntityActionTypes).includes(action.actionType)) {
    stateName = stateNameFromAction(action);
    featureName = featureNameFromAction(action);
    entityState = featureName ? state[featureName][stateName] : state[stateName];
  }

  switch (action.actionType) {
    case EntityActionTypes.Create: {
      const newState = {
        ...entityState,
        isSaving: true
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.CreateFailure: {
      const newState = {
        ...entityState,
        isSaving: false
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.CreateSuccess: {
      const entity = (action as CreateSuccess<any>).entity;
      const key = getKey(action, entity);
      const newState = {
        ...entityState,
        entities: {
          ...(entityState.entities || {}),
          [key]: entity
        },
        ids: [...(entityState.ids || []), key],
        isSaving: false,
        createdAt: new Date()
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.CreateMany: {
      const newState = {
        ...entityState,
        isSaving: true
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.CreateManyFailure: {
      const newState = {
        ...entityState,
        isSaving: false
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.CreateManySuccess: {
      const createdEntities = (action as CreateManySuccess<any>).entities;
      const newState = {
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
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.Load: {
      const newState = {
        ...entityState,
        isLoading: true
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.LoadFailure: {
      const newState = {
        ...entityState,
        isLoading: false
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.LoadSuccess: {
      const entity = (action as LoadSuccess<any>).entity;
      const key = getKey(action, entity);
      const newState = {
        ...entityState,
        entities: {
          ...(entityState.entities || {}),
          [key]: entity
        },
        ids: [...(entityState.ids || []).filter(k => k !== key), key],
        isLoading: false,
        loadedAt: new Date()
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.LoadMany: {
      const newState = {
        ...entityState,
        isLoading: true
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.LoadManyFailure: {
      const newState = {
        ...entityState,
        isLoading: false
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.LoadManySuccess: {
      const loadedEntities = action['entities'];
      const loadedIds = loadedEntities.map(entity => getKey(action, entity));
      const newState = {
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
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.LoadAll: {
      const newState = {
        ...entityState,
        isLoading: true
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.LoadAllFailure: {
      const newState = {
        ...entityState,
        isLoading: false
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.LoadAllSuccess: {
      const loadedEntities = action['entities'];
      const newState = {
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
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.LoadPage: {
      const newState = {
        ...entityState,
        isLoading: true
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.LoadPageFailure: {
      const newState = {
        ...entityState,
        isLoading: false
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.LoadPageSuccess: {
      const loadedEntities = action['entities'];
      const newState = {
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
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.LoadRange: {
      const newState = {
        ...entityState,
        isLoading: true
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.LoadRangeFailure: {
      const newState = {
        ...entityState,
        isLoading: false
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.LoadRangeSuccess: {
      const loadedEntities = action['entities'];
      const newState = {
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
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.Update: {
      const newState = {
        ...entityState,
        isSaving: true
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.UpdateFailure: {
      const newState = {
        ...entityState,
        isSaving: false
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.UpdateSuccess: {
      const entity = (action as UpdateSuccess<any>).entity;
      const key = getKey(action, entity);
      const newState = {
        ...entityState,
        entities: {
          ...entityState.entities,
          [key]: entity
        },
        isSaving: false,
        savedAt: new Date()
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.UpdateMany: {
      const newState = {
        ...entityState,
        isSaving: true
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.UpdateManyFailure: {
      const newState = {
        ...entityState,
        isSaving: false
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.UpdateManySuccess: {
      const updatedEntities = (action as UpdateManySuccess<any>).entities;
      const newState = {
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
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.Replace: {
      const newState = {
        ...entityState,
        isSaving: true
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.ReplaceFailure: {
      const newState = {
        ...entityState,
        isSaving: false
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.ReplaceSuccess: {
      const entity = (action as ReplaceSuccess<any>).entity;
      const key = getKey(action, entity);
      const newState = {
        ...entityState,
        entities: {
          ...entityState.entities,
          [key]: entity
        },
        ids: [...entityState.ids],
        isSaving: false,
        savedAt: new Date()
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.ReplaceMany: {
      const newState = {
        ...entityState,
        isSaving: true
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.ReplaceManyFailure: {
      const newState = {
        ...entityState,
        isSaving: false
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.ReplaceManySuccess: {
      const replacedEntities = (action as ReplaceManySuccess<any>).entities;
      const newState = {
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
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.Delete: {
      const newState = {
        ...entityState,
        isDeleting: true
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.DeleteFailure: {
      const newState = {
        ...entityState,
        isDeleting: false
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.DeleteSuccess: {
      const entity = (action as DeleteSuccess<any>).entity;
      const key = getKey(action, entity);

      // Better to NOT delete the entity key, but set it to undefined,
      // to avoid re-generating the underlying runtime class (TODO: find and add link to V8 jit and runtime)
      const newState = {
        ...entityState,
        entities: {
          ...entityState.entities,
          [key]: undefined
        },
        ids: entityState.ids.filter(eid => eid !== key),
        isDeleting: false,
        deletedAt: new Date()
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.DeleteMany: {
      const newState = {
        ...entityState,
        isDeleting: true
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.DeleteManyFailure: {
      const newState = {
        ...entityState,
        isDeleting: false
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.DeleteManySuccess: {
      const deletedEntities = (action as DeleteManySuccess<any>).entities;
      const deletedIds = deletedEntities.map(entity => getKey(action, entity));
      const newState = {
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
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.Clear: {
      const newState = {
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
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.Select: {
      const entity = (action as Select<any>).entity;
      const key = getKey(action, entity);
      const newState = {
        ...entityState,
        currentEntityKey: key
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.SelectByKey: {
      const key = (action as SelectByKey<any>).entityKey;
      const newState = {
        ...entityState,
        currentEntityKey: key
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.SelectMany: {
      const selectingEntities = (action as SelectMany<any>).entities;
      const keys = selectingEntities.map(entity => getKey(action, entity));
      const newState = {
        ...entityState,
        currentEntitiesKeys: keys
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.SelectManyByKeys: {
      const keys = (action as SelectManyByKeys<any>).entitiesKeys;
      const newState = {
        ...entityState,
        currentEntitiesKeys: keys
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.Deselect: {
      const newState = {
        ...entityState,
        currentEntityKey: undefined
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.DeselectMany: {
      const deselectingEntities = (action as DeselectMany<any>).entities;
      const keys = deselectingEntities.map(entity => getKey(action, entity));
      const newState = {
        ...entityState,
        currentEntitiesKeys: entityState.currentEntitiesKeys.filter(key => !keys.some(key))
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.DeselectManyByKeys: {
      const keys = (action as DeselectManyByKeys<any>).entitiesKeys;
      const newState = {
        ...entityState,
        currentEntitiesKeys: entityState.currentEntitiesKeys.filter(key => !keys.some(key))
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.DeselectAll: {
      const newState = {
        ...entityState,
        currentEntitiesKeys: undefined
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
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
