import { IPageInfo, Page } from '../models';
import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Loads instances of a page of entities if necessary
 *
 * @remarks
 * This action will only load the entity if there is no previous loadedAt date or entities in state,
 * or if the current page information for entities in state does not match the page being loaded
 * This is an alternative initiation action that will ultimately result in Load being dispatched
 */
export class LoadPageIfNecessary<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param page - The page to load
   * @param maxAge - The max age of the entity, after which load will be performed regardless
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public page: Page, public maxAge?: number, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadPageIfNecessary, correlationId);
  }
}

/**
 * Loads a single page of an entity
 *
 * @remarks
 * The loaded page of entities will replace all entities for this model in state
 * Will update the current page info in state
 */
export class LoadPage<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param page - The page to load
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public page: Page, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadPage, correlationId);
  }
}

/**
 * Handles a successful response for loading a page of entities
 */
export class LoadPageSuccess<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entities - The entities that were loaded
   * @param pageInfo - The information about the page that was loaded
   * @param criteria - The custom criteria from the initial load page action
   * @param correlationId - The correlation id for this action; correlates to the initial load page action
   */
  constructor(
    type: new () => TModel,
    public entities: TModel[],
    public pageInfo: IPageInfo,
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.LoadPageSuccess, correlationId);
  }
}

/**
 * Handles an error response when loading a page of entities
 */
export class LoadPageFailure<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param error - The error object that was thrown
   * @param page - The page that failed to load
   * @param criteria - The custom criteria from the initial load page action
   * @param correlationId - The correlation id for this action; correlates to the initial load page action
   */
  constructor(type: new () => TModel, public error: any, public page: Page, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadPageFailure, correlationId);
  }
}
