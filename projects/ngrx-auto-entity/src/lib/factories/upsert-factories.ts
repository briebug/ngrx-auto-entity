import { ActionCreator } from '@ngrx/store';
import { EntityActionTypes } from '../actions/action-types';
import { Upsert, UpsertFailure, UpsertMany, UpsertManyFailure, UpsertManySuccess, UpsertSuccess } from '../actions/upsert-actions';
import { TNew } from '../actions/model-constructor';
import { setActionType } from '../actions/util';
import { cacheOnType, defineTypedFactoryFunction, StandardProps } from './util';

export interface UpsertProps<TModel> extends StandardProps {
  entity: TModel;
}

export const createUpsertAction = <TModel, T extends string, P extends UpsertProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: UpsertProps<TModel>) => Upsert<TModel>> =>
  cacheOnType(Type, EntityActionTypes.Upsert, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.Upsert, Type),
      ({ entity, criteria, correlationId }: UpsertProps<TModel>) => new Upsert(Type, entity, criteria, correlationId)
    )
  );

export const createUpsertSuccessAction = <TModel, T extends string, P extends UpsertProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: UpsertProps<TModel>) => UpsertSuccess<TModel>> =>
  cacheOnType(Type, EntityActionTypes.UpsertSuccess, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.UpsertSuccess, Type),
      ({ entity, criteria, correlationId }: UpsertProps<TModel>) => new UpsertSuccess(Type, entity, criteria, correlationId)
    )
  );

export interface UpsertFailureProps<TModel> extends StandardProps {
  error: any;
  entity: TModel;
}

export const createUpsertFailureAction = <TModel, T extends string, P extends UpsertFailureProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: UpsertFailureProps<TModel>) => UpsertFailure<TModel>> =>
  cacheOnType(Type, EntityActionTypes.UpsertFailure, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.UpsertFailure, Type),
      ({ error, entity, criteria, correlationId }: UpsertFailureProps<TModel>) =>
        new UpsertFailure(Type, error, entity, criteria, correlationId)
    )
  );

export interface UpsertManyProps<TModel> extends StandardProps {
  entities: TModel[];
}

export const createUpsertManyAction = <TModel, T extends string, P extends UpsertManyProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: UpsertManyProps<TModel>) => UpsertMany<TModel>> =>
  cacheOnType(Type, EntityActionTypes.UpsertMany, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.UpsertMany, Type),
      ({ entities, criteria, correlationId }: UpsertManyProps<TModel>) => new UpsertMany(Type, entities, criteria, correlationId)
    )
  );

export const createUpsertManySuccessAction = <TModel, T extends string, P extends UpsertManyProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: UpsertManyProps<TModel>) => UpsertManySuccess<TModel>> =>
  cacheOnType(Type, EntityActionTypes.UpsertManySuccess, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.UpsertManySuccess, Type),
      ({ entities, criteria, correlationId }: UpsertManyProps<TModel>) => new UpsertManySuccess(Type, entities, criteria, correlationId)
    )
  );

export interface UpsertManyFailureProps<TModel> extends StandardProps {
  error: any;
  entities: TModel[];
}

export const createUpsertManyFailureAction = <TModel, T extends string, P extends UpsertManyFailureProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: UpsertManyFailureProps<TModel>) => UpsertManyFailure<TModel>> =>
  cacheOnType(Type, EntityActionTypes.UpsertManyFailure, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.UpsertManyFailure, Type),
      ({ error, entities, criteria, correlationId }: UpsertManyFailureProps<TModel>) =>
        new UpsertManyFailure(Type, error, entities, criteria, correlationId)
    )
  );
