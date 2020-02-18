import {
  Change,
  Changed,
  Clear,
  Create,
  CreateFailure,
  CreateMany,
  CreateManyFailure,
  CreateManySuccess,
  CreateSuccess,
  Delete,
  DeleteByKey,
  DeleteByKeyFailure,
  DeleteByKeySuccess,
  DeleteFailure,
  DeleteMany,
  DeleteManyByKeys,
  DeleteManyByKeysFailure,
  DeleteManyByKeysSuccess,
  DeleteManyFailure,
  DeleteManySuccess,
  DeleteSuccess,
  Deselect,
  DeselectAll,
  Deselected,
  DeselectedMany,
  DeselectMany,
  DeselectManyByKeys,
  Edit,
  Edited,
  EditEnded,
  EndEdit,
  Load,
  LoadAll,
  LoadAllFailure,
  LoadAllSuccess,
  LoadFailure,
  LoadMany,
  LoadManyFailure,
  LoadManySuccess,
  LoadPage,
  LoadPageFailure,
  LoadPageSuccess,
  LoadRange,
  LoadRangeFailure,
  LoadRangeSuccess,
  LoadSuccess,
  Replace,
  ReplaceFailure,
  ReplaceMany,
  ReplaceManyFailure,
  ReplaceManySuccess,
  ReplaceSuccess,
  Select,
  SelectByKey,
  Selected,
  SelectedMany,
  SelectMany,
  SelectManyByKeys,
  Update,
  UpdateFailure,
  UpdateMany,
  UpdateManyFailure,
  UpdateManySuccess,
  UpdateSuccess
} from './actions';
import { IEntityAction } from './entity-action';

/**
 * Union of all known entity action types
 */
export type EntityActions<TModel> =
  | Load<TModel>
  | LoadFailure<TModel>
  | LoadSuccess<TModel>
  | LoadMany<TModel>
  | LoadManyFailure<TModel>
  | LoadManySuccess<TModel>
  | LoadAll<TModel>
  | LoadAllFailure<TModel>
  | LoadAllSuccess<TModel>
  | LoadPage<TModel>
  | LoadPageFailure<TModel>
  | LoadPageSuccess<TModel>
  | LoadRange<TModel>
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
  | Edit<TModel>
  | Edited<TModel>
  | Change<TModel>
  | Changed<TModel>
  | EndEdit<TModel>
  | EditEnded<TModel>;

export const isEntityActionInstance = (action: IEntityAction): boolean =>
  action instanceof Load ||
  action instanceof LoadSuccess ||
  action instanceof LoadFailure ||
  action instanceof LoadMany ||
  action instanceof LoadManySuccess ||
  action instanceof LoadManyFailure ||
  action instanceof LoadAll ||
  action instanceof LoadAllSuccess ||
  action instanceof LoadAllFailure ||
  action instanceof LoadPage ||
  action instanceof LoadPageSuccess ||
  action instanceof LoadPageFailure ||
  action instanceof LoadRange ||
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
  action instanceof Edit ||
  action instanceof Edited ||
  action instanceof Change ||
  action instanceof Changed ||
  action instanceof EndEdit ||
  action instanceof EditEnded;
