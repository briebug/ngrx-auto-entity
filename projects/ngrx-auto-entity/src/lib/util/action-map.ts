import { ActionCreator } from '@ngrx/store';
import {
  Create,
  CreateFailure,
  CreateMany,
  CreateManyFailure,
  CreateManySuccess,
  CreateSuccess
} from '../actions/create-actions';
import {
  Delete,
  DeleteFailure,
  DeleteMany,
  DeleteManyFailure,
  DeleteManySuccess,
  DeleteSuccess
} from '../actions/delete-actions';
import { Load, LoadFailure, LoadIfNecessary, LoadSuccess } from '../actions/load-actions';
import { LoadAll, LoadAllFailure, LoadAllIfNecessary, LoadAllSuccess } from '../actions/load-all-actions';
import { LoadMany, LoadManyFailure, LoadManyIfNecessary, LoadManySuccess } from '../actions/load-many-actions';
import { LoadPage, LoadPageFailure, LoadPageIfNecessary, LoadPageSuccess } from '../actions/load-page-actions';
import { LoadRange, LoadRangeFailure, LoadRangeIfNecessary, LoadRangeSuccess } from '../actions/load-range-actions';
import {
  Replace,
  ReplaceFailure,
  ReplaceMany,
  ReplaceManyFailure,
  ReplaceManySuccess,
  ReplaceSuccess
} from '../actions/replace-actions';
import {
  Update,
  UpdateFailure,
  UpdateMany,
  UpdateManyFailure,
  UpdateManySuccess,
  UpdateSuccess
} from '../actions/update-actions';
import {
  Upsert,
  UpsertFailure,
  UpsertMany,
  UpsertManyFailure,
  UpsertManySuccess,
  UpsertSuccess
} from '../actions/upsert-actions';
import {
  CreateFailureProps,
  CreateManyFailureProps,
  CreateManyProps,
  CreateProps
} from '../factories/create-factories';
import {
  DeleteFailureProps,
  DeleteManyFailureProps,
  DeleteManyProps,
  DeleteProps
} from '../factories/delete-factories';
import { LoadAllFailureProps, LoadAllIfNecessaryProps, LoadAllSuccessProps } from '../factories/load-all-factories';
import { LoadFailureProps, LoadIfNecessaryProps, LoadProps, LoadSuccessProps } from '../factories/load-factories';
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
import {
  ReplaceFailureProps,
  ReplaceManyFailureProps,
  ReplaceManyProps,
  ReplaceProps
} from '../factories/replace-factories';
import {
  UpdateFailureProps,
  UpdateManyFailureProps,
  UpdateManyProps,
  UpdateProps
} from '../factories/update-factories';
import {
  UpsertFailureProps,
  UpsertManyFailureProps,
  UpsertManyProps,
  UpsertProps
} from '../factories/upsert-factories';
import { StandardProps } from '../factories/util';

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

  create: ActionCreator<string, (props: CreateProps<TModel>) => Create<TModel>>;
  createSuccess: ActionCreator<string, (props: CreateProps<TModel>) => CreateSuccess<TModel>>;
  createFailure: ActionCreator<string, (props: CreateFailureProps<TModel>) => CreateFailure<TModel>>;
  createMany: ActionCreator<string, (props: CreateManyProps<TModel>) => CreateMany<TModel>>;
  createManySuccess: ActionCreator<string, (props: CreateManyProps<TModel>) => CreateManySuccess<TModel>>;
  createManyFailure: ActionCreator<string, (props: CreateManyFailureProps<TModel>) => CreateManyFailure<TModel>>;

  update: ActionCreator<string, (props: UpdateProps<TModel>) => Update<TModel>>;
  updateSuccess: ActionCreator<string, (props: UpdateProps<TModel>) => UpdateSuccess<TModel>>;
  updateFailure: ActionCreator<string, (props: UpdateFailureProps<TModel>) => UpdateFailure<TModel>>;
  updateMany: ActionCreator<string, (props: UpdateManyProps<TModel>) => UpdateMany<TModel>>;
  updateManySuccess: ActionCreator<string, (props: UpdateManyProps<TModel>) => UpdateManySuccess<TModel>>;
  updateManyFailure: ActionCreator<string, (props: UpdateManyFailureProps<TModel>) => UpdateManyFailure<TModel>>;

  upsert: ActionCreator<string, (props: UpsertProps<TModel>) => Upsert<TModel>>;
  upsertSuccess: ActionCreator<string, (props: UpsertProps<TModel>) => UpsertSuccess<TModel>>;
  upsertFailure: ActionCreator<string, (props: UpsertFailureProps<TModel>) => UpsertFailure<TModel>>;
  upsertMany: ActionCreator<string, (props: UpsertManyProps<TModel>) => UpsertMany<TModel>>;
  upsertManySuccess: ActionCreator<string, (props: UpsertManyProps<TModel>) => UpsertManySuccess<TModel>>;
  upsertManyFailure: ActionCreator<string, (props: UpsertManyFailureProps<TModel>) => UpsertManyFailure<TModel>>;

  replace: ActionCreator<string, (props: ReplaceProps<TModel>) => Replace<TModel>>;
  replaceSuccess: ActionCreator<string, (props: ReplaceProps<TModel>) => ReplaceSuccess<TModel>>;
  replaceFailure: ActionCreator<string, (props: ReplaceFailureProps<TModel>) => ReplaceFailure<TModel>>;
  replaceMany: ActionCreator<string, (props: ReplaceManyProps<TModel>) => ReplaceMany<TModel>>;
  replaceManySuccess: ActionCreator<string, (props: ReplaceManyProps<TModel>) => ReplaceManySuccess<TModel>>;
  replaceManyFailure: ActionCreator<string, (props: ReplaceManyFailureProps<TModel>) => ReplaceManyFailure<TModel>>;

  delete: ActionCreator<string, (props: DeleteProps<TModel>) => Delete<TModel>>;
  deleteSuccess: ActionCreator<string, (props: DeleteProps<TModel>) => DeleteSuccess<TModel>>;
  deleteFailure: ActionCreator<string, (props: DeleteFailureProps<TModel>) => DeleteFailure<TModel>>;
  deleteMany: ActionCreator<string, (props: DeleteManyProps<TModel>) => DeleteMany<TModel>>;
  deleteManySuccess: ActionCreator<string, (props: DeleteManyProps<TModel>) => DeleteManySuccess<TModel>>;
  deleteManyFailure: ActionCreator<string, (props: DeleteManyFailureProps<TModel>) => DeleteManyFailure<TModel>>;
}
