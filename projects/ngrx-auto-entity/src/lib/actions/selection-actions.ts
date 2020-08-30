import { EntityIdentity } from '../util/entity-state';
import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

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
