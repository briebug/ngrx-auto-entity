import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Creates a single entity, corresponding to HTTP POST operation
 */
export class Create<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Create, correlationId);
  }
}

export class CreateSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.CreateSuccess, correlationId);
  }
}

export class CreateFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public entity: TModel,
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.CreateFailure, correlationId);
  }
}

/**
 * Creates many entities, corresponding to HTTP POST operation
 */
export class CreateMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.CreateMany, correlationId);
  }
}

export class CreateManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.CreateManySuccess, correlationId);
  }
}

export class CreateManyFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public entities: TModel[],
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.CreateManyFailure, correlationId);
  }
}
