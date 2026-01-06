import { IRangeInfo, Page, Range } from '../models';
import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Loads instances of a range of entities if necessary
 *
 * @remarks
 * This action will only load the entity if there is no previous loadedAt date or entities in state,
 * or if the current range information for entities in state does not intersect the range being loaded
 * This is an alternative initiation action that will ultimately result in Load being dispatched
 */
export class LoadRangeIfNecessary<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param range - The range to load
   * @param maxAge - The max age of the entity, after which load will be performed regardless
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public range: Range, public maxAge?: number, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadRangeIfNecessary, correlationId);
  }
}

/**
 * Loads instances of a range of entities
 *
 * @remarks
 * The loaded entities will be added to any range of entities already in state
 * Will update the current range info in state
 */
export class LoadRange<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param range - The to load
   * @param criteria - The custom criteria for this action
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, public range: Range, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadRange, correlationId);
  }
}

/**
 * Handles a successful response for loading a range of entities
 */
export class LoadRangeSuccess<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param entities - The entities that were loaded
   * @param rangeInfo - The information about the range that was loaded
   * @param criteria - The custom criteria from the initial load range action
   * @param correlationId - The correlation id for this action; correlates to the initial load range action
   */
  constructor(
    type: new () => TModel,
    public entities: TModel[],
    public rangeInfo: IRangeInfo,
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.LoadRangeSuccess, correlationId);
  }
}

/**
 * Handles an error response when loading a page of entities
 */
export class LoadRangeFailure<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param error - The error object that was thrown
   * @param range - The range that failed to load
   * @param criteria - The custom criteria from the initial load range action
   * @param correlationId - The correlation id for this action; correlates to the initial load range action
   */
  constructor(type: new () => TModel, public error: any, public range: Range, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadRangeFailure, correlationId);
  }
}
