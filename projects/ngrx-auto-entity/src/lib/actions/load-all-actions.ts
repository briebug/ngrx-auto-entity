import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Loads all instances of an entity if necessary
 *
 * @remarks
 * This action will only load the entity if there is no previous loadedAt date or any entities in state
 * This is an alternative initiation action that will ultimately result in Load being dispatched
 */
export class LoadAllIfNecessary<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param maxAge - The max age of the entity, after which load will be performed regardless
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public maxAge?: number, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadAllIfNecessary, correlationId);
  }
}

/**
 * Loads all instances of an entity
 *
 * @remarks
 * Replaces all entities for this model in state.
 */
export class LoadAll<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadAll, correlationId);
  }
}

/**
 * Handles a successful response for loading all entities
 */
export class LoadAllSuccess<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entities - The entities that were loaded
   * @param criteria - The custom criteria from the initial load all action
   * @param correlationId - The correlation id for this action; correlates to the initial load all action
   */
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadAllSuccess, correlationId);
  }
}

/**
 * Handles an error response when loading all entities
 */
export class LoadAllFailure<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param error - The error object that was thrown
   * @param criteria - The custom criteria from the initial load all action
   * @param correlationId - The correlation id for this action; correlates to the initial load all action
   */
  constructor(type: new () => TModel, public error: any, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadAllFailure, correlationId);
  }
}
