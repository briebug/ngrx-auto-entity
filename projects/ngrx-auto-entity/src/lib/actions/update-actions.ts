import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Updates a single entity.
 *
 * @remarks
 * Update just the supplied attributes of the entity.
 */
export class Update<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entity - The entity to update
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Update, correlationId);
  }
}

/**
 * Handles a successful response when updating a single entity
 */
export class UpdateSuccess<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entity - The entity that was updated
   * @param criteria - The custom criteria from the initial update action
   * @param correlationId - The correlation id for this action; correlates to the initial update action
   */
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpdateSuccess, correlationId);
  }
}

/**
 * Handles an error response when updating a single entity
 */
export class UpdateFailure<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param error - The error object that was thrown
   * @param entity - The entity that failed to be updated
   * @param criteria - The custom criteria from the initial update action
   * @param correlationId - The correlation id for this action; correlates to the initial update action
   */
  constructor(type: new () => TModel, public error: any, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpdateFailure, correlationId);
  }
}

/**
 * Updates many entities.
 *
 * @remarks
 * Update just the supplied attributes of the entities.
 */
export class UpdateMany<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entities - The entities to update
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpdateMany, correlationId);
  }
}

/**
 * Handles a successful response when updating many entities
 */
export class UpdateManySuccess<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entities - The entities that were updated
   * @param criteria - The custom criteria from the initial update many action
   * @param correlationId - The correlation id for this action; correlates to the initial update many action
   */
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpdateManySuccess, correlationId);
  }
}

/**
 * Handles an error response when updating many entities
 */
export class UpdateManyFailure<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param error - The error object that was thrown
   * @param entities - The entities that failed to be updated
   * @param criteria - The custom criteria from the initial update many action
   * @param correlationId - The correlation id for this action; correlates to the initial update many action
   */
  constructor(type: new () => TModel, public error: any, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpdateManyFailure, correlationId);
  }
}
