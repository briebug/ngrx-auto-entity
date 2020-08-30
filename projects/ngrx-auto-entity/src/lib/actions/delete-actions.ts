import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Deletes a single entity, corresponding to HTTP DELETE operation
 */
export class Delete<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Delete, correlationId);
  }
}

export class DeleteSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteSuccess, correlationId);
  }
}

export class DeleteFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public entity: TModel,
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.DeleteFailure, correlationId);
  }
}

/**
 * Deletes many entities, corresponding to HTTP DELETE operation
 */
export class DeleteMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteMany, correlationId);
  }
}

export class DeleteManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteManySuccess, correlationId);
  }
}

export class DeleteManyFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public entities: TModel[],
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.DeleteManyFailure, correlationId);
  }
}
