import { ActionCreator } from '@ngrx/store';
import { EntityActionTypes } from '../actions/action-types';
import { TNew } from '../actions/model-constructor';
import { setActionType } from '../actions/util';
import { cacheOnType, defineTypedFactoryFunction, StandardProps } from './util';
import { LoadMany, LoadManyFailure, LoadManyIfNecessary, LoadManySuccess } from '../actions/load-many-actions';

export const createLoadManyAction = <TModel, T extends string, P extends StandardProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: StandardProps) => LoadMany<TModel>> =>
  cacheOnType(Type, EntityActionTypes.LoadMany, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.LoadMany, Type),
      ({ criteria, correlationId }: StandardProps) => new LoadMany(Type, criteria, correlationId)
    )
  );

export interface LoadManyIfNecessaryProps extends StandardProps {
  maxAge?: number;
}

export const createLoadManyIfNecessaryAction = <TModel, T extends string, P extends LoadManyIfNecessaryProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: LoadManyIfNecessaryProps) => LoadManyIfNecessary<TModel>> =>
  cacheOnType(Type, EntityActionTypes.LoadManyIfNecessary, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.LoadManyIfNecessary, Type),
      ({ maxAge, criteria, correlationId }: LoadManyIfNecessaryProps) => new LoadManyIfNecessary(Type, maxAge, criteria, correlationId)
    )
  );

export interface LoadManySuccessProps<TModel> extends StandardProps {
  entities: TModel[];
}

export const createLoadManySuccessAction = <TModel, T extends string, P extends LoadManySuccessProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: LoadManySuccessProps<TModel>) => LoadManySuccess<TModel>> =>
  cacheOnType(Type, EntityActionTypes.LoadManySuccess, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.LoadManySuccess, Type),
      ({ entities, criteria, correlationId }: LoadManySuccessProps<TModel>) => new LoadManySuccess(Type, entities, criteria, correlationId)
    )
  );

export interface LoadManyFailureProps<TModel> extends StandardProps {
  error: any;
}

export const createLoadManyFailureAction = <TModel, T extends string, P extends LoadManyFailureProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: LoadManyFailureProps<TModel>) => LoadManyFailure<TModel>> =>
  cacheOnType(Type, EntityActionTypes.LoadManyFailure, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.LoadManyFailure, Type),
      ({ error, criteria, correlationId }: LoadManyFailureProps<TModel>) => new LoadManyFailure(Type, error, criteria, correlationId)
    )
  );
