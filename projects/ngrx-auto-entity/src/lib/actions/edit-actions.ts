import { EntityIdentity } from '../types/entity-identity';
import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Tracks a new entity as being edited in the store
 */
export class EditNew<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entity - The partial entity to initialize editing with
   * @param correlationId - A custom correlation id for this action
   */
  constructor(type: new () => TModel, public entity?: Partial<TModel>, correlationId?: string) {
    super(type, EntityActionTypes.EditNew, correlationId);
  }
}

/**
 * Tracks an entity as being edited in the store
 */
export class Edit<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entity - The partial entity representing edits in progress
   * @param correlationId - A custom correlation id for this action
   */
  constructor(type: new () => TModel, public entity: Partial<TModel>, correlationId?: string) {
    super(type, EntityActionTypes.Edit, correlationId);
  }
}

/**
 * Tracks an entity (by its key) as being edited in the store
 */
export class EditByKey<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param key - The key of the entity being edited
   * @param correlationId - A custom correlation id for this action
   */
  constructor(type: new () => TModel, public key: EntityIdentity, correlationId?: string) {
    super(type, EntityActionTypes.EditByKey, correlationId);
  }
}

/**
 * Indicates an entity is being tracked as edited in the store
 */
export class Edited<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entity - The partial entity that is now tracked as edited
   * @param correlationId - The correlation id for this action; correlates to the initial edit action
   */
  constructor(type: new () => TModel, public entity: Partial<TModel>, correlationId?: string) {
    super(type, EntityActionTypes.Edited, correlationId);
  }
}

/**
 * Indicates an entity (by its key) is being tracked as edited in the store
 */
export class EditedByKey<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param key - The key of the entity tracked as edited
   * @param correlationId - The correlation id for this action; correlates to the initial edit-by-key action
   */
  constructor(type: new () => TModel, public key: EntityIdentity, correlationId?: string) {
    super(type, EntityActionTypes.EditedByKey, correlationId);
  }
}

/**
 * Indicates a change is occurring to the edited entity in the store
 */
export class Change<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entity - The partial entity capturing the change
   * @param correlationId - A custom correlation id for this action
   */
  constructor(type: new () => TModel, public entity: Partial<TModel>, correlationId?: string) {
    super(type, EntityActionTypes.Change, correlationId);
  }
}

/**
 * Indicates a change has occurred to the edited entity in the store
 */
export class Changed<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entity - The partial entity reflecting the result of the change
   * @param correlationId - The correlation id for this action; correlates to the initial change action
   */
  constructor(type: new () => TModel, public entity: Partial<TModel>, correlationId?: string) {
    super(type, EntityActionTypes.Changed, correlationId);
  }
}

/**
 * Ends editing of currently edited entity and clears it from state
 */
export class EndEdit<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param correlationId - A custom correlation id for this action
   */
  constructor(type: new () => TModel, correlationId?: string) {
    super(type, EntityActionTypes.EndEdit, correlationId);
  }
}

/**
 * Indicates editing of currently edited entity has ended
 */
export class EditEnded<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param correlationId - The correlation id for this action; correlates to the initial end-edit action
   */
  constructor(type: new () => TModel, correlationId?: string) {
    super(type, EntityActionTypes.EditEnded, correlationId);
  }
}
