import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Updates or inserts a single entity, corresponding to HTTP PUT or POST operation.
 *
 */
export class Upsert<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Upsert, correlationId);
  }
}

export class UpsertSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpsertSuccess, correlationId);
  }
}

export class UpsertFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpsertFailure, correlationId);
  }
}

/**
 * Updates or inserts many entities, corresponding to HTTP PUT or POST operation.
 *
 */
export class UpsertMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpsertMany, correlationId);
  }
}

export class UpsertManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpsertManySuccess, correlationId);
  }
}

export class UpsertManyFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpsertManyFailure, correlationId);
  }
}
