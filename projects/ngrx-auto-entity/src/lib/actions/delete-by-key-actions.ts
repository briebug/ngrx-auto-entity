import { EntityIdentity } from '../types/entity-identity';
import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Deletes a single entity by key
 */
export class DeleteByKey<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param key - The key of the entity to delete
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public key: EntityIdentity, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteByKey, correlationId);
  }
}

/**
 * Handles a successful response when deleting a single entity by key
 */
export class DeleteByKeySuccess<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param key - The key for the entity that was deleted
   * @param criteria - The custom criteria from the initial delete-by-key action
   * @param correlationId - The correlation id for this action; correlates to the initial delete-by-key action
   */
  constructor(type: new () => TModel, public key: EntityIdentity, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteByKeySuccess, correlationId);
  }
}

/**
 * Handles an error response when deleting a single entity by key
 */
export class DeleteByKeyFailure<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param error - The error object that was thrown
   * @param key - The key for the entity that failed to be deleted
   * @param criteria - The custom criteria from the initial delete-by-key action
   * @param correlationId - The correlation id for this action; correlates to the initial delete-by-key action
   */
  constructor(type: new () => TModel, public error: any, public key: EntityIdentity, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteByKeyFailure, correlationId);
  }
}

/**
 * Deletes many entities
 */
export class DeleteManyByKeys<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param keys - The keys for the entities to delete
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public keys: EntityIdentity[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteManyByKeys, correlationId);
  }
}

/**
 * Handles a successful response when deleting many entities by key
 */
export class DeleteManyByKeysSuccess<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param keys - The keys for the entities that were deleted
   * @param criteria - The custom criteria from the initial delete-many-by-keys action
   * @param correlationId - The correlation id for this action; correlates to the initial delete-many-by-keys action
   */
  constructor(type: new () => TModel, public keys: EntityIdentity[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteManyByKeysSuccess, correlationId);
  }
}

/**
 * Handles an error response when deleting many entities by key
 */
export class DeleteManyByKeysFailure<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param error - The error object that was thrown
   * @param keys - The keys for the entities that failed to be deleted
   * @param criteria - The custom criteria from the initial delete-many-by-keys action
   * @param correlationId - The correlation id for this action; correlates to the initial delete-many-by-keys action
   */
  constructor(type: new () => TModel, public error: any, public keys: EntityIdentity[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteManyByKeysFailure, correlationId);
  }
}
