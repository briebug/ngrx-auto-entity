import { ActionCreator } from '@ngrx/store';
import { EntityActionTypes } from '../actions/action-types';
import {
  Replace,
  ReplaceFailure,
  ReplaceMany,
  ReplaceManyFailure,
  ReplaceManySuccess,
  ReplaceSuccess
} from '../actions/replace-actions';
import { TNew } from '../actions/model-constructor';
import { setActionType } from '../actions/util';
import { cacheOnType, defineTypedFactoryFunction, StandardProps } from './util';

export interface ReplaceProps<TModel> extends StandardProps {
  entity: TModel;
}

export const createReplaceAction = <TModel, T extends string, P extends ReplaceProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: ReplaceProps<TModel>) => Replace<TModel>> =>
  cacheOnType(Type, EntityActionTypes.Replace, () => defineTypedFactoryFunction(
    setActionType(EntityActionTypes.Replace, Type),
    ({ entity, criteria, correlationId }: ReplaceProps<TModel>) => new Replace(Type, entity, criteria, correlationId)
  ));

export const createReplaceSuccessAction = <TModel, T extends string, P extends ReplaceProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: ReplaceProps<TModel>) => ReplaceSuccess<TModel>> =>
  cacheOnType(Type, EntityActionTypes.ReplaceSuccess, () => defineTypedFactoryFunction(
    setActionType(EntityActionTypes.ReplaceSuccess, Type),
    ({ entity, criteria, correlationId }: ReplaceProps<TModel>) =>
      new ReplaceSuccess(Type, entity, criteria, correlationId)
  ));

export interface ReplaceFailureProps<TModel> extends StandardProps {
  error: any;
  entity: TModel;
}

export const createReplaceFailureAction = <TModel, T extends string, P extends ReplaceFailureProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: ReplaceFailureProps<TModel>) => ReplaceFailure<TModel>> =>
  cacheOnType(Type, EntityActionTypes.ReplaceFailure, () => defineTypedFactoryFunction(
    setActionType(EntityActionTypes.ReplaceFailure, Type),
    ({ error, entity, criteria, correlationId }: ReplaceFailureProps<TModel>) =>
      new ReplaceFailure(Type, error, entity, criteria, correlationId)
  ));



export interface ReplaceManyProps<TModel> extends StandardProps {
  entities: TModel[];
}

export const createReplaceManyAction = <TModel, T extends string, P extends ReplaceManyProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: ReplaceManyProps<TModel>) => ReplaceMany<TModel>> =>
  cacheOnType(Type, EntityActionTypes.ReplaceMany, () => defineTypedFactoryFunction(
    setActionType(EntityActionTypes.ReplaceMany, Type),
    ({ entities, criteria, correlationId }: ReplaceManyProps<TModel>) => new ReplaceMany(Type, entities, criteria, correlationId)
  ));

export const createReplaceManySuccessAction = <TModel, T extends string, P extends ReplaceManyProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: ReplaceManyProps<TModel>) => ReplaceManySuccess<TModel>> =>
  cacheOnType(Type, EntityActionTypes.ReplaceManySuccess, () => defineTypedFactoryFunction(
    setActionType(EntityActionTypes.ReplaceManySuccess, Type),
    ({ entities, criteria, correlationId }: ReplaceManyProps<TModel>) =>
      new ReplaceManySuccess(Type, entities, criteria, correlationId)
  ));

export interface ReplaceManyFailureProps<TModel> extends StandardProps {
  error: any;
  entities: TModel[];
}

export const createReplaceManyFailureAction = <TModel, T extends string, P extends ReplaceManyFailureProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: ReplaceManyFailureProps<TModel>) => ReplaceManyFailure<TModel>> =>
  cacheOnType(Type, EntityActionTypes.ReplaceManyFailure, () => defineTypedFactoryFunction(
    setActionType(EntityActionTypes.ReplaceManyFailure, Type),
    ({ error, entities, criteria, correlationId }: ReplaceManyFailureProps<TModel>) =>
      new ReplaceManyFailure(Type, error, entities, criteria, correlationId)
  ));


