/*
 * Public API Surface of ngrx-auto-entity
 */

export {
  buildFeatureState,
  buildState,
  IEntityDictionary,
  IEntityState,
  IModelState,
  ISelectorMap,
  ITModelClass
} from './lib/util';

export {
  IPage,
  Page,
  IFirstLastRange,
  IRangeInfo,
  ISkipTakeRange,
  IStartEndRange,
  Range,
  RangeValue,
  IPageInfo
} from './lib/models';

export {
  ofEntityType,
  ofEntityAction,
  IEntityInfo,
  EntityActions,
  EntityAction,
  EntityActionTypes,
  Load,
  LoadFailure,
  LoadSuccess,
  LoadAll,
  LoadAllFailure,
  LoadAllSuccess,
  LoadMany,
  LoadManyFailure,
  LoadManySuccess,
  LoadPage,
  LoadPageFailure,
  LoadPageSuccess,
  LoadRange,
  LoadRangeFailure,
  LoadRangeSuccess,
  CreateFailure,
  CreateSuccess,
  Create,
  CreateMany,
  CreateManyFailure,
  CreateManySuccess,
  Update,
  UpdateSuccess,
  UpdateFailure,
  UpdateMany,
  UpdateManySuccess,
  UpdateManyFailure,
  Replace,
  ReplaceFailure,
  ReplaceSuccess,
  ReplaceMany,
  ReplaceManyFailure,
  ReplaceManySuccess,
  Delete,
  DeleteFailure,
  DeleteSuccess,
  DeleteMany,
  DeleteManyFailure,
  DeleteManySuccess,
  Select,
  SelectByKey,
  Selected,
  Deselect,
  Deselected
} from './lib/actions';

export { Key, getKey, getKeyFromModel, getKeyNames, getKeyNamesFromModel, checkKeyName } from './lib/decorators';

export { EntityOperators } from './lib/operators';

export { autoEntityReducer, autoEntityMetaReducer, stateNameFromAction } from './lib/reducer';

export {
  NgrxAutoEntityService,
  IEntityWithRangeInfo,
  IEntityWithPageInfo,
  IEntityRangeRef,
  IEntityPageRef,
  IEntityError,
  IAutoEntityService,
  IEntityRef
} from './lib/service';

export {
  LoadEffects,
  LoadEffect,
  LoadAllEffect,
  LoadManyEffect,
  LoadPageEffect,
  LoadRangeEffect,
  CUDEffects,
  CreateEffect,
  CreateManyEffect,
  UpdateEffect,
  UpdateManyEffect,
  ReplaceEffect,
  ReplaceManyEffect,
  DeleteEffect,
  DeleteManyEffect,
  EntityEffects
} from './lib/effects.default';

export { NgrxAutoEntityModule } from './lib/module';
