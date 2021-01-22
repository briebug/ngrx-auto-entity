import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Replaces a single entity, corresponding to HTTP PUT operation.
 *
 * PUT: Replace the entity with the one supplied in the request
 */
export class Replace<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Replace, correlationId);
  }
}

export class ReplaceSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.ReplaceSuccess, correlationId);
  }
}

export class ReplaceFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.ReplaceFailure, correlationId);
  }
}

/**
 * Replaces many entities, corresponding to HTTP PUT operation.
 *
 * PUT: Replace the entities with the ones supplied in the request
 */
export class ReplaceMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.ReplaceMany, correlationId);
  }
}

export class ReplaceManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.ReplaceManySuccess, correlationId);
  }
}

export class ReplaceManyFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.ReplaceManyFailure, correlationId);
  }
}
