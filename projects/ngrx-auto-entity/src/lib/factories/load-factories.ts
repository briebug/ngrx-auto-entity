import { ActionCreator } from '@ngrx/store';
import { EntityActionTypes } from '../actions/action-types';
import { Load, LoadFailure, LoadIfNecessary, LoadSuccess } from '../actions/load-actions';
import { TNew } from '../actions/model-constructor';
import { setActionType } from '../actions/util';
import { cacheOnType, defineTypedFactoryFunction, StandardProps } from './util';

export interface LoadProps extends StandardProps {
  keys?: any;
}

export const createLoadAction = <TModel, T extends string, P extends LoadProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: LoadProps) => Load<TModel>> =>
  cacheOnType(Type, EntityActionTypes.Load, () => defineTypedFactoryFunction(
    setActionType(EntityActionTypes.Load, Type),
    ({ keys, criteria, correlationId }: LoadProps) => new Load(Type, keys, criteria, correlationId)
  ));

export interface LoadIfNecessaryProps extends LoadProps {
  maxAge?: number;
}

export const createLoadIfNecessaryAction = <TModel, T extends string, P extends LoadIfNecessaryProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: LoadIfNecessaryProps) => LoadIfNecessary<TModel>> =>
  cacheOnType(Type, EntityActionTypes.LoadIfNecessary, () => defineTypedFactoryFunction(
    setActionType(EntityActionTypes.LoadIfNecessary, Type),
    ({ keys, maxAge, criteria, correlationId }: LoadIfNecessaryProps) =>
      new LoadIfNecessary(Type, keys, maxAge, criteria, correlationId)
  ));

export interface LoadSuccessProps<TModel> extends LoadProps {
  entity: TModel;
}

export const createLoadSuccessAction = <TModel, T extends string, P extends LoadSuccessProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: LoadSuccessProps<TModel>) => LoadSuccess<TModel>> =>
  cacheOnType(Type, EntityActionTypes.LoadSuccess, () => defineTypedFactoryFunction(
    setActionType(EntityActionTypes.LoadSuccess, Type),
    ({ entity, keys, criteria, correlationId }: LoadSuccessProps<TModel>) =>
      new LoadSuccess(Type, entity, keys, criteria, correlationId)
  ));

export interface LoadFailureProps<TModel> extends LoadProps {
  error: any;
}

export const createLoadFailureAction = <TModel, T extends string, P extends LoadFailureProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: LoadFailureProps<TModel>) => LoadFailure<TModel>> =>
  cacheOnType(Type, EntityActionTypes.LoadFailure, () => defineTypedFactoryFunction(
    setActionType(EntityActionTypes.LoadFailure, Type),
    ({ error, keys, criteria, correlationId }: LoadFailureProps<TModel>) =>
      new LoadFailure(Type, error, keys, criteria, correlationId)
  ));
