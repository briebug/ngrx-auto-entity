import { ActionCreator } from '@ngrx/store';
import { EntityActionTypes } from '../actions/action-types';
import { TNew } from '../actions/model-constructor';
import { setActionType } from '../actions/util';
import { cacheOnType, defineTypedFactoryFunction, StandardProps } from './util';
import { LoadAll, LoadAllFailure, LoadAllIfNecessary, LoadAllSuccess } from '../actions/load-all-actions';

export const createLoadAllAction = <TModel, T extends string, P extends StandardProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: StandardProps) => LoadAll<TModel>> =>
  cacheOnType(Type, EntityActionTypes.LoadAll, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.LoadAll, Type),
      ({ criteria, correlationId }: StandardProps = {}) => new LoadAll(Type, criteria, correlationId)
    )
  );

export interface LoadAllIfNecessaryProps extends StandardProps {
  maxAge?: number;
}

export const createLoadAllIfNecessaryAction = <TModel, T extends string, P extends LoadAllIfNecessaryProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: LoadAllIfNecessaryProps) => LoadAllIfNecessary<TModel>> =>
  cacheOnType(Type, EntityActionTypes.LoadAllIfNecessary, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.LoadAllIfNecessary, Type),
      ({ maxAge, criteria, correlationId }: LoadAllIfNecessaryProps) => new LoadAllIfNecessary(Type, maxAge, criteria, correlationId)
    )
  );

export interface LoadAllSuccessProps<TModel> extends StandardProps {
  entities: TModel[];
}

export const createLoadAllSuccessAction = <TModel, T extends string, P extends LoadAllSuccessProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: LoadAllSuccessProps<TModel>) => LoadAllSuccess<TModel>> =>
  cacheOnType(Type, EntityActionTypes.LoadAllSuccess, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.LoadAllSuccess, Type),
      ({ entities, criteria, correlationId }: LoadAllSuccessProps<TModel>) => new LoadAllSuccess(Type, entities, criteria, correlationId)
    )
  );

export interface LoadAllFailureProps<TModel> extends StandardProps {
  error: any;
}

export const createLoadAllFailureAction = <TModel, T extends string, P extends LoadAllFailureProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: LoadAllFailureProps<TModel>) => LoadAllFailure<TModel>> =>
  cacheOnType(Type, EntityActionTypes.LoadAllFailure, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.LoadAllFailure, Type),
      ({ error, criteria, correlationId }: LoadAllFailureProps<TModel>) => new LoadAllFailure(Type, error, criteria, correlationId)
    )
  );
