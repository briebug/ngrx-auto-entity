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
  UpdateSuccess,
  UpdateFailure,
  Update,
  ofEntityType,
  ofEntityAction,
  EntityActions,
  DeleteSuccess,
  DeleteFailure,
  Delete,
  CreateFailure,
  CreateSuccess,
  Create,
  EntityAction,
  EntityActionTypes,
  IEntityInfo,
  Load,
  LoadAll,
  LoadAllFailure,
  LoadAllSuccess,
  LoadFailure,
  LoadPage,
  LoadPageFailure,
  LoadPageSuccess,
  LoadRange,
  LoadRangeFailure,
  LoadRangeSuccess,
  LoadSuccess
} from './lib/actions';

export { Key, getKey, getKeyNames, checkKeyName } from './lib/decorators';
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
  UpdateEffect,
  LoadRangeEffect,
  LoadPageEffect,
  LoadEffects,
  LoadEffect,
  LoadAllEffect,
  DeleteEffect,
  CUDEffects,
  CreateEffect,
  EntityEffects
} from './lib/effects.default';

export { NgrxAutoEntityModule } from './lib/module';
