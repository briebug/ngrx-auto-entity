import { IPageInfo, IRangeInfo, Page, Range } from '../models';
import { EntityIdentity } from '../util/entity-state';
import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Loads a single instance of an entity, corresponding to HTTP GET /entity/:id operation
 */
export class Load<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public keys?: any, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Load, correlationId);
  }
}

export class LoadSuccess<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public entity: TModel,
    public keys?: any,
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.LoadSuccess, correlationId);
  }
}

export class LoadFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public keys: any,
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.LoadFailure, correlationId);
  }
}

/**
 * Loads many instances of an entity (updating existing state), corresponding to HTTP GET /entity operation
 */
export class LoadMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadMany, correlationId);
  }
}

export class LoadManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadManySuccess, correlationId);
  }
}

export class LoadManyFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadManyFailure, correlationId);
  }
}

/**
 * Loads all instance of an entity (replacing existing state), corresponding to HTTP GET /entity operation
 */
export class LoadAll<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadAll, correlationId);
  }
}

export class LoadAllSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadAllSuccess, correlationId);
  }
}

export class LoadAllFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadAllFailure, correlationId);
  }
}

/**
 * Loads a single page of entities, corresponding to HTTP GET /entity?page&size operation
 */
export class LoadPage<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public page: Page, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadPage, correlationId);
  }
}

export class LoadPageSuccess<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public entities: TModel[],
    public pageInfo: IPageInfo,
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.LoadPageSuccess, correlationId);
  }
}

export class LoadPageFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public page: Page,
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.LoadPageFailure, correlationId);
  }
}

/**
 * Loads a range of entities, corresponding to HTTP GET /entity?start&end|first&last|skip&take operation
 */
export class LoadRange<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public range: Range, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadRange, correlationId);
  }
}

export class LoadRangeSuccess<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public entities: TModel[],
    public rangeInfo: IRangeInfo,
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.LoadRangeSuccess, correlationId);
  }
}

export class LoadRangeFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public range: Range,
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.LoadRangeFailure, correlationId);
  }
}

/**
 * Creates a single entity, corresponding to HTTP POST operation
 */
export class Create<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Create, correlationId);
  }
}

export class CreateSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.CreateSuccess, correlationId);
  }
}

export class CreateFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public entity: TModel,
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.CreateFailure, correlationId);
  }
}

/**
 * Creates many entities, corresponding to HTTP POST operation
 */
export class CreateMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.CreateMany, correlationId);
  }
}

export class CreateManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.CreateManySuccess, correlationId);
  }
}

export class CreateManyFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public entities: TModel[],
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.CreateManyFailure, correlationId);
  }
}

/**
 * Updates a single entity, corresponding to HTTP PATCH operation.
 *
 * PATCH: Update just the supplied attributes of the entity
 */
export class Update<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Update, correlationId);
  }
}

export class UpdateSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpdateSuccess, correlationId);
  }
}

export class UpdateFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public entity: TModel,
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.UpdateFailure, correlationId);
  }
}

/**
 * Updates many entities, corresponding to HTTP PATCH operation.
 *
 * PATCH: Update just the supplied attributes of the entities
 */
export class UpdateMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpdateMany, correlationId);
  }
}

export class UpdateManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpdateManySuccess, correlationId);
  }
}

export class UpdateManyFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public entities: TModel[],
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.UpdateManyFailure, correlationId);
  }
}

/**
 * Updates or inserts a single entity, corresponding to HTTP PUT or POST operation.
 *
 */
export class Upsert<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Upsert, correlationId);
  }
}

export class UpsertSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpsertSuccess, correlationId);
  }
}

export class UpsertFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public entity: TModel,
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.UpsertFailure, correlationId);
  }
}

/**
 * Updates or inserts many entities, corresponding to HTTP PUT or POST operation.
 *
 */
export class UpsertMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpsertMany, correlationId);
  }
}

export class UpsertManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpsertManySuccess, correlationId);
  }
}

export class UpsertManyFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public entities: TModel[],
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.UpsertManyFailure, correlationId);
  }
}

/**
 * Replaces a single entity, corresponding to HTTP PUT operation.
 *
 * PUT: Replace the entity with the one supplied in the request
 */
export class Replace<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Replace, correlationId);
  }
}

export class ReplaceSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.ReplaceSuccess, correlationId);
  }
}

export class ReplaceFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public entity: TModel,
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.ReplaceFailure, correlationId);
  }
}

/**
 * Replaces many entities, corresponding to HTTP PUT operation.
 *
 * PUT: Replace the entities with the ones supplied in the request
 */
export class ReplaceMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.ReplaceMany, correlationId);
  }
}

export class ReplaceManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.ReplaceManySuccess, correlationId);
  }
}

export class ReplaceManyFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public entities: TModel[],
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.ReplaceManyFailure, correlationId);
  }
}

/**
 * Deletes a single entity, corresponding to HTTP DELETE operation
 */
export class Delete<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Delete, correlationId);
  }
}

export class DeleteSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteSuccess, correlationId);
  }
}

export class DeleteFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public entity: TModel,
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.DeleteFailure, correlationId);
  }
}

/**
 * Deletes many entities, corresponding to HTTP DELETE operation
 */
export class DeleteMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteMany, correlationId);
  }
}

export class DeleteManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteManySuccess, correlationId);
  }
}

export class DeleteManyFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public entities: TModel[],
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.DeleteManyFailure, correlationId);
  }
}

/**
 * Deletes a single entity by key, corresponding to HTTP DELETE operation
 */
export class DeleteByKey<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public key: EntityIdentity, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteByKey, correlationId);
  }
}

export class DeleteByKeySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public key: EntityIdentity, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteByKeySuccess, correlationId);
  }
}

export class DeleteByKeyFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public key: EntityIdentity,
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.DeleteByKeyFailure, correlationId);
  }
}

/**
 * Deletes many entities, corresponding to HTTP DELETE operation
 */
export class DeleteManyByKeys<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public keys: EntityIdentity[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteManyByKeys, correlationId);
  }
}

export class DeleteManyByKeysSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public keys: EntityIdentity[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteManyByKeysSuccess, correlationId);
  }
}

export class DeleteManyByKeysFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public keys: EntityIdentity[],
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.DeleteManyByKeysFailure, correlationId);
  }
}

/**
 * Clears all entities for this model from state
 */
export class Clear<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, correlationId?: string) {
    super(type, EntityActionTypes.Clear, correlationId);
  }
}

/**
 * Selects a single entity in the store by the entity model
 */
export class Select<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, correlationId?: string) {
    super(type, EntityActionTypes.Select, correlationId);

    if (entity == null) {
      throw new Error('[NGRX-AE] ! SelectByKey requires an entity.');
    }
  }
}

/**
 * Selects a single entity in the store by the entity key
 */
export class SelectByKey<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entityKey: EntityIdentity, correlationId?: string) {
    super(type, EntityActionTypes.SelectByKey, correlationId);

    if (entityKey == null) {
      throw new Error('[NGRX-AE] ! SelectByKey requires an entity key.');
    }
  }
}

/**
 * Selects many entities in the store by the entity models
 */
export class SelectMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], correlationId?: string) {
    super(type, EntityActionTypes.SelectMany, correlationId);

    if (!Array.isArray(entities)) {
      throw new Error('[NGRX-AE] ! SelectMany action requires an array of entities.');
    }
  }
}

/**
 * Selects more entities in the store by the entity models
 */
export class SelectMore<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], correlationId?: string) {
    super(type, EntityActionTypes.SelectMore, correlationId);

    if (!Array.isArray(entities)) {
      throw new Error('[NGRX-AE] ! SelectMore action requires an array of entities.');
    }
  }
}

/**
 * Selects many entities in the store by the entity keys
 */
export class SelectManyByKeys<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entitiesKeys: EntityIdentity[], correlationId?: string) {
    super(type, EntityActionTypes.SelectManyByKeys, correlationId);

    if (!Array.isArray(entitiesKeys)) {
      throw new Error('[NGRX-AE] ! SelectManyByKeys action requires an array of entity keys.');
    }
  }
}

/**
 * Selects more entities in the store by the entity keys
 */
export class SelectMoreByKeys<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entitiesKeys: EntityIdentity[], correlationId?: string) {
    super(type, EntityActionTypes.SelectMoreByKeys, correlationId);

    if (!Array.isArray(entitiesKeys)) {
      throw new Error('[NGRX-AE] ! SelectMoreByKeys action requires an array of entity keys.');
    }
  }
}

/**
 * Indicates the selection of a single entity in the store
 */
export class Selected<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel | EntityIdentity, correlationId?: string) {
    super(type, EntityActionTypes.Selected, correlationId);
  }
}

/**
 * Indicates the selection of many entities in the store
 */
export class SelectedMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: Array<TModel | EntityIdentity>, correlationId?: string) {
    super(type, EntityActionTypes.SelectedMany, correlationId);

    if (!Array.isArray(entities)) {
      throw new Error('[NGRX-AE] ! SelectedMany action requires an array of entities or keys.');
    }
  }
}

/**
 * Indicates the selection of more entities in the store
 */
export class SelectedMore<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: Array<TModel | EntityIdentity>, correlationId?: string) {
    super(type, EntityActionTypes.SelectedMore, correlationId);

    if (!Array.isArray(entities)) {
      throw new Error('[NGRX-AE] ! SelectedMore action requires an array of entities or keys.');
    }
  }
}

/**
 * De-selects a single entity in the store
 */
export class Deselect<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, correlationId?: string) {
    super(type, EntityActionTypes.Deselect, correlationId);
  }
}

/**
 * De-selects many entities in the store
 */
export class DeselectMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], correlationId?: string) {
    super(type, EntityActionTypes.DeselectMany, correlationId);

    if (!Array.isArray(entities)) {
      throw new Error('[NGRX-AE] ! DeselectMany action requires an array of entities.');
    }
  }
}

/**
 * De-selects many entities in the store by entity keys
 */
export class DeselectManyByKeys<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entitiesKeys: EntityIdentity[], correlationId?: string) {
    super(type, EntityActionTypes.DeselectManyByKeys, correlationId);

    if (!Array.isArray(entitiesKeys)) {
      throw new Error('[NGRX-AE] ! DeselectManyByKeys action requires an array of entity keys.');
    }
  }
}

/**
 * De-selects all entities in the store
 */
export class DeselectAll<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, correlationId?: string) {
    super(type, EntityActionTypes.DeselectAll, correlationId);
  }
}

/**
 * Indicates the de-selection of a single entity in the store
 */
export class Deselected<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, correlationId?: string) {
    super(type, EntityActionTypes.Deselected, correlationId);
  }
}

/**
 * Indicates the de-selection of many entities in the store
 */
export class DeselectedMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: Array<TModel | EntityIdentity>, correlationId?: string) {
    super(type, EntityActionTypes.DeselectedMany, correlationId);

    if (!Array.isArray(entities)) {
      throw new Error('[NGRX-AE] ! DeselectedMany action requires an array of entities or keys.');
    }
  }
}

/**
 * Tracks an entity as being edited in the store
 */
export class Edit<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: Partial<TModel>, correlationId?: string) {
    super(type, EntityActionTypes.Edit, correlationId);
  }
}

/**
 * Indicates an entity is being tracked as edited in the store
 */
export class Edited<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: Partial<TModel>, correlationId?: string) {
    super(type, EntityActionTypes.Edited, correlationId);
  }
}

/**
 * Indicates a change is occurring to the edited entity in the store
 */
export class Change<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: Partial<TModel>, correlationId?: string) {
    super(type, EntityActionTypes.Change, correlationId);
  }
}

/**
 * Indicates a change has occurred to the edited entity in the store
 */
export class Changed<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: Partial<TModel>, correlationId?: string) {
    super(type, EntityActionTypes.Changed, correlationId);
  }
}

/**
 * Ends editing of currently edited entity and clears it from state
 */
export class EndEdit<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, correlationId?: string) {
    super(type, EntityActionTypes.EndEdit, correlationId);
  }
}

/**
 * Indicates editing of currently edited entity has ended
 */
export class EditEnded<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, correlationId?: string) {
    super(type, EntityActionTypes.EditEnded, correlationId);
  }
}
