import { EntityIdentity } from '../types/entity-identity';
import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * De-selects a single entity in the store
 */
export class Deselect<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param correlationId - A custom correlation id for this action
   */
  constructor(type: new () => TModel, correlationId?: string) {
    super(type, EntityActionTypes.Deselect, correlationId);
  }
}

/**
 * De-selects many entities in the store
 */
export class DeselectMany<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entities - The entities to deselect
   * @param correlationId - A custom correlation id for this action
   */
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
  /**
   * @param type - The entity model decorated with @Entity
   * @param entitiesKeys - The entity keys to deselect
   * @param correlationId - A custom correlation id for this action
   */
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
  /**
   * @param type - The entity model decorated with @Entity
   * @param correlationId - A custom correlation id for this action
   */
  constructor(type: new () => TModel, correlationId?: string) {
    super(type, EntityActionTypes.DeselectAll, correlationId);
  }
}

/**
 * Indicates the de-selection of a single entity in the store
 */
export class Deselected<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param correlationId - The correlation id for this action; correlates to the initial deselect action
   */
  constructor(type: new () => TModel, correlationId?: string) {
    super(type, EntityActionTypes.Deselected, correlationId);
  }
}

/**
 * Indicates the de-selection of many entities in the store
 */
export class DeselectedMany<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entities - The entities or keys that were deselected
   * @param correlationId - The correlation id for this action; correlates to the initial deselected-many action
   */
  constructor(type: new () => TModel, public entities: Array<TModel | EntityIdentity> | null, correlationId?: string) {
    super(type, EntityActionTypes.DeselectedMany, correlationId);

    if (!Array.isArray(entities) && entities !== null) {
      throw new Error('[NGRX-AE] ! DeselectedMany action requires an array of entities or keys.');
    }
  }
}
