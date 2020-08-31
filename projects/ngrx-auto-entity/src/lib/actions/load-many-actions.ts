import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Loads all instances of an entity if necessary
 * HTTP GET /entity
 *
 * @remarks:
 * This action will only load the entity if there is no previous loadedAt date or any entities in state
 * This is an alternative initiation action that will ultimately result in Load being dispatched
 *
 * @param type - The entity model decorated with @Entity
 * @param maxAge - (optional) The max age of the entity, after which load will be performed regardless
 * @param criteria - (optional) The custom criteria for this action
 * @param correlationId - (optional) A custom correlation id for this action; Use to correlate subsequent result actions
 */
export class LoadManyIfNecessary<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public maxAge?: number, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadManyIfNecessary, correlationId);
  }
}

/**
 * Loads many instances of an entity
 * HTTP GET /entity
 *
 * @remarks:
 * Replaces many entities for this model in state. Loaded entities will be merged into state, updating
 * existing entities (by key) or adding new entities (key not found in state).
 *
 * @param type - The entity model decorated with @Entity
 * @param criteria - (optional) The custom criteria for this action
 * @param correlationId - (optional) A custom correlation id for this action; Use to correlate subsequent result actions
 */
export class LoadMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadMany, correlationId);
  }
}

/**
 * Handles a successful response for loading many entities
 * HTTP GET /entity
 *
 * @param type - The entity model decorated with @Entity
 * @param entities - The entities that were loaded
 * @param criteria - (optional) The custom criteria from the initial load many action
 * @param correlationId - (optional) The correlationId for this action; correlates to initial load many action
 */
export class LoadManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadManySuccess, correlationId);
  }
}

/**
 * Handles an error response when loading many entities
 * HTTP GET /entity
 *
 * @param type - The entity model decorated with @Entity
 * @param error - (optional) The error object that was thrown
 * @param criteria - (optional) The custom criteria from the initial load many action
 * @param correlationId - (optional) The correlationId for this action; correlates to initial load many action
 */
export class LoadManyFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadManyFailure, correlationId);
  }
}
