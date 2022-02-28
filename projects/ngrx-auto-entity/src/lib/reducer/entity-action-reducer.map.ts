import { EntityActionTypes } from '../actions/action-types';
import { clearReducer } from './clear.reducer';
import { createManyReducer } from './create-many.reducer';
import { createReducer } from './create.reducer';
import { deleteByKeyReducer } from './delete-by-key.reducer';
import { deleteManyByKeysReducer } from './delete-many-by-keys.reducer';
import { deleteManyReducer } from './delete-many.reducer';
import { deleteReducer } from './delete.reducer';
import { deselectManyReducer } from './deselect-many.reducer';
import { deselectReducer } from './deselect.reducer';
import { editsReducer } from './edits.reducer';
import { loadAllReducer } from './load-all.reducer';
import { loadManyReducer } from './load-many.reducer';
import { loadPageReducer } from './load-page.reducer';
import { loadRangeReducer } from './load-range.reducer';
import { loadReducer } from './load.reducer';
import { entityReducer } from './reducer';
import { replaceManyReducer } from './replace-many.reducer';
import { replaceReducer } from './replace.reducer';
import { selectManyReducer } from './select-many.reducer';
import { selectReducer } from './select.reducer';
import { updateManyReducer } from './update-many.reducer';
import { updateReducer } from './update.reducer';
import { upsertManyReducer } from './upsert-many.reducer';
import { upsertReducer } from './upsert.reducer';

export const ENTITY_ACTION_REDUCER_MAP: { [key in EntityActionTypes]: entityReducer | undefined } = {
  [EntityActionTypes.Create]: createReducer,
  [EntityActionTypes.CreateSuccess]: createReducer,
  [EntityActionTypes.CreateFailure]: createReducer,

  [EntityActionTypes.CreateMany]: createManyReducer,
  [EntityActionTypes.CreateManySuccess]: createManyReducer,
  [EntityActionTypes.CreateManyFailure]: createManyReducer,

  [EntityActionTypes.Update]: updateReducer,
  [EntityActionTypes.UpdateSuccess]: updateReducer,
  [EntityActionTypes.UpdateFailure]: updateReducer,

  [EntityActionTypes.UpdateMany]: updateManyReducer,
  [EntityActionTypes.UpdateManySuccess]: updateManyReducer,
  [EntityActionTypes.UpdateManyFailure]: updateManyReducer,

  [EntityActionTypes.Upsert]: upsertReducer,
  [EntityActionTypes.UpsertSuccess]: upsertReducer,
  [EntityActionTypes.UpsertFailure]: upsertReducer,

  [EntityActionTypes.UpsertMany]: upsertManyReducer,
  [EntityActionTypes.UpsertManySuccess]: upsertManyReducer,
  [EntityActionTypes.UpsertManyFailure]: upsertManyReducer,

  [EntityActionTypes.Replace]: replaceReducer,
  [EntityActionTypes.ReplaceSuccess]: replaceReducer,
  [EntityActionTypes.ReplaceFailure]: replaceReducer,

  [EntityActionTypes.ReplaceMany]: replaceManyReducer,
  [EntityActionTypes.ReplaceManySuccess]: replaceManyReducer,
  [EntityActionTypes.ReplaceManyFailure]: replaceManyReducer,

  [EntityActionTypes.Delete]: deleteReducer,
  [EntityActionTypes.DeleteSuccess]: deleteReducer,
  [EntityActionTypes.DeleteFailure]: deleteReducer,

  [EntityActionTypes.DeleteMany]: deleteManyReducer,
  [EntityActionTypes.DeleteManySuccess]: deleteManyReducer,
  [EntityActionTypes.DeleteManyFailure]: deleteManyReducer,

  [EntityActionTypes.DeleteByKey]: deleteByKeyReducer,
  [EntityActionTypes.DeleteByKeySuccess]: deleteByKeyReducer,
  [EntityActionTypes.DeleteByKeyFailure]: deleteByKeyReducer,

  [EntityActionTypes.DeleteManyByKeys]: deleteManyByKeysReducer,
  [EntityActionTypes.DeleteManyByKeysSuccess]: deleteManyByKeysReducer,
  [EntityActionTypes.DeleteManyByKeysFailure]: deleteManyByKeysReducer,

  [EntityActionTypes.Load]: loadReducer,
  [EntityActionTypes.LoadSuccess]: loadReducer,
  [EntityActionTypes.LoadFailure]: loadReducer,

  [EntityActionTypes.LoadAll]: loadAllReducer,
  [EntityActionTypes.LoadAllSuccess]: loadAllReducer,
  [EntityActionTypes.LoadAllFailure]: loadAllReducer,

  [EntityActionTypes.LoadMany]: loadManyReducer,
  [EntityActionTypes.LoadManySuccess]: loadManyReducer,
  [EntityActionTypes.LoadManyFailure]: loadManyReducer,

  [EntityActionTypes.LoadPage]: loadPageReducer,
  [EntityActionTypes.LoadPageSuccess]: loadPageReducer,
  [EntityActionTypes.LoadPageFailure]: loadPageReducer,

  [EntityActionTypes.LoadRange]: loadRangeReducer,
  [EntityActionTypes.LoadRangeSuccess]: loadRangeReducer,
  [EntityActionTypes.LoadRangeFailure]: loadRangeReducer,

  [EntityActionTypes.Clear]: clearReducer,

  [EntityActionTypes.Select]: selectReducer,
  [EntityActionTypes.SelectByKey]: selectReducer,

  [EntityActionTypes.SelectMany]: selectManyReducer,
  [EntityActionTypes.SelectManyByKeys]: selectManyReducer,
  [EntityActionTypes.SelectMore]: selectManyReducer,
  [EntityActionTypes.SelectMoreByKeys]: selectManyReducer,

  [EntityActionTypes.Deselect]: deselectReducer,

  [EntityActionTypes.DeselectAll]: deselectManyReducer,
  [EntityActionTypes.DeselectMany]: deselectManyReducer,
  [EntityActionTypes.DeselectManyByKeys]: deselectManyReducer,

  [EntityActionTypes.Edit]: editsReducer,
  [EntityActionTypes.EditNew]: editsReducer,
  [EntityActionTypes.EditByKey]: editsReducer,
  [EntityActionTypes.Change]: editsReducer,
  [EntityActionTypes.EndEdit]: editsReducer,

  // Result actions not currently handled by a reducer:
  [EntityActionTypes.LoadIfNecessary]: undefined,
  [EntityActionTypes.LoadAllIfNecessary]: undefined,
  [EntityActionTypes.LoadManyIfNecessary]: undefined,
  [EntityActionTypes.LoadPageIfNecessary]: undefined,
  [EntityActionTypes.LoadRangeIfNecessary]: undefined,
  [EntityActionTypes.Selected]: undefined,
  [EntityActionTypes.SelectedMany]: undefined,
  [EntityActionTypes.SelectedMore]: undefined,
  [EntityActionTypes.Deselected]: undefined,
  [EntityActionTypes.DeselectedMany]: undefined,
  [EntityActionTypes.Edited]: undefined,
  [EntityActionTypes.EditedByKey]: undefined,
  [EntityActionTypes.Changed]: undefined,
  [EntityActionTypes.EditEnded]: undefined
};
