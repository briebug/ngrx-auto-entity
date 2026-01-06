import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Replaces a single entity.
 */
export class Replace<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entity - The entity to replace with
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Replace, correlationId);
  }
}

/**
 * Handles a successful response when replacing a single entity
 */
export class ReplaceSuccess<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entity - The entity that was replaced
   * @param criteria - The custom criteria from the initial replace action
   * @param correlationId - The correlation id for this action; correlates to the initial replace action
   */
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.ReplaceSuccess, correlationId);
  }
}

/**
 * Handles an error response when replacing a single entity
 */
export class ReplaceFailure<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param error - The error object that was thrown
   * @param entity - The entity that failed to be replaced
   * @param criteria - The custom criteria from the initial replace action
   * @param correlationId - The correlation id for this action; correlates to the initial replace action
   */
  constructor(type: new () => TModel, public error: any, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.ReplaceFailure, correlationId);
  }
}

/**
 * Replaces many entities.
 */
export class ReplaceMany<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entities - The entities to replace with
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.ReplaceMany, correlationId);
  }
}

/**
 * Handles a successful response when replacing many entities
 */
export class ReplaceManySuccess<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entities - The entities that were replaced
   * @param criteria - The custom criteria from the initial replace many action
   * @param correlationId - The correlation id for this action; correlates to the initial replace many action
   */
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.ReplaceManySuccess, correlationId);
  }
}

/**
 * Handles an error response when replacing many entities
 */
export class ReplaceManyFailure<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param error - The error object that was thrown
   * @param entities - The entities that failed to be replaced
   * @param criteria - The custom criteria from the initial replace many action
   * @param correlationId - The correlation id for this action; correlates to the initial replace many action
   */
  constructor(type: new () => TModel, public error: any, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.ReplaceManyFailure, correlationId);
  }
}
