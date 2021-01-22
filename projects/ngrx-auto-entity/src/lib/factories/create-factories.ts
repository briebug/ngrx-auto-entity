import { ActionCreator } from '@ngrx/store';
import { EntityActionTypes } from '../actions/action-types';
import { Create, CreateFailure, CreateMany, CreateManyFailure, CreateManySuccess, CreateSuccess } from '../actions/create-actions';
import { TNew } from '../actions/model-constructor';
import { setActionType } from '../actions/util';
import { cacheOnType, defineTypedFactoryFunction, StandardProps } from './util';

export interface CreateProps<TModel> extends StandardProps {
  entity: TModel;
}

export const createCreateAction = <TModel, T extends string, P extends CreateProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: CreateProps<TModel>) => Create<TModel>> =>
  cacheOnType(Type, EntityActionTypes.Create, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.Create, Type),
      ({ entity, criteria, correlationId }: CreateProps<TModel>) => new Create(Type, entity, criteria, correlationId)
    )
  );

export const createCreateSuccessAction = <TModel, T extends string, P extends CreateProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: CreateProps<TModel>) => CreateSuccess<TModel>> =>
  cacheOnType(Type, EntityActionTypes.CreateSuccess, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.CreateSuccess, Type),
      ({ entity, criteria, correlationId }: CreateProps<TModel>) => new CreateSuccess(Type, entity, criteria, correlationId)
    )
  );

export interface CreateFailureProps<TModel> extends StandardProps {
  error: any;
  entity: TModel;
}

export const createCreateFailureAction = <TModel, T extends string, P extends CreateFailureProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: CreateFailureProps<TModel>) => CreateFailure<TModel>> =>
  cacheOnType(Type, EntityActionTypes.CreateFailure, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.CreateFailure, Type),
      ({ error, entity, criteria, correlationId }: CreateFailureProps<TModel>) =>
        new CreateFailure(Type, error, entity, criteria, correlationId)
    )
  );

export interface CreateManyProps<TModel> extends StandardProps {
  entities: TModel[];
}

export const createCreateManyAction = <TModel, T extends string, P extends CreateManyProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: CreateManyProps<TModel>) => CreateMany<TModel>> =>
  cacheOnType(Type, EntityActionTypes.CreateMany, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.CreateMany, Type),
      ({ entities, criteria, correlationId }: CreateManyProps<TModel>) => new CreateMany(Type, entities, criteria, correlationId)
    )
  );

export const createCreateManySuccessAction = <TModel, T extends string, P extends CreateManyProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: CreateManyProps<TModel>) => CreateManySuccess<TModel>> =>
  cacheOnType(Type, EntityActionTypes.CreateManySuccess, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.CreateManySuccess, Type),
      ({ entities, criteria, correlationId }: CreateManyProps<TModel>) => new CreateManySuccess(Type, entities, criteria, correlationId)
    )
  );

export interface CreateManyFailureProps<TModel> extends StandardProps {
  error: any;
  entities: TModel[];
}

export const createCreateManyFailureAction = <TModel, T extends string, P extends CreateManyFailureProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: CreateManyFailureProps<TModel>) => CreateManyFailure<TModel>> =>
  cacheOnType(Type, EntityActionTypes.CreateManyFailure, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.CreateManyFailure, Type),
      ({ error, entities, criteria, correlationId }: CreateManyFailureProps<TModel>) =>
        new CreateManyFailure(Type, error, entities, criteria, correlationId)
    )
  );
