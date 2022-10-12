import { ActionCreator } from '@ngrx/store';
import { EntityActionTypes } from '../actions/action-types';
import { TNew } from '../actions/model-constructor';
import { setActionType } from '../actions/util';
import { IPageInfo, Page } from '../models';
import { cacheOnType, defineTypedFactoryFunction, StandardProps } from './util';
import { LoadPage, LoadPageFailure, LoadPageIfNecessary, LoadPageSuccess } from '../actions/load-page-actions';

export interface LoadPageProps extends StandardProps {
  page: Page;
}

export const createLoadPageAction = <TModel, T extends string, P extends StandardProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: LoadPageProps) => LoadPage<TModel>> =>
  cacheOnType(Type, EntityActionTypes.LoadPage, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.LoadPage, Type),
      ({ page, criteria, correlationId }: LoadPageProps) => new LoadPage(Type, page, criteria, correlationId)
    )
  );

export interface LoadPageIfNecessaryProps extends LoadPageProps {
  maxAge?: number;
}

export const createLoadPageIfNecessaryAction = <TModel, T extends string, P extends LoadPageIfNecessaryProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: LoadPageIfNecessaryProps) => LoadPageIfNecessary<TModel>> =>
  cacheOnType(Type, EntityActionTypes.LoadPageIfNecessary, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.LoadPageIfNecessary, Type),
      ({ page, maxAge, criteria, correlationId }: LoadPageIfNecessaryProps) =>
        new LoadPageIfNecessary(Type, page, maxAge, criteria, correlationId)
    )
  );

export interface LoadPageSuccessProps<TModel> extends StandardProps {
  entities: TModel[];
  pageInfo: IPageInfo;
}

export const createLoadPageSuccessAction = <TModel, T extends string, P extends LoadPageSuccessProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: LoadPageSuccessProps<TModel>) => LoadPageSuccess<TModel>> =>
  cacheOnType(Type, EntityActionTypes.LoadPageSuccess, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.LoadPageSuccess, Type),
      ({ entities, pageInfo, criteria, correlationId }: LoadPageSuccessProps<TModel>) => new LoadPageSuccess(Type, entities, pageInfo, criteria, correlationId)
    )
  );

export interface LoadPageFailureProps<TModel> extends StandardProps {
  error: any;
  page: Page;
}

export const createLoadPageFailureAction = <TModel, T extends string, P extends LoadPageFailureProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: LoadPageFailureProps<TModel>) => LoadPageFailure<TModel>> =>
  cacheOnType(Type, EntityActionTypes.LoadPageFailure, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.LoadPageFailure, Type),
      ({ error, page, criteria, correlationId }: LoadPageFailureProps<TModel>) => new LoadPageFailure(Type, error, criteria, correlationId)
    )
  );
