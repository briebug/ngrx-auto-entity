export enum EntityActionTypes {
  Load = '[Entity] (Generic) Load',
  LoadIfNecessary = '[Entity] (Generic) Load (If Necessary)',
  LoadSuccess = '[Entity] (Generic) Load: Success',
  LoadFailure = '[Entity] (Generic) Load: Failure',

  LoadMany = '[Entity] (Generic) Load Many',
  LoadManyIfNecessary = '[Entity] (Generic) Load Many (If Necessary)',
  LoadManySuccess = '[Entity] (Generic) Load Many: Success',
  LoadManyFailure = '[Entity] (Generic) Load Many: Failure',

  LoadAll = '[Entity] (Generic) Load All',
  LoadAllIfNecessary = '[Entity] (Generic) Load All (If Necessary)',
  LoadAllSuccess = '[Entity] (Generic) Load All: Success',
  LoadAllFailure = '[Entity] (Generic) Load All: Failure',

  LoadPage = '[Entity] (Generic) Load Page',
  LoadPageIfNecessary = '[Entity] (Generic) Load Page (If Necessary)',
  LoadPageSuccess = '[Entity] (Generic) Load Page: Success',
  LoadPageFailure = '[Entity] (Generic) Load Page: Failure',

  LoadRange = '[Entity] (Generic) Load Range',
  LoadRangeIfNecessary = '[Entity] (Generic) Load Range (If Necessary)',
  LoadRangeSuccess = '[Entity] (Generic) Load Range: Success',
  LoadRangeFailure = '[Entity] (Generic) Load Range: Failure',

  Create = '[Entity] (Generic) Create',
  CreateSuccess = '[Entity] (Generic) Create: Success',
  CreateFailure = '[Entity] (Generic) Create: Failure',

  CreateMany = '[Entity] (Generic) Create Many',
  CreateManySuccess = '[Entity] (Generic) Create Many: Success',
  CreateManyFailure = '[Entity] (Generic) Create Many: Failure',

  Update = '[Entity] (Generic) Update',
  UpdateSuccess = '[Entity] (Generic) Update: Success',
  UpdateFailure = '[Entity] (Generic) Update: Failure',

  UpdateMany = '[Entity] (Generic) Update Many',
  UpdateManySuccess = '[Entity] (Generic) Update Many: Success',
  UpdateManyFailure = '[Entity] (Generic) Update Many: Failure',

  Upsert = '[Entity] (Generic) Upsert',
  UpsertSuccess = '[Entity] (Generic) Upsert: Success',
  UpsertFailure = '[Entity] (Generic) Upsert: Failure',

  UpsertMany = '[Entity] (Generic) Upsert Many',
  UpsertManySuccess = '[Entity] (Generic) Upsert Many: Success',
  UpsertManyFailure = '[Entity] (Generic) Upsert Many: Failure',

  Replace = '[Entity] (Generic) Replace',
  ReplaceSuccess = '[Entity] (Generic) Replace: Success',
  ReplaceFailure = '[Entity] (Generic) Replace: Failure',

  ReplaceMany = '[Entity] (Generic) Replace Many',
  ReplaceManySuccess = '[Entity] (Generic) Replace Many: Success',
  ReplaceManyFailure = '[Entity] (Generic) Replace Many: Failure',

  Delete = '[Entity] (Generic) Delete',
  DeleteSuccess = '[Entity] (Generic) Delete: Success',
  DeleteFailure = '[Entity] (Generic) Delete: Failure',

  DeleteMany = '[Entity] (Generic) Delete Many',
  DeleteManySuccess = '[Entity] (Generic) Delete Many: Success',
  DeleteManyFailure = '[Entity] (Generic) Delete Many: Failure',

  DeleteByKey = '[Entity] (Generic) Delete by key',
  DeleteByKeySuccess = '[Entity] (Generic) Delete by key: Success',
  DeleteByKeyFailure = '[Entity] (Generic) Delete by key: Failure',

  DeleteManyByKeys = '[Entity] (Generic) Delete many by keys',
  DeleteManyByKeysSuccess = '[Entity] (Generic) Delete many by keys: Success',
  DeleteManyByKeysFailure = '[Entity] (Generic) Delete many by keys: Failure',

  Clear = '[Entity] (Generic) Clear',

  Select = '[Entity] (Generic) Select',
  SelectByKey = '[Entity] (Generic) Select by Key',
  Selected = '[Entity] (Generic) Selection',

  SelectMany = '[Entity] (Generic) Select Many',
  SelectMore = '[Entity] (Generic) Select More',
  SelectManyByKeys = '[Entity] (Generic) Select Many by Keys',
  SelectMoreByKeys = '[Entity] (Generic) Select More by Keys',
  SelectedMany = '[Entity] (Generic) Selection of Many',
  SelectedMore = '[Entity] (Generic) Selection of More',

  Deselect = '[Entity] (Generic) Deselect',
  Deselected = '[Entity] (Generic) Deselection',

  DeselectMany = '[Entity] (Generic) Deselect of Many',
  DeselectManyByKeys = '[Entity] (Generic) Deselect of Many by Keys',
  DeselectAll = '[Entity] (Generic) Deselect of All',
  DeselectedMany = '[Entity] (Generic) Deselection of Many',

  EditNew = '[Entity] (Generic) Edit New',
  Edit = '[Entity] (Generic) Edit',
  EditByKey = '[Entity] (Generic) Edit by Key',
  Edited = '[Entity] (Generic) Edited',
  EditedByKey = '[Entity] (Generic) Edited by Key',
  Change = '[Entity] (Generic) Change',
  Changed = '[Entity] (Generic) Changed',
  EndEdit = '[Entity] (Generic) Edit: End',
  EditEnded = '[Entity] (Generic) Edit: Ended'
}
