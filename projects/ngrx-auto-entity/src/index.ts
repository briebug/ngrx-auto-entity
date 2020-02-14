/*
 * Public API Surface of ngrx-auto-entity
 */

export {
  buildFeatureState,
  buildState,
  buildSelectorMap,
  buildFacade,
  IEntityDictionary,
  IEntityState,
  IEntityFacade,
  IModelState,
  ISelectorMap,
  IModelClass,
  EntityIdentity
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
  ICorrelatedAction,
  ofEntityType,
  ofEntityAction,
  fromEntityActions,
  isEntityActionInstance,
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
  DeleteByKey,
  DeleteByKeyFailure,
  DeleteByKeySuccess,
  DeleteMany,
  DeleteManyFailure,
  DeleteManySuccess,
  DeleteManyByKeys,
  DeleteManyByKeysFailure,
  DeleteManyByKeysSuccess,
  Select,
  SelectByKey,
  SelectMany,
  SelectMore,
  SelectManyByKeys,
  SelectMoreByKeys,
  Selected,
  SelectedMany,
  Deselect,
  DeselectMany,
  DeselectManyByKeys,
  DeselectAll,
  Deselected,
  Edit,
  Edited,
  Change,
  Changed,
  EndEdit,
  EditEnded,
  Clear
} from './lib/actions';

export {
  IEffectExclusions,
  IEffectExcept,
  IEntityOptions,
  IEntityTransformer,
  Entity,
  all,
  extra,
  loads,
  curd,
  except,
  matching
} from './lib/decorators/entity';

export { Key, getKey, getKeyFromModel, getKeyNames, getKeyNamesFromModel, checkKeyName } from './lib/decorators/key';

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
  IEntityRef,
  IEntityIdentityRef,
  IEntityIdentitiesRef
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
  DeleteByKeyEffect,
  DeleteManyEffect,
  DeleteManyByKeysEffect,
  EntityEffects,
  ExtraEffects
} from './lib/effects.default';

export {
  NgrxAutoEntityModule,
  NgRxAutoEntityRootModuleWithEffects,
  NgRxAutoEntityRootModuleNoEntityEffects,
  NgRxAutoEntityRootModuleNoEffects,
  NgRxAutoEntityFeatureModule,
  NgRxAutoEntityModuleConfig,
  getNgRxAutoEntityMetaReducer
} from './lib/module';
