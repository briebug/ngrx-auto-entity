/*
 * Public API Surface of ngrx-auto-entity
 */

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

export { IEntityDictionary, IEntityState, EntityIdentity } from './lib/util/entity-state';
export { IModelState, IModelClass } from './lib/util/model-state';
export { IEntityFacade } from './lib/util/facade';
export { ISelectorMap } from './lib/util/selector-map';
export { buildFacade } from './lib/util/facade-builder';
export { buildSelectorMap } from './lib/util/selector-map-builder';
export { buildFeatureState, buildState } from './lib/util/state-builder';

export { EntityActionTypes } from './lib/actions/action-types';
export { IEntityInfo } from './lib/actions/entity-info';
export { EntityAction } from './lib/actions/entity-action';
export { ICorrelatedAction } from './lib/actions/entity-action';
export { fromEntityActions } from './lib/actions/action-operators';
export { ofEntityType } from './lib/actions/action-operators';
export { ofEntityAction } from './lib/actions/action-operators';
export { isEntityActionInstance, EntityActions } from './lib/actions/entity-actions-union';
export {
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
  Upsert,
  UpsertSuccess,
  UpsertFailure,
  UpsertMany,
  UpsertManySuccess,
  UpsertManyFailure,
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
  EditByKey,
  Edited,
  EditedByKey,
  Change,
  Changed,
  EndEdit,
  EditEnded,
  Clear
} from './lib/actions/actions';

export { ENTITY_OPTS_PROP } from './lib/decorators/entity-tokens';
export { IEffectExcept, IEntityOptions, IEntityTransformer, Entity } from './lib/decorators/entity';
export { IEffectExclusions } from './lib/decorators/effect-exclusions';
export { curd, loads, extra, all, matching, except } from './lib/decorators/effect-exclusion-utils';
export { makeEntity } from './lib/util/make-entity';
export {
  nameOfEntity,
  pluralNameOfEntity,
  uriNameOfEntity,
  entityComparer,
  entityTransforms
} from './lib/decorators/entity-util';
export {
  Key,
  getKey,
  getKeyFromModel,
  getKeyFromEntity,
  getKeyNames,
  getKeyNamesFromModel,
  getKeyNamesFromEntity,
  checkKeyName
} from './lib/decorators/key';

export { EntityOperators } from './lib/effects/operators';

export { autoEntityReducer, autoEntityMetaReducer, stateNameFromAction } from './lib/reducer/reducer';

export {
  IEntityRangeRef,
  IEntityPageRef,
  IEntityRef,
  IEntityIdentityRef,
  IEntityIdentitiesRef
} from './lib/service/refs';
export { IEntityWithRangeInfo, IEntityWithPageInfo, IEntityError } from './lib/service/wrapper-models';
export { IAutoEntityService } from './lib/service/interface';
export { NgrxAutoEntityService } from './lib/service/service';

export { EntityEffects } from './lib/effects/effects-all';
export { LoadEffects } from './lib/effects/effects-loads';
export { CUDEffects } from './lib/effects/effects-cud';
export { ExtraEffects } from './lib/effects/effects-extra';
export {
  LoadEffect,
  LoadAllEffect,
  LoadManyEffect,
  LoadPageEffect,
  LoadRangeEffect
} from './lib/effects/effects-loads-discrete';
export {
  CreateEffect,
  CreateManyEffect,
  DeleteEffect,
  DeleteManyEffect,
  DeleteByKeyEffect,
  DeleteManyByKeysEffect,
  ReplaceEffect,
  ReplaceManyEffect,
  UpdateEffect,
  UpdateManyEffect,
  UpsertEffect,
  UpsertManyEffect
} from './lib/effects/effects-cud-discrete';

export {
  NgrxAutoEntityModule,
  NgRxAutoEntityRootModuleWithEffects,
  NgRxAutoEntityRootModuleNoEntityEffects,
  NgRxAutoEntityRootModuleNoEffects,
  NgRxAutoEntityFeatureModule,
  NgRxAutoEntityModuleConfig,
  getNgRxAutoEntityMetaReducer
} from './lib/module';

export {
  transformEntityFromServer,
  transformEntitiesFromServer,
  transformEntityToServer,
  transformEntitiesToServer
} from './lib/service/transformation';
