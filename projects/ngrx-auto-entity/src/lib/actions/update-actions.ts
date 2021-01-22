import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Updates a single entity, corresponding to HTTP PATCH operation.
 *
 * PATCH: Update just the supplied attributes of the entity
 */
export class Update<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Update, correlationId);
  }
}

export class UpdateSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpdateSuccess, correlationId);
  }
}

export class UpdateFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpdateFailure, correlationId);
  }
}

/**
 * Updates many entities, corresponding to HTTP PATCH operation.
 *
 * PATCH: Update just the supplied attributes of the entities
 */
export class UpdateMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpdateMany, correlationId);
  }
}

export class UpdateManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpdateManySuccess, correlationId);
  }
}

export class UpdateManyFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpdateManyFailure, correlationId);
  }
}
