import { ActionReducer } from '@ngrx/store';

import { camelCase } from '../../util/case';
import { EntityActionTypes } from '../actions/action-types';
import {
  Change,
  CreateManySuccess,
  CreateSuccess,
  DeleteByKeySuccess,
  DeleteManyByKeysSuccess,
  DeleteManySuccess,
  DeleteSuccess,
  DeselectMany,
  DeselectManyByKeys,
  Edit,
  LoadPageSuccess,
  LoadRangeSuccess,
  LoadSuccess,
  ReplaceManySuccess,
  ReplaceSuccess,
  Select,
  SelectByKey,
  SelectMany,
  SelectManyByKeys,
  SelectMore,
  SelectMoreByKeys,
  UpdateManySuccess,
  UpdateSuccess
} from '../actions/actions';
import { IEntityAction } from '../actions/entity-action';
import { EntityActions } from '../actions/entity-actions-union';
import { getKey } from '../decorators/key';
import { EntityIdentity } from '../util/entity-state';
import { FEATURE_AFFINITY } from '../util/util-tokens';

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

export const cloneEntities = (original: any | null) => (!!original ? { ...original } : {});

export const cloneIds = (ids: EntityIdentity[] | null) => (!!ids ? [...ids] : []);

export const mergeSingle = (currentEntities, entityKey, newEntity) => (
  (currentEntities[entityKey] = newEntity), currentEntities
);
export const mergeMany = (currentEntities, newEntities, action) =>
  newEntities.reduce((entities, entity) => ((entities[getKey(action, entity)] = entity), entities), currentEntities);

export const deleteSingle = (currentEntities, entityKey) => (delete currentEntities[entityKey], currentEntities);
export const deleteMany = (currentEntities, entityKeys) => (
  entityKeys.forEach(entityKey => delete currentEntities[entityKey]), currentEntities
);

export const pushSingle = (currentIds, entityKey) => (currentIds.push(entityKey), currentIds);
export const pushMany = (currentIds, newEntities, action) => (
  currentIds.push.apply(currentIds, newEntities.map(entity => getKey(action, entity))), currentIds
);

export const noop = () => {};
export const has = (array, value) => array.indexOf(value) > -1;
export const pushIfMissing = (currentEntities, currentIds, entityKey) =>
  entityKey in currentEntities ? noop() : currentIds.push(entityKey);

export const pushUnique = (currentEntities, currentIds, entityKey) => (
  pushIfMissing(currentEntities, currentIds, entityKey), currentIds
);
export const pushManyUnique = (currentEntities, currentIds, entityKeys) => (
  entityKeys.forEach(entityKey => pushIfMissing(currentEntities, currentIds, entityKey)), currentIds
);

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
      const createEntity = (action as CreateSuccess<any>).entity;
      const createKey = getKey(action, createEntity);
      const entities = cloneEntities(entityState.entities);
      const ids = cloneIds(entityState.ids);

      const newState = {
        ...entityState,
        entities: mergeSingle(entities, createKey, createEntity),
        ids: pushSingle(ids, createKey),
        isSaving: false,
        createdAt: Date.now()
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
      const entities = cloneEntities(entityState.entities);
      const ids = cloneIds(entityState.ids);

      const newState = {
        ...entityState,
        entities: mergeMany(entities, createdEntities, action),
        ids: pushMany(ids, createdEntities, action),
        isSaving: false,
        createdAt: Date.now()
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
      const loadEntity = (action as LoadSuccess<any>).entity;
      const loadKey = getKey(action, loadEntity);
      const entities = cloneEntities(entityState.entities);
      const ids = cloneIds(entityState.ids);

      const newState = {
        ...entityState,
        ids: pushUnique(entities, ids, loadKey), // ALERT: IDS FIRST!!!
        entities: mergeSingle(entities, loadKey, loadEntity), // ALERT: Then entities!
        isLoading: false,
        loadedAt: Date.now()
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
      const loadManyEntities = action['entities'];
      const loadedIds = loadManyEntities.map(entity => getKey(action, entity));
      const entities = cloneEntities(entityState.entities);
      const ids = cloneIds(entityState.ids);

      const newState = {
        ...entityState,
        ids: pushManyUnique(entities, ids, loadedIds), // ALERT: IDS FIRST!!
        entities: mergeMany(entities, loadManyEntities, action), // ALERT: Then entities!
        isLoading: false,
        loadedAt: Date.now()
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
      const loadAllEntities = action['entities'];

      const newState = {
        ...entityState,
        entities: mergeMany({}, loadAllEntities, action),
        ids: loadAllEntities.map(entity => getKey(action, entity)),
        isLoading: false,
        loadedAt: Date.now(),
        currentPage: 1,
        totalPageableCount: loadAllEntities.length
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
      const loadPageEntities = action['entities'];

      const newState = {
        ...entityState,
        entities: mergeMany({}, loadPageEntities, action),
        ids: loadPageEntities.map(entity => getKey(action, entity)),
        currentPage: (action as LoadPageSuccess<any>).pageInfo.page,
        totalPageableCount: (action as LoadPageSuccess<any>).pageInfo.totalCount,
        isLoading: false,
        loadedAt: Date.now()
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
      const loadRangeEntities = action['entities'];
      const entities = cloneEntities(entityState.entities);
      const ids = cloneIds(entityState.ids);

      const newState = {
        ...entityState,
        entities: mergeMany(entities, loadRangeEntities, action),
        ids: pushMany(ids, loadRangeEntities, action),
        currentRange: (action as LoadRangeSuccess<any>).rangeInfo.range,
        totalPageableCount: (action as LoadRangeSuccess<any>).rangeInfo.totalCount,
        isLoading: false,
        loadedAt: Date.now()
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
      const updateEntity = (action as UpdateSuccess<any>).entity;
      const updateKey = getKey(action, updateEntity);
      const entities = cloneEntities(entityState.entities);

      const newState = {
        ...entityState,
        entities: mergeSingle(entities, updateKey, updateEntity),
        isSaving: false,
        savedAt: Date.now()
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
      const updateManyEntities = (action as UpdateManySuccess<any>).entities;
      const entities = cloneEntities(entityState.entities);

      const newState = {
        ...entityState,
        entities: mergeMany(entities, updateManyEntities, action),
        isSaving: false,
        savedAt: Date.now()
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
      const replaceEntity = (action as ReplaceSuccess<any>).entity;
      const replaceKey = getKey(action, replaceEntity);
      const entities = cloneEntities(entityState.entities);

      const newState = {
        ...entityState,
        entities: mergeSingle(entities, replaceKey, replaceEntity),
        isSaving: false,
        savedAt: Date.now()
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
      const replaceManyEntities = (action as ReplaceManySuccess<any>).entities;
      const entities = cloneEntities(entityState.entities);

      const newState = {
        ...entityState,
        entities: mergeMany(entities, replaceManyEntities, action),
        isSaving: false,
        savedAt: Date.now()
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
      const deleteEntity = (action as DeleteSuccess<any>).entity;
      const deleteKey = getKey(action, deleteEntity);
      const entities = cloneEntities(entityState.entities);
      const ids = entityState.ids.filter(eid => eid !== deleteKey);

      // Better to NOT delete the entity key, but set it to undefined,
      // to avoid re-generating the underlying runtime class (TODO: find and add link to V8 jit and runtime)
      const newState = {
        ...entityState,
        entities: deleteSingle(entities || {}, deleteKey),
        ids,
        isDeleting: false,
        deletedAt: Date.now()
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
      const deleteManyEntities = (action as DeleteManySuccess<any>).entities;
      const deletedIds = deleteManyEntities.map(entity => getKey(action, entity));
      const clonedEntities = cloneEntities(entityState.entities);
      const entities = deleteMany(clonedEntities, deletedIds);
      const ids = entityState.ids.filter(eid => eid in entities);

      const newState = {
        ...entityState,
        entities,
        ids,
        isDeleting: false,
        deletedAt: Date.now()
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.DeleteByKey: {
      const newState = {
        ...entityState,
        isDeleting: true
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.DeleteByKeyFailure: {
      const newState = {
        ...entityState,
        isDeleting: false
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.DeleteByKeySuccess: {
      const deleteKey = (action as DeleteByKeySuccess<any>).key;
      const clonedEntities = cloneEntities(entityState.entities);
      const entities = deleteSingle(clonedEntities || {}, deleteKey);
      const ids = entityState.ids.filter(eid => eid in entities);

      // Better to NOT delete the entity key, but set it to undefined,
      // to avoid re-generating the underlying runtime class (TODO: find and add link to V8 jit and runtime)
      const newState = {
        ...entityState,
        entities,
        ids,
        isDeleting: false,
        deletedAt: Date.now()
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.DeleteManyByKeys: {
      const newState = {
        ...entityState,
        isDeleting: true
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.DeleteManyByKeysFailure: {
      const newState = {
        ...entityState,
        isDeleting: false
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.DeleteManyByKeysSuccess: {
      const deleteKeys = (action as DeleteManyByKeysSuccess<any>).keys;
      const clonedEntities = cloneEntities(entityState.entities);
      const entities = deleteMany(clonedEntities, deleteKeys);
      const ids = entityState.ids.filter(eid => eid in entities);

      const newState = {
        ...entityState,
        entities,
        ids,
        isDeleting: false,
        deletedAt: Date.now()
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.Clear: {
      const newState = {
        // If the developer has included their own extra state properties with buildState(Entity, { /* custom */ })
        // then we don't want to mess with it. We want to leave any custom developer state as-is!
        // Spread in the current state to ensure we KEEP custom developer-defined extra state properties:
        ...entityState,
        // Now reset the auto-entity managed properties to their default states:
        entities: {},
        ids: [],
        currentEntityKey: undefined,
        currentEntitiesKeys: undefined,
        editedEntity: undefined,
        isDirty: undefined,
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
      const selectEntity = (action as Select<any>).entity;
      if (!selectEntity) {
        return state;
      }

      const selectKey = getKey(action, selectEntity);
      const newState = {
        ...entityState,
        currentEntityKey: selectKey
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.SelectByKey: {
      const selectByKeyKey = (action as SelectByKey<any>).entityKey;
      if (!selectByKeyKey) {
        return state;
      }

      const newState = {
        ...entityState,
        currentEntityKey: selectByKeyKey
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }

    case EntityActionTypes.SelectMany: {
      const selectManyEntities = (action as SelectMany<any>).entities || [];
      const selectingEntities = Array.isArray(selectManyEntities) ? selectManyEntities : [];
      const selectManyKeys = selectingEntities.map(entity => getKey(action, entity));
      const newState = {
        ...entityState,
        currentEntitiesKeys: selectManyKeys
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.SelectMore: {
      const selectMoreEntities = (action as SelectMore<any>).entities || [];
      const selectingEntities = Array.isArray(selectMoreEntities) ? selectMoreEntities : [];
      const selectMoreKeys = selectingEntities.map(entity => getKey(action, entity));
      const selectMoreCurrentKeys = entityState.currentEntitiesKeys || [];
      const selectMoreCombinedKeys = new Set([...selectMoreCurrentKeys, ...selectMoreKeys]);
      const newState = {
        ...entityState,
        currentEntitiesKeys: [...selectMoreCombinedKeys]
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.SelectManyByKeys: {
      const selectManyByKeysKeys = (action as SelectManyByKeys<any>).entitiesKeys || [];
      const selectManyByKeysGuaranteedKeys = Array.isArray(selectManyByKeysKeys) ? selectManyByKeysKeys : [];
      const newState = {
        ...entityState,
        currentEntitiesKeys: selectManyByKeysGuaranteedKeys
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.SelectMoreByKeys: {
      const selectMoreByKeysKeys = (action as SelectMoreByKeys<any>).entitiesKeys || [];
      const selectMoreByKeysGuaranteedKeys = Array.isArray(selectMoreByKeysKeys) ? selectMoreByKeysKeys : [];
      const selectMoreByKeysCurrentKeys = entityState.currentEntitiesKeys || [];
      const selectMoreByKeysCombinedKeys = new Set([...selectMoreByKeysCurrentKeys, ...selectMoreByKeysGuaranteedKeys]);
      const newState = {
        ...entityState,
        currentEntitiesKeys: [...selectMoreByKeysCombinedKeys]
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
      const deselectManyEntities = (action as DeselectMany<any>).entities || [];
      const deselectingEntities = Array.isArray(deselectManyEntities) ? deselectManyEntities : [];
      const deselectManyEntityKeys = deselectingEntities.map(entity => getKey(action, entity));
      const deselectManyCurrentKeys = entityState.currentEntitiesKeys || [];
      const newState = {
        ...entityState,
        currentEntitiesKeys: deselectManyCurrentKeys.filter(key => !deselectManyEntityKeys.some(k => k === key))
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.DeselectManyByKeys: {
      const deselectManyByKeysKeys = (action as DeselectManyByKeys<any>).entitiesKeys || [];
      const deselectManyByKeysGuaranteedKeys = Array.isArray(deselectManyByKeysKeys) ? deselectManyByKeysKeys : [];
      const deselectManyByKeysCurrentKeys = entityState.currentEntitiesKeys || [];

      const newState = {
        ...entityState,
        currentEntitiesKeys: deselectManyByKeysCurrentKeys.filter(
          key => !deselectManyByKeysGuaranteedKeys.some(k => k === key)
        )
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

    case EntityActionTypes.Edit: {
      const editEntity = (action as Edit<any>).entity;
      if (!editEntity) {
        return state;
      }

      const newState = {
        ...entityState,
        editedEntity: { ...editEntity },
        isDirty: false
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.Change: {
      const changeEntity = (action as Change<any>).entity;
      if (!changeEntity || !entityState.editedEntity) {
        return state;
      }

      const newState = {
        ...entityState,
        editedEntity: { ...changeEntity },
        isDirty: true
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.EndEdit: {
      const newState = {
        ...entityState,
        editedEntity: undefined,
        isDirty: undefined
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
