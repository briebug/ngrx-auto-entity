import { EntityIdentity } from '../util/entity-state';
import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Deletes a single entity by key, corresponding to HTTP DELETE operation
 */
export class DeleteByKey<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public key: EntityIdentity, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteByKey, correlationId);
  }
}

export class DeleteByKeySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public key: EntityIdentity, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteByKeySuccess, correlationId);
  }
}

export class DeleteByKeyFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public key: EntityIdentity,
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.DeleteByKeyFailure, correlationId);
  }
}

/**
 * Deletes many entities, corresponding to HTTP DELETE operation
 */
export class DeleteManyByKeys<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public keys: EntityIdentity[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteManyByKeys, correlationId);
  }
}

export class DeleteManyByKeysSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public keys: EntityIdentity[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteManyByKeysSuccess, correlationId);
  }
}

export class DeleteManyByKeysFailure<TModel> extends EntityAction<TModel> {
  constructor(
    type: new () => TModel,
    public error: any,
    public keys: EntityIdentity[],
    public criteria?: any,
    correlationId?: string
  ) {
    super(type, EntityActionTypes.DeleteManyByKeysFailure, correlationId);
  }
}
