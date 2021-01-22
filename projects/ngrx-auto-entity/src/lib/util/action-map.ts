import { ActionCreator } from '@ngrx/store';
import { Clear } from '../actions/actions';
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
import {
  Deselect,
  DeselectAll,
  Deselected,
  DeselectedMany,
  DeselectMany,
  DeselectManyByKeys
} from '../actions/deselection-actions';
import {
  Change,
  Changed,
  Edit,
  EditByKey,
  Edited,
  EditedByKey,
  EditEnded,
  EditNew,
  EndEdit
} from '../actions/edit-actions';
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
  Select,
  SelectByKey,
  Selected,
  SelectedMany,
  SelectedMore,
  SelectMany,
  SelectManyByKeys,
  SelectMore,
  SelectMoreByKeys
} from '../actions/selection-actions';
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
import { DeselectedManyProps, DeselectManyByKeysProps, DeselectManyProps } from '../factories/deselection-factories';
import { EditByKeyProps, EditNewProps, EditProps } from '../factories/edit-factories';
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
  SelectByKeyProps,
  SelectedManyProps,
  SelectManyByKeysProps,
  SelectManyProps, SelectProps
} from '../factories/selection-factories';
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
import { CorrelatedProps, StandardProps } from '../factories/util';

export interface IActionMap<TModel> {
  loadIfNecessary: ActionCreator<string, (props: LoadIfNecessaryProps) => LoadIfNecessary<TModel>>;
  load: ActionCreator<string, (props: LoadProps) => Load<TModel>>;
  loadSuccess: ActionCreator<string, (props: LoadSuccessProps<TModel>) => LoadSuccess<TModel>>;
  loadFailure: ActionCreator<string, (props: LoadFailureProps<TModel>) => LoadFailure<TModel>>;

  loadAllIfNecessary: ActionCreator<string, (props: LoadAllIfNecessaryProps) => LoadAllIfNecessary<TModel>>;
  loadAll: ActionCreator<string, (props?: StandardProps) => LoadAll<TModel>>;
  loadAllSuccess: ActionCreator<string, (props: LoadAllSuccessProps<TModel>) => LoadAllSuccess<TModel>>;
  loadAllFailure: ActionCreator<string, (props: LoadAllFailureProps<TModel>) => LoadAllFailure<TModel>>;

  loadManyIfNecessary: ActionCreator<string, (props: LoadManyIfNecessaryProps) => LoadManyIfNecessary<TModel>>;
  loadMany: ActionCreator<string, (props?: StandardProps) => LoadMany<TModel>>;
  loadManySuccess: ActionCreator<string, (props: LoadManySuccessProps<TModel>) => LoadManySuccess<TModel>>;
  loadManyFailure: ActionCreator<string, (props: LoadManyFailureProps<TModel>) => LoadManyFailure<TModel>>;

  loadPageIfNecessary: ActionCreator<string, (props: LoadPageIfNecessaryProps) => LoadPageIfNecessary<TModel>>;
  loadPage: ActionCreator<string, (props?: LoadPageProps) => LoadPage<TModel>>;
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

  clear: ActionCreator<string, (props?: CorrelatedProps) => Clear<TModel>>;

  deselect: ActionCreator<string, (props?: CorrelatedProps) => Deselect<TModel>>;
  deselectMany: ActionCreator<string, (props: DeselectManyProps<TModel>) => DeselectMany<TModel>>;
  deselectManyByKeys: ActionCreator<string, (props: DeselectManyByKeysProps) => DeselectManyByKeys<TModel>>;
  deselectAll: ActionCreator<string, (props?: CorrelatedProps) => DeselectAll<TModel>>;
  deselected: ActionCreator<string, (props?: CorrelatedProps) => Deselected<TModel>>;
  deselectedMany: ActionCreator<string, (props: DeselectedManyProps<TModel>) => DeselectedMany<TModel>>;

  select: ActionCreator<string, (props: SelectProps<TModel>) => Select<TModel>>;
  selectByKey: ActionCreator<string, (props: SelectByKeyProps) => SelectByKey<TModel>>;
  selectMany: ActionCreator<string, (props: SelectManyProps<TModel>) => SelectMany<TModel>>;
  selectMore: ActionCreator<string, (props: SelectManyProps<TModel>) => SelectMore<TModel>>;
  selectManyByKeys: ActionCreator<string, (props: SelectManyByKeysProps) => SelectManyByKeys<TModel>>;
  selectMoreByKeys: ActionCreator<string, (props: SelectManyByKeysProps) => SelectMoreByKeys<TModel>>;
  selected: ActionCreator<string, (props?: CorrelatedProps) => Selected<TModel>>;
  selectedMany: ActionCreator<string, (props: SelectedManyProps<TModel>) => SelectedMany<TModel>>;
  selectedMore: ActionCreator<string, (props: SelectedManyProps<TModel>) => SelectedMore<TModel>>;

  editNew: ActionCreator<string, (props: EditNewProps<TModel>) => EditNew<TModel>>;
  edit: ActionCreator<string, (props: EditProps<TModel>) => Edit<TModel>>;
  editByKey: ActionCreator<string, (props: EditByKeyProps) => EditByKey<TModel>>;
  edited: ActionCreator<string, (props: EditProps<TModel>) => Edited<TModel>>;
  editedByKey: ActionCreator<string, (props: EditByKeyProps) => EditedByKey<TModel>>;
  change: ActionCreator<string, (props: EditProps<TModel>) => Change<TModel>>;
  changed: ActionCreator<string, (props: EditProps<TModel>) => Changed<TModel>>;
  endEdit: ActionCreator<string, (props?: CorrelatedProps) => EndEdit<TModel>>;
  editEnded: ActionCreator<string, (props?: CorrelatedProps) => EditEnded<TModel>>;
}
