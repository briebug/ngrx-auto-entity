import { ActionCreator } from '@ngrx/store';
import { EntityIdentity } from '../types/entity-identity';
import { EntityActionTypes } from '../actions/action-types';
import {
  DeleteByKey,
  DeleteByKeyFailure,
  DeleteManyByKeys,
  DeleteManyByKeysFailure,
  DeleteManyByKeysSuccess,
  DeleteByKeySuccess
} from '../actions/delete-by-key-actions';
import { TNew } from '../actions/model-constructor';
import { setActionType } from '../actions/util';
import { cacheOnType, defineTypedFactoryFunction, StandardProps } from './util';

export interface DeleteByKeyProps<TModel> extends StandardProps {
  key: EntityIdentity;
}

export const createDeleteByKeyAction = <TModel, T extends string, P extends DeleteByKeyProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: DeleteByKeyProps<TModel>) => DeleteByKey<TModel>> =>
  cacheOnType(Type, EntityActionTypes.DeleteByKey, () => defineTypedFactoryFunction(
    setActionType(EntityActionTypes.DeleteByKey, Type),
    ({ key, criteria, correlationId }: DeleteByKeyProps<TModel>) => new DeleteByKey(Type, key, criteria, correlationId)
  ));

export const createDeleteByKeySuccessAction = <TModel, T extends string, P extends DeleteByKeyProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: DeleteByKeyProps<TModel>) => DeleteByKeySuccess<TModel>> =>
  cacheOnType(Type, EntityActionTypes.DeleteByKeySuccess, () => defineTypedFactoryFunction(
    setActionType(EntityActionTypes.DeleteByKeySuccess, Type),
    ({ key, criteria, correlationId }: DeleteByKeyProps<TModel>) =>
      new DeleteByKeySuccess(Type, key, criteria, correlationId)
  ));

export interface DeleteByKeyFailureProps<TModel> extends StandardProps {
  error: any;
  key: EntityIdentity;
}

export const createDeleteByKeyFailureAction = <TModel, T extends string, P extends DeleteByKeyFailureProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: DeleteByKeyFailureProps<TModel>) => DeleteByKeyFailure<TModel>> =>
  cacheOnType(Type, EntityActionTypes.DeleteByKeyFailure, () => defineTypedFactoryFunction(
    setActionType(EntityActionTypes.DeleteByKeyFailure, Type),
    ({ error, key, criteria, correlationId }: DeleteByKeyFailureProps<TModel>) =>
      new DeleteByKeyFailure(Type, error, key, criteria, correlationId)
  ));



export interface DeleteManyByKeysProps<TModel> extends StandardProps {
  keys: EntityIdentity[];
}

export const createDeleteManyByKeysAction = <TModel, T extends string, P extends DeleteManyByKeysProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: DeleteManyByKeysProps<TModel>) => DeleteManyByKeys<TModel>> =>
  cacheOnType(Type, EntityActionTypes.DeleteManyByKeys, () => defineTypedFactoryFunction(
    setActionType(EntityActionTypes.DeleteManyByKeys, Type),
    ({ keys, criteria, correlationId }: DeleteManyByKeysProps<TModel>) => new DeleteManyByKeys(Type, keys, criteria, correlationId)
  ));

export const createDeleteManyByKeysSuccessAction = <TModel, T extends string, P extends DeleteManyByKeysProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: DeleteManyByKeysProps<TModel>) => DeleteManyByKeysSuccess<TModel>> =>
  cacheOnType(Type, EntityActionTypes.DeleteManyByKeysSuccess, () => defineTypedFactoryFunction(
    setActionType(EntityActionTypes.DeleteManyByKeysSuccess, Type),
    ({ keys, criteria, correlationId }: DeleteManyByKeysProps<TModel>) =>
      new DeleteManyByKeysSuccess(Type, keys, criteria, correlationId)
  ));

export interface DeleteManyByKeysFailureProps<TModel> extends StandardProps {
  error: any;
  keys: EntityIdentity[];
}

export const createDeleteManyByKeysFailureAction = <TModel, T extends string, P extends DeleteManyByKeysFailureProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: DeleteManyByKeysFailureProps<TModel>) => DeleteManyByKeysFailure<TModel>> =>
  cacheOnType(Type, EntityActionTypes.DeleteManyByKeysFailure, () => defineTypedFactoryFunction(
    setActionType(EntityActionTypes.DeleteManyByKeysFailure, Type),
    ({ error, keys, criteria, correlationId }: DeleteManyByKeysFailureProps<TModel>) =>
      new DeleteManyByKeysFailure(Type, error, keys, criteria, correlationId)
  ));


