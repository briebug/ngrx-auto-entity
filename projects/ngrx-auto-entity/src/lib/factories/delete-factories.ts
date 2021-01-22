import { ActionCreator } from '@ngrx/store';
import { EntityActionTypes } from '../actions/action-types';
import { Delete, DeleteFailure, DeleteMany, DeleteManyFailure, DeleteManySuccess, DeleteSuccess } from '../actions/delete-actions';
import { TNew } from '../actions/model-constructor';
import { setActionType } from '../actions/util';
import { cacheOnType, defineTypedFactoryFunction, StandardProps } from './util';

export interface DeleteProps<TModel> extends StandardProps {
  entity: TModel;
}

export const createDeleteAction = <TModel, T extends string, P extends DeleteProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: DeleteProps<TModel>) => Delete<TModel>> =>
  cacheOnType(Type, EntityActionTypes.Delete, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.Delete, Type),
      ({ entity, criteria, correlationId }: DeleteProps<TModel>) => new Delete(Type, entity, criteria, correlationId)
    )
  );

export const createDeleteSuccessAction = <TModel, T extends string, P extends DeleteProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: DeleteProps<TModel>) => DeleteSuccess<TModel>> =>
  cacheOnType(Type, EntityActionTypes.DeleteSuccess, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.DeleteSuccess, Type),
      ({ entity, criteria, correlationId }: DeleteProps<TModel>) => new DeleteSuccess(Type, entity, criteria, correlationId)
    )
  );

export interface DeleteFailureProps<TModel> extends StandardProps {
  error: any;
  entity: TModel;
}

export const createDeleteFailureAction = <TModel, T extends string, P extends DeleteFailureProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: DeleteFailureProps<TModel>) => DeleteFailure<TModel>> =>
  cacheOnType(Type, EntityActionTypes.DeleteFailure, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.DeleteFailure, Type),
      ({ error, entity, criteria, correlationId }: DeleteFailureProps<TModel>) =>
        new DeleteFailure(Type, error, entity, criteria, correlationId)
    )
  );

export interface DeleteManyProps<TModel> extends StandardProps {
  entities: TModel[];
}

export const createDeleteManyAction = <TModel, T extends string, P extends DeleteManyProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: DeleteManyProps<TModel>) => DeleteMany<TModel>> =>
  cacheOnType(Type, EntityActionTypes.DeleteMany, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.DeleteMany, Type),
      ({ entities, criteria, correlationId }: DeleteManyProps<TModel>) => new DeleteMany(Type, entities, criteria, correlationId)
    )
  );

export const createDeleteManySuccessAction = <TModel, T extends string, P extends DeleteManyProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: DeleteManyProps<TModel>) => DeleteManySuccess<TModel>> =>
  cacheOnType(Type, EntityActionTypes.DeleteManySuccess, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.DeleteManySuccess, Type),
      ({ entities, criteria, correlationId }: DeleteManyProps<TModel>) => new DeleteManySuccess(Type, entities, criteria, correlationId)
    )
  );

export interface DeleteManyFailureProps<TModel> extends StandardProps {
  error: any;
  entities: TModel[];
}

export const createDeleteManyFailureAction = <TModel, T extends string, P extends DeleteManyFailureProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: DeleteManyFailureProps<TModel>) => DeleteManyFailure<TModel>> =>
  cacheOnType(Type, EntityActionTypes.DeleteManyFailure, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.DeleteManyFailure, Type),
      ({ error, entities, criteria, correlationId }: DeleteManyFailureProps<TModel>) =>
        new DeleteManyFailure(Type, error, entities, criteria, correlationId)
    )
  );
