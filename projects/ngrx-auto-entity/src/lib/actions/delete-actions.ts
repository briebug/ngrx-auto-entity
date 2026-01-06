import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Deletes a single entity
 */
export class Delete<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entity - The entity to delete
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Delete, correlationId);
  }
}

/**
 * Handles a successful response when deleting a single entity
 */
export class DeleteSuccess<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entity - The entity that was deleted
   * @param criteria - The custom criteria from the initial delete action
   * @param correlationId - The correlation id for this action; correlates to the initial delete action
   */
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteSuccess, correlationId);
  }
}

/**
 * Handles an error response when deleting a single entity
 */
export class DeleteFailure<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param error - The error object that was thrown
   * @param entity - The entity that failed to be deleted
   * @param criteria - The custom criteria from the initial delete action
   * @param correlationId - The correlation id for this action; correlates to the initial delete action
   */
  constructor(type: new () => TModel, public error: any, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteFailure, correlationId);
  }
}

/**
 * Deletes many entities
 */
export class DeleteMany<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entities - The entities to delete
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteMany, correlationId);
  }
}

/**
 * Handles a successful response when deleting many entities
 */
export class DeleteManySuccess<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entities - The entities that were deleted
   * @param criteria - The custom criteria from the initial delete many action
   * @param correlationId - The correlation id for this action; correlates to the initial delete many action
   */
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteManySuccess, correlationId);
  }
}

/**
 * Handles an error response when deleting many entities
 */
export class DeleteManyFailure<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param error - The error object that was thrown
   * @param entities - The entities that failed to be deleted
   * @param criteria - The custom criteria from the initial delete many action
   * @param correlationId - The correlation id for this action; correlates to the initial delete many action
   */
  constructor(type: new () => TModel, public error: any, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteManyFailure, correlationId);
  }
}
