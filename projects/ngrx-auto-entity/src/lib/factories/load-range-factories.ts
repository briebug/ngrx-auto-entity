import { ActionCreator } from '@ngrx/store';
import { EntityActionTypes } from '../actions/action-types';
import { TNew } from '../actions/model-constructor';
import { setActionType } from '../actions/util';
import { Range } from '../models';
import { cacheOnType, defineTypedFactoryFunction, StandardProps } from './util';
import { LoadRange, LoadRangeFailure, LoadRangeIfNecessary, LoadRangeSuccess } from '../actions/load-range-actions';

export interface LoadRangeProps extends StandardProps {
  range: Range;
}

export const createLoadRangeAction = <TModel, T extends string, P extends StandardProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: LoadRangeProps) => LoadRange<TModel>> =>
  cacheOnType(Type, EntityActionTypes.LoadRange, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.LoadRange, Type),
      ({ range, criteria, correlationId }: LoadRangeProps) => new LoadRange(Type, range, criteria, correlationId)
    )
  );

export interface LoadRangeIfNecessaryProps extends LoadRangeProps {
  maxAge?: number;
}

export const createLoadRangeIfNecessaryAction = <TModel, T extends string, P extends LoadRangeIfNecessaryProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: LoadRangeIfNecessaryProps) => LoadRangeIfNecessary<TModel>> =>
  cacheOnType(Type, EntityActionTypes.LoadRangeIfNecessary, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.LoadRangeIfNecessary, Type),
      ({ range, maxAge, criteria, correlationId }: LoadRangeIfNecessaryProps) =>
        new LoadRangeIfNecessary(Type, range, maxAge, criteria, correlationId)
    )
  );

export interface LoadRangeSuccessProps<TModel> extends StandardProps {
  entities: TModel[];
}

export const createLoadRangeSuccessAction = <TModel, T extends string, P extends LoadRangeSuccessProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: LoadRangeSuccessProps<TModel>) => LoadRangeSuccess<TModel>> =>
  cacheOnType(Type, EntityActionTypes.LoadRangeSuccess, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.LoadRangeSuccess, Type),
      ({ entities, criteria, correlationId }: LoadRangeSuccessProps<TModel>) =>
        new LoadRangeSuccess(Type, entities, criteria, correlationId)
    )
  );

export interface LoadRangeFailureProps<TModel> extends StandardProps {
  error: any;
}

export const createLoadRangeFailureAction = <TModel, T extends string, P extends LoadRangeFailureProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: LoadRangeFailureProps<TModel>) => LoadRangeFailure<TModel>> =>
  cacheOnType(Type, EntityActionTypes.LoadRangeFailure, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.LoadRangeFailure, Type),
      ({ error, criteria, correlationId }: LoadRangeFailureProps<TModel>) => new LoadRangeFailure(Type, error, criteria, correlationId)
    )
  );
