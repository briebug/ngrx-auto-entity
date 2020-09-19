/*
 * Public API Surface of ngrx-auto-entity
 */

/*
 * Modules
 */
export {
  NgrxAutoEntityModule,
  NgRxAutoEntityRootModuleWithEffects,
  NgRxAutoEntityRootModuleNoEntityEffects,
  NgRxAutoEntityRootModuleNoEffects,
  NgRxAutoEntityFeatureModule,
  NgRxAutoEntityModuleConfig,
  getNgRxAutoEntityMetaReducer
} from './lib/module';

/*
 * Injection Tokens
 */

export { NGRX_AUTO_ENTITY_APP_STORE } from './lib/effects/if-necessary-operators';

/*
 * Common models and types referenced throughout Auto-Entity
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
export { EntityIdentity } from './lib/types/entity-identity';
export { IEntityDictionary, IEntityState } from './lib/util/entity-state';
export { IModelState, IModelClass } from './lib/util/model-state';
export { IEntityFacade } from './lib/util/facade';
export { ISelectorMap } from './lib/util/selector-map';

/*
 * Builders
 */
export { buildFacade } from './lib/util/facade-builder';
export { buildSelectorMap } from './lib/util/selector-map-builder';
export { buildFeatureState, buildState } from './lib/util/state-builder';

/*
 * Action Support
 */
export { EntityActionTypes } from './lib/actions/action-types';
export { IEntityInfo } from './lib/actions/entity-info';
export { EntityAction } from './lib/actions/entity-action';
export { ICorrelatedAction } from './lib/actions/entity-action';
export { fromEntityActions } from './lib/actions/action-operators';
export { ofEntityType } from './lib/actions/action-operators';
export { ofEntityAction } from './lib/actions/action-operators';
export { isEntityActionInstance, EntityActions } from './lib/actions/entity-actions-union';

/*
 * Actions
 */
export { Load, LoadIfNecessary, LoadFailure, LoadSuccess } from './lib/actions/load-actions';
export { LoadMany, LoadManyIfNecessary, LoadManyFailure, LoadManySuccess } from './lib/actions/load-many-actions';
export { LoadAll, LoadAllIfNecessary, LoadAllFailure, LoadAllSuccess } from './lib/actions/load-all-actions';
export { LoadPage, LoadPageIfNecessary, LoadPageFailure, LoadPageSuccess } from './lib/actions/load-page-actions';
export { LoadRange, LoadRangeIfNecessary, LoadRangeFailure, LoadRangeSuccess } from './lib/actions/load-range-actions';

export { CreateMany, CreateManyFailure, CreateManySuccess } from './lib/actions/create-actions';
export { Create, CreateFailure, CreateSuccess } from './lib/actions/create-actions';
export { UpdateMany, UpdateManyFailure, UpdateManySuccess } from './lib/actions/update-actions';
export { Update, UpdateFailure, UpdateSuccess } from './lib/actions/update-actions';
export { UpsertMany, UpsertManyFailure, UpsertManySuccess } from './lib/actions/upsert-actions';
export { Upsert, UpsertFailure, UpsertSuccess } from './lib/actions/upsert-actions';
export { ReplaceMany, ReplaceManyFailure, ReplaceManySuccess } from './lib/actions/replace-actions';
export { Replace, ReplaceFailure, ReplaceSuccess } from './lib/actions/replace-actions';
export { DeleteMany, DeleteManyFailure, DeleteManySuccess } from './lib/actions/delete-actions';
export { Delete, DeleteFailure, DeleteSuccess } from './lib/actions/delete-actions';
export {
  DeleteManyByKeys,
  DeleteManyByKeysFailure,
  DeleteManyByKeysSuccess,
  DeleteByKeyFailure,
  DeleteByKeySuccess,
  DeleteByKey
} from './lib/actions/delete-by-key-actions';

export {
  Select,
  SelectByKey,
  Selected,
  SelectedMany,
  SelectMany,
  SelectManyByKeys,
  SelectMore,
  SelectMoreByKeys
} from './lib/actions/selection-actions';
export { Deselected, DeselectAll, DeselectManyByKeys, DeselectMany, Deselect } from './lib/actions/deselection-actions';
export { EditEnded, EndEdit, Changed, Change, EditedByKey, Edited, EditByKey, Edit } from './lib/actions/edit-actions';
export { Clear } from './lib/actions/actions';

/*
 * Decorators
 */
export { Entity } from './lib/decorators/entity-decorator';
export { Key } from './lib/decorators/key-decorator';

/*
 * Entity Metadata and Management
 */
export { ENTITY_OPTS_PROP } from './lib/decorators/entity-tokens';
export { IEffectExcept, IEntityOptions, IEntityTransformer, EntityAge } from './lib/decorators/entity-options';
export { IEffectExclusions } from './lib/decorators/effect-exclusions';
export { curd, loads, extra, all, matching, except } from './lib/decorators/effect-exclusion-utils';

/*
 * Entity Metadata Utilities
 */
export { makeEntity } from './lib/util/make-entity';
export {
  nameOfEntity,
  pluralNameOfEntity,
  uriNameOfEntity,
  stateNameOfEntity,
  entityComparer,
  entityTransforms,
  entityMaxAge
} from './lib/decorators/entity-util';
export {
  getKey,
  getKeyFromModel,
  getKeyFromEntity,
  getKeyNames,
  getKeyNamesFromModel,
  getKeyNamesFromEntity,
  checkKeyName
} from './lib/decorators/key-util';

/*
 * Reducer
 */
export { autoEntityReducer, autoEntityMetaReducer, stateNameFromAction } from './lib/reducer/reducer';

/*
 * Entity Service
 */
export { NgrxAutoEntityService } from './lib/service/service';
export { IAutoEntityService } from './lib/service/interface';

export {
  IEntityRangeRef,
  IEntityPageRef,
  IEntityRef,
  IEntityIdentityRef,
  IEntityIdentitiesRef
} from './lib/service/refs';
export { IEntityWithRangeInfo, IEntityWithPageInfo, IEntityError } from './lib/service/wrapper-models';

/*
 * Transformation utilities
 */
export {
  transformEntityFromServer,
  transformEntitiesFromServer,
  transformEntityToServer,
  transformEntitiesToServer
} from './lib/service/transformation';

/*
 * Operators
 */
export { EntityOperators } from './lib/effects/operators';

/*
 * Effect Groups
 */
export { EntityEffects } from './lib/effects/effects-all';
export { LoadEffects } from './lib/effects/effects-loads';
export { LoadIfNecessaryEffects } from './lib/effects/if-necessary-loads';
export { CUDEffects } from './lib/effects/effects-cud';
export { ExtraEffects } from './lib/effects/effects-extra';

/*
 * Effects
 */
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
