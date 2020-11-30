import { ActionCreator } from '@ngrx/store';
import { LoadAllFailureProps, LoadAllIfNecessaryProps, LoadAllSuccessProps } from '../factories/load-all-factories';
import { LoadFailureProps, LoadIfNecessaryProps, LoadProps, LoadSuccessProps } from '../factories/load-factories';
import { Load, LoadSuccess, LoadFailure, LoadIfNecessary } from '../actions/load-actions';
import { LoadManyFailureProps, LoadManyIfNecessaryProps, LoadManySuccessProps } from '../factories/load-many-factories';
import {
  LoadPageFailureProps,
  LoadPageIfNecessaryProps,
  LoadPageProps,
  LoadPageSuccessProps
} from '../factories/load-page-factories';
import {
  LoadRangeFailureProps,
  LoadRangeIfNecessaryProps,
  LoadRangeProps,
  LoadRangeSuccessProps
} from '../factories/load-range-factories';
import { StandardProps } from '../factories/util';
import { LoadAll, LoadAllIfNecessary, LoadAllSuccess, LoadAllFailure } from '../actions/load-all-actions';
import { LoadMany, LoadManyIfNecessary, LoadManySuccess, LoadManyFailure } from '../actions/load-many-actions';
import { LoadPage, LoadPageIfNecessary, LoadPageSuccess, LoadPageFailure } from '../actions/load-page-actions';
import { LoadRange, LoadRangeIfNecessary, LoadRangeSuccess, LoadRangeFailure } from '../actions/load-range-actions';

export interface IActionMap<TModel> {
  loadIfNecessary: ActionCreator<string, (props: LoadIfNecessaryProps) => LoadIfNecessary<TModel>>;
  load: ActionCreator<string, (props: LoadProps) => Load<TModel>>;
  loadSuccess: ActionCreator<string, (props: LoadSuccessProps<TModel>) => LoadSuccess<TModel>>;
  loadFailure: ActionCreator<string, (props: LoadFailureProps<TModel>) => LoadFailure<TModel>>;

  loadAllIfNecessary: ActionCreator<string, (props: LoadAllIfNecessaryProps) => LoadAllIfNecessary<TModel>>;
  loadAll: ActionCreator<string, (props: StandardProps) => LoadAll<TModel>>;
  loadAllSuccess: ActionCreator<string, (props: LoadAllSuccessProps<TModel>) => LoadAllSuccess<TModel>>;
  loadAllFailure: ActionCreator<string, (props: LoadAllFailureProps<TModel>) => LoadAllFailure<TModel>>;

  loadManyIfNecessary: ActionCreator<string, (props: LoadManyIfNecessaryProps) => LoadManyIfNecessary<TModel>>;
  loadMany: ActionCreator<string, (props: StandardProps) => LoadMany<TModel>>;
  loadManySuccess: ActionCreator<string, (props: LoadManySuccessProps<TModel>) => LoadManySuccess<TModel>>;
  loadManyFailure: ActionCreator<string, (props: LoadManyFailureProps<TModel>) => LoadManyFailure<TModel>>;

  loadPageIfNecessary: ActionCreator<string, (props: LoadPageIfNecessaryProps) => LoadPageIfNecessary<TModel>>;
  loadPage: ActionCreator<string, (props: LoadPageProps) => LoadPage<TModel>>;
  loadPageSuccess: ActionCreator<string, (props: LoadPageSuccessProps<TModel>) => LoadPageSuccess<TModel>>;
  loadPageFailure: ActionCreator<string, (props: LoadPageFailureProps<TModel>) => LoadPageFailure<TModel>>;

  loadRangeIfNecessary: ActionCreator<string, (props: LoadRangeIfNecessaryProps) => LoadRangeIfNecessary<TModel>>;
  loadRange: ActionCreator<string, (props: LoadRangeProps) => LoadRange<TModel>>;
  loadRangeSuccess: ActionCreator<string, (props: LoadRangeSuccessProps<TModel>) => LoadRangeSuccess<TModel>>;
  loadRangeFailure: ActionCreator<string, (props: LoadRangeFailureProps<TModel>) => LoadRangeFailure<TModel>>;
}
