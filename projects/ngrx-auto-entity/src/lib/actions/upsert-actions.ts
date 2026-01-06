import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Updates or inserts a single entity.
 */
export class Upsert<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entity - The entity to upsert
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Upsert, correlationId);
  }
}

/**
 * Handles a successful response when upserting a single entity
 */
export class UpsertSuccess<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entity - The entity that was upserted
   * @param criteria - The custom criteria from the initial upsert action
   * @param correlationId - The correlation id for this action; correlates to the initial upsert action
   */
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpsertSuccess, correlationId);
  }
}

/**
 * Handles an error response when upserting a single entity
 */
export class UpsertFailure<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param error - The error object that was thrown
   * @param entity - The entity that failed to be upserted
   * @param criteria - The custom criteria from the initial upsert action
   * @param correlationId - The correlation id for this action; correlates to the initial upsert action
   */
  constructor(type: new () => TModel, public error: any, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpsertFailure, correlationId);
  }
}

/**
 * Updates or inserts many entities.
 */
export class UpsertMany<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entities - The entities to upsert
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpsertMany, correlationId);
  }
}

/**
 * Handles a successful response when upserting many entities
 */
export class UpsertManySuccess<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entities - The entities that were upserted
   * @param criteria - The custom criteria from the initial upsert many action
   * @param correlationId - The correlation id for this action; correlates to the initial upsert many action
   */
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpsertManySuccess, correlationId);
  }
}

/**
 * Handles an error response when upserting many entities
 */
export class UpsertManyFailure<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param error - The error object that was thrown
   * @param entities - The entities that failed to be upserted
   * @param criteria - The custom criteria from the initial upsert many action
   * @param correlationId - The correlation id for this action; correlates to the initial upsert many action
   */
  constructor(type: new () => TModel, public error: any, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpsertManyFailure, correlationId);
  }
}
