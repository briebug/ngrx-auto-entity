import { ActionCreator } from '@ngrx/store';
import { EntityActionTypes } from '../actions/action-types';
import { Update, UpdateFailure, UpdateMany, UpdateManyFailure, UpdateManySuccess, UpdateSuccess } from '../actions/update-actions';
import { TNew } from '../actions/model-constructor';
import { setActionType } from '../actions/util';
import { cacheOnType, defineTypedFactoryFunction, StandardProps } from './util';

export interface UpdateProps<TModel> extends StandardProps {
  entity: TModel;
}

export const createUpdateAction = <TModel, T extends string, P extends UpdateProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: UpdateProps<TModel>) => Update<TModel>> =>
  cacheOnType(Type, EntityActionTypes.Update, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.Update, Type),
      ({ entity, criteria, correlationId }: UpdateProps<TModel>) => new Update(Type, entity, criteria, correlationId)
    )
  );

export const createUpdateSuccessAction = <TModel, T extends string, P extends UpdateProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: UpdateProps<TModel>) => UpdateSuccess<TModel>> =>
  cacheOnType(Type, EntityActionTypes.UpdateSuccess, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.UpdateSuccess, Type),
      ({ entity, criteria, correlationId }: UpdateProps<TModel>) => new UpdateSuccess(Type, entity, criteria, correlationId)
    )
  );

export interface UpdateFailureProps<TModel> extends StandardProps {
  error: any;
  entity: TModel;
}

export const createUpdateFailureAction = <TModel, T extends string, P extends UpdateFailureProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: UpdateFailureProps<TModel>) => UpdateFailure<TModel>> =>
  cacheOnType(Type, EntityActionTypes.UpdateFailure, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.UpdateFailure, Type),
      ({ error, entity, criteria, correlationId }: UpdateFailureProps<TModel>) =>
        new UpdateFailure(Type, error, entity, criteria, correlationId)
    )
  );

export interface UpdateManyProps<TModel> extends StandardProps {
  entities: TModel[];
}

export const createUpdateManyAction = <TModel, T extends string, P extends UpdateManyProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: UpdateManyProps<TModel>) => UpdateMany<TModel>> =>
  cacheOnType(Type, EntityActionTypes.UpdateMany, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.UpdateMany, Type),
      ({ entities, criteria, correlationId }: UpdateManyProps<TModel>) => new UpdateMany(Type, entities, criteria, correlationId)
    )
  );

export const createUpdateManySuccessAction = <TModel, T extends string, P extends UpdateManyProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: UpdateManyProps<TModel>) => UpdateManySuccess<TModel>> =>
  cacheOnType(Type, EntityActionTypes.UpdateManySuccess, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.UpdateManySuccess, Type),
      ({ entities, criteria, correlationId }: UpdateManyProps<TModel>) => new UpdateManySuccess(Type, entities, criteria, correlationId)
    )
  );

export interface UpdateManyFailureProps<TModel> extends StandardProps {
  error: any;
  entities: TModel[];
}

export const createUpdateManyFailureAction = <TModel, T extends string, P extends UpdateManyFailureProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: UpdateManyFailureProps<TModel>) => UpdateManyFailure<TModel>> =>
  cacheOnType(Type, EntityActionTypes.UpdateManyFailure, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.UpdateManyFailure, Type),
      ({ error, entities, criteria, correlationId }: UpdateManyFailureProps<TModel>) =>
        new UpdateManyFailure(Type, error, entities, criteria, correlationId)
    )
  );
