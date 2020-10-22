import { Clear } from './actions';
import {
  Create,
  CreateFailure,
  CreateMany,
  CreateManyFailure,
  CreateManySuccess,
  CreateSuccess
} from './create-actions';
import {
  Delete,
  DeleteFailure,
  DeleteMany,
  DeleteManyFailure,
  DeleteManySuccess,
  DeleteSuccess
} from './delete-actions';
import {
  DeleteByKey,
  DeleteByKeyFailure,
  DeleteByKeySuccess,
  DeleteManyByKeys,
  DeleteManyByKeysFailure,
  DeleteManyByKeysSuccess
} from './delete-by-key-actions';
import {
  Deselect,
  DeselectAll,
  Deselected,
  DeselectedMany,
  DeselectMany,
  DeselectManyByKeys
} from './deselection-actions';
import { Change, Changed, Edit, EditByKey, Edited, EditedByKey, EditEnded, EditNew, EndEdit } from './edit-actions';
import { IEntityAction } from './entity-action';
import { Load, LoadFailure, LoadIfNecessary, LoadSuccess } from './load-actions';
import { LoadAll, LoadAllFailure, LoadAllIfNecessary, LoadAllSuccess } from './load-all-actions';
import { LoadMany, LoadManyFailure, LoadManyIfNecessary, LoadManySuccess } from './load-many-actions';
import { LoadPage, LoadPageFailure, LoadPageIfNecessary, LoadPageSuccess } from './load-page-actions';
import { LoadRange, LoadRangeFailure, LoadRangeIfNecessary, LoadRangeSuccess } from './load-range-actions';
import {
  Replace,
  ReplaceFailure,
  ReplaceMany,
  ReplaceManyFailure,
  ReplaceManySuccess,
  ReplaceSuccess
} from './replace-actions';
import { Select, SelectByKey, Selected, SelectedMany, SelectMany, SelectManyByKeys } from './selection-actions';
import {
  Update,
  UpdateFailure,
  UpdateMany,
  UpdateManyFailure,
  UpdateManySuccess,
  UpdateSuccess
} from './update-actions';
import {
  Upsert,
  UpsertFailure,
  UpsertMany,
  UpsertManyFailure,
  UpsertManySuccess,
  UpsertSuccess
} from './upsert-actions';

/**
 * Union of all known entity action types
 */
export type EntityActions<TModel> =
  | Load<TModel>
  | LoadIfNecessary<TModel>
  | LoadFailure<TModel>
  | LoadSuccess<TModel>
  | LoadMany<TModel>
  | LoadManyIfNecessary<TModel>
  | LoadManyFailure<TModel>
  | LoadManySuccess<TModel>
  | LoadAll<TModel>
  | LoadAllIfNecessary<TModel>
  | LoadAllFailure<TModel>
  | LoadAllSuccess<TModel>
  | LoadPage<TModel>
  | LoadPageIfNecessary<TModel>
  | LoadPageFailure<TModel>
  | LoadPageSuccess<TModel>
  | LoadRange<TModel>
  | LoadRangeIfNecessary<TModel>
  | LoadRangeFailure<TModel>
  | LoadRangeSuccess<TModel>
  | Create<TModel>
  | CreateFailure<TModel>
  | CreateSuccess<TModel>
  | CreateMany<TModel>
  | CreateManyFailure<TModel>
  | CreateManySuccess<TModel>
  | Update<TModel>
  | UpdateFailure<TModel>
  | UpdateSuccess<TModel>
  | UpdateMany<TModel>
  | UpdateManyFailure<TModel>
  | UpdateManySuccess<TModel>
  | Upsert<TModel>
  | UpsertFailure<TModel>
  | UpsertSuccess<TModel>
  | UpsertMany<TModel>
  | UpsertManyFailure<TModel>
  | UpsertManySuccess<TModel>
  | Replace<TModel>
  | ReplaceFailure<TModel>
  | ReplaceSuccess<TModel>
  | ReplaceMany<TModel>
  | ReplaceManyFailure<TModel>
  | ReplaceManySuccess<TModel>
  | Delete<TModel>
  | DeleteFailure<TModel>
  | DeleteSuccess<TModel>
  | DeleteMany<TModel>
  | DeleteManyFailure<TModel>
  | DeleteManySuccess<TModel>
  | DeleteByKey<TModel>
  | DeleteByKeyFailure<TModel>
  | DeleteByKeySuccess<TModel>
  | DeleteManyByKeys<TModel>
  | DeleteManyByKeysFailure<TModel>
  | DeleteManyByKeysSuccess<TModel>
  | Clear<TModel>
  | Select<TModel>
  | SelectByKey<TModel>
  | SelectMany<TModel>
  | SelectManyByKeys<TModel>
  | Selected<TModel>
  | SelectedMany<TModel>
  | Deselect<TModel>
  | DeselectAll<TModel>
  | DeselectMany<TModel>
  | DeselectManyByKeys<TModel>
  | Deselected<TModel>
  | DeselectedMany<TModel>
  | EditNew<TModel>
  | Edit<TModel>
  | EditByKey<TModel>
  | Edited<TModel>
  | EditedByKey<TModel>
  | Change<TModel>
  | Changed<TModel>
  | EndEdit<TModel>
  | EditEnded<TModel>;

export const isEntityActionInstance = (action: IEntityAction): boolean =>
  action instanceof Load ||
  action instanceof LoadIfNecessary ||
  action instanceof LoadSuccess ||
  action instanceof LoadFailure ||
  action instanceof LoadMany ||
  action instanceof LoadManyIfNecessary ||
  action instanceof LoadManySuccess ||
  action instanceof LoadManyFailure ||
  action instanceof LoadAll ||
  action instanceof LoadAllIfNecessary ||
  action instanceof LoadAllSuccess ||
  action instanceof LoadAllFailure ||
  action instanceof LoadPage ||
  action instanceof LoadPageIfNecessary ||
  action instanceof LoadPageSuccess ||
  action instanceof LoadPageFailure ||
  action instanceof LoadRange ||
  action instanceof LoadRangeIfNecessary ||
  action instanceof LoadRangeSuccess ||
  action instanceof LoadRangeFailure ||
  action instanceof Create ||
  action instanceof CreateSuccess ||
  action instanceof CreateFailure ||
  action instanceof CreateMany ||
  action instanceof CreateManySuccess ||
  action instanceof CreateManyFailure ||
  action instanceof Update ||
  action instanceof UpdateSuccess ||
  action instanceof UpdateFailure ||
  action instanceof UpdateMany ||
  action instanceof UpdateManySuccess ||
  action instanceof UpdateManyFailure ||
  action instanceof Upsert ||
  action instanceof UpsertSuccess ||
  action instanceof UpsertFailure ||
  action instanceof UpsertMany ||
  action instanceof UpsertManySuccess ||
  action instanceof UpsertManyFailure ||
  action instanceof Replace ||
  action instanceof ReplaceSuccess ||
  action instanceof ReplaceFailure ||
  action instanceof ReplaceMany ||
  action instanceof ReplaceManySuccess ||
  action instanceof ReplaceManyFailure ||
  action instanceof Delete ||
  action instanceof DeleteSuccess ||
  action instanceof DeleteFailure ||
  action instanceof DeleteMany ||
  action instanceof DeleteManySuccess ||
  action instanceof DeleteManyFailure ||
  action instanceof DeleteByKey ||
  action instanceof DeleteByKeySuccess ||
  action instanceof DeleteByKeyFailure ||
  action instanceof DeleteManyByKeys ||
  action instanceof DeleteManyByKeysSuccess ||
  action instanceof DeleteManyByKeysFailure ||
  action instanceof Clear ||
  action instanceof Select ||
  action instanceof SelectByKey ||
  action instanceof SelectMany ||
  action instanceof SelectManyByKeys ||
  action instanceof Selected ||
  action instanceof SelectedMany ||
  action instanceof Deselect ||
  action instanceof DeselectMany ||
  action instanceof DeselectManyByKeys ||
  action instanceof DeselectAll ||
  action instanceof Deselected ||
  action instanceof DeselectedMany ||
  action instanceof EditNew ||
  action instanceof Edit ||
  action instanceof EditByKey ||
  action instanceof Edited ||
  action instanceof EditedByKey ||
  action instanceof Change ||
  action instanceof Changed ||
  action instanceof EndEdit ||
  action instanceof EditEnded;
