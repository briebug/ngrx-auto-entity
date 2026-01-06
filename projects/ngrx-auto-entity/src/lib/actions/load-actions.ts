import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Loads a single instance of an entity if necessary
 * HTTP GET /entity/:id operation
 *
 * @remarks
 * This action will only load the entity if it does not exist in state, referenced by key
 * This is an alternative initiation action that will ultimately result in Load being dispatched
 */
export class LoadIfNecessary<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param keys - The keys of the entity you wish to load
   * @param maxAge - The max age of the entity, after which load will be performed regardless
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public keys?: any, public maxAge?: number, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadIfNecessary, correlationId);
  }
}

/**
 * Loads a single instance of an entity
 * HTTP GET /entity/:id
 *
 * @remarks
 * The loaded entity will replace any existing entity in state
 */
export class Load<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param keys - The keys of the entity you wish to load
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public keys?: any, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Load, correlationId);
  }
}

/**
 * Handles a successful response for loading an entity
 * HTTP GET /entity/:id
 */
export class LoadSuccess<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entity - The entity that was loaded
   * @param keys - The keys of the entity you loaded
   * @param criteria - The custom criteria from the initial load action
   * @param correlationId - The correlation id for this action; correlates to the initial load action
   */
  constructor(type: new () => TModel, public entity: TModel, public keys?: any, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadSuccess, correlationId);
  }
}

/**
 * Handles an error response when loading an entity
 * HTTP GET /entity/:id
 */
export class LoadFailure<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param error - The error object that was thrown
   * @param keys - The keys of the entity you loaded
   * @param criteria - The custom criteria from the initial load action
   * @param correlationId - The correlation id for this action; correlates to the initial load action
   */
  constructor(type: new () => TModel, public error: any, public keys?: any, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadFailure, correlationId);
  }
}
