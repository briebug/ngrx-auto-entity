import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Creates a single entity
 */
export class Create<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entity - The entity to create
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Create, correlationId);
  }
}

/**
 * Handles a successful response when creating a single entity
 */
export class CreateSuccess<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entity - The entity that was created
   * @param criteria - The custom criteria from the initial create action
   * @param correlationId - The correlation id for this action; correlates to the initial create action
   */
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.CreateSuccess, correlationId);
  }
}

/**
 * Handles an error response when creating a single entity
 */
export class CreateFailure<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param error - The error object that was thrown
   * @param entity - The entity that failed to be created
   * @param criteria - The custom criteria from the initial create action
   * @param correlationId - The correlation id for this action; correlates to the initial create action
   */
  constructor(type: new () => TModel, public error: any, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.CreateFailure, correlationId);
  }
}

/**
 * Creates many entities
 */
export class CreateMany<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entities - The entities to create
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.CreateMany, correlationId);
  }
}

/**
 * Handles a successful response when creating many entities
 */
export class CreateManySuccess<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entities - The entities that were created
   * @param criteria - The custom criteria from the initial create many action
   * @param correlationId - The correlation id for this action; correlates to the initial create many action
   */
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.CreateManySuccess, correlationId);
  }
}

/**
 * Handles an error response when creating many entities
 */
export class CreateManyFailure<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param error - The error object that was thrown
   * @param entities - The entities that failed to be created
   * @param criteria - The custom criteria from the initial create many action
   * @param correlationId - The correlation id for this action; correlates to the initial create many action
   */
  constructor(type: new () => TModel, public error: any, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.CreateManyFailure, correlationId);
  }
}
