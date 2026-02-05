import { Inject, inject, InjectionToken, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Clear } from '../actions/actions';
import { Create, CreateMany } from '../actions/create-actions';
import { Delete, DeleteMany } from '../actions/delete-actions';
import { DeleteByKey, DeleteManyByKeys } from '../actions/delete-by-key-actions';
import { Deselect, DeselectAll, DeselectMany, DeselectManyByKeys } from '../actions/deselection-actions';
import { Change, Edit, EditByKey, EditNew, EndEdit } from '../actions/edit-actions';
import { Load, LoadIfNecessary } from '../actions/load-actions';
import { LoadAll, LoadAllIfNecessary } from '../actions/load-all-actions';
import { LoadMany, LoadManyIfNecessary } from '../actions/load-many-actions';
import { LoadPage, LoadPageIfNecessary } from '../actions/load-page-actions';
import { LoadRange, LoadRangeIfNecessary } from '../actions/load-range-actions';
import { Replace, ReplaceMany } from '../actions/replace-actions';
import { Select, SelectByKey, SelectMany, SelectManyByKeys, SelectMore, SelectMoreByKeys } from '../actions/selection-actions';
import { Update, UpdateMany } from '../actions/update-actions';
import { Upsert, UpsertMany } from '../actions/upsert-actions';
import { Page, Range } from '../models';
import { EntityIdentity } from '../types/entity-identity';
import { IEntityFacade, IEntityFacadeBase } from './facade';
import { ISelectorMap } from './selector-map';
import { TNew } from '../actions/model-constructor';
import { NGRX_AUTO_ENTITY_APP_STORE } from '../effects/if-necessary-operator-utils';
import { Observable } from 'rxjs';
import { IEntityDictionary } from './entity-state';
import { NAE_UNDEFINED } from './util-di';

/**
 * Builds a new facade class for the specified entity model and parent state.
 * @param selectors - the selector map for the specified entity
 * @param Type - the constructor for the specified entity
 */
export const buildFacade = <TModel, TParentState>(
  selectors: ISelectorMap<TParentState, TModel>,
  Type: TNew<TModel>
): IEntityFacadeBase<TModel> => {
  class EntityFacadeBase implements IEntityFacade<TModel> {
    modelType: TNew<TModel>;
    store: Store<any>;

    /** @deprecated Use the empty constructor instead. The model type will be provided by `buildState`, and the store by `provideStore` or `withCustomStore`. */
    constructor(modelType: TNew<TModel>, store: Store<any>);
    constructor();
    constructor(@Inject(NAE_UNDEFINED) modelType?: TNew<TModel>, @Inject(NAE_UNDEFINED) store?: Store<any>) {
      this.modelType = modelType ?? Type;
      this.store = store ?? inject(NGRX_AUTO_ENTITY_APP_STORE);

      this.all$ = this.store.select(selectors.selectAll);
      this.sorted$ = this.store.select(selectors.selectAllSorted);
      this.entities$ = this.store.select(selectors.selectEntities);
      this.ids$ = this.store.select(selectors.selectIds);
      this.total$ = this.store.select(selectors.selectTotal);
      this.hasEntities$ = this.store.select(selectors.selectHasEntities);
      this.hasNoEntities$ = this.store.select(selectors.selectHasNoEntities);
      this.current$ = this.store.select(selectors.selectCurrentEntity);
      this.currentKey$ = this.store.select(selectors.selectCurrentEntityKey);
      this.currentSet$ = this.store.select(selectors.selectCurrentEntities);
      this.currentSetKeys$ = this.store.select(selectors.selectCurrentEntitiesKeys);
      this.edited$ = this.store.select(selectors.selectEditedEntity);
      this.isDirty$ = this.store.select(selectors.selectIsDirty);
      this.currentPage$ = this.store.select(selectors.selectCurrentPage);
      this.currentRange$ = this.store.select(selectors.selectCurrentRange);
      this.totalPageable$ = this.store.select(selectors.selectTotalPageable);
      this.hasBeenLoaded$ = this.store.select(selectors.selectHasBeenLoaded);
      this.loadWasAttempted$ = this.store.select(selectors.selectLoadWasAttempted);
      this.isLoading$ = this.store.select(selectors.selectIsLoading);
      this.isSaving$ = this.store.select(selectors.selectIsSaving);
      this.isDeleting$ = this.store.select(selectors.selectIsDeleting);
      this.loadedAt$ = this.store.select(selectors.selectLoadedAt);
      this.savedAt$ = this.store.select(selectors.selectSavedAt);
      this.createdAt$ = this.store.select(selectors.selectCreatedAt);
      this.updatedAt$ = this.store.select(selectors.selectUpdatedAt);
      this.replacedAt$ = this.store.select(selectors.selectReplacedAt);
      this.deletedAt$ = this.store.select(selectors.selectDeletedAt);

      this.all = toSignal(this.all$, { requireSync: true });
      this.sorted = toSignal(this.sorted$, { requireSync: true });
      this.entities = toSignal(this.entities$, { requireSync: true });
      this.ids = toSignal(this.ids$, { requireSync: true });
      this.total = toSignal(this.total$, { requireSync: true });
      this.hasEntities = toSignal(this.hasEntities$, { requireSync: true });
      this.hasNoEntities = toSignal(this.hasNoEntities$, { requireSync: true });
      this.current = toSignal(this.current$, { requireSync: true });
      this.currentKey = toSignal(this.currentKey$, { requireSync: true });
      this.currentSet = toSignal(this.currentSet$, { requireSync: true });
      this.currentSetKeys = toSignal(this.currentSetKeys$, { requireSync: true });
      this.edited = toSignal(this.edited$, { requireSync: true });
      this.isDirty = toSignal(this.isDirty$, { requireSync: true });
      this.currentPage = toSignal(this.currentPage$, { requireSync: true });
      this.currentRange = toSignal(this.currentRange$, { requireSync: true });
      this.totalPageable = toSignal(this.totalPageable$, { requireSync: true });
      this.hasBeenLoaded = toSignal(this.hasBeenLoaded$, { requireSync: true });
      this.loadWasAttempted = toSignal(this.loadWasAttempted$, { requireSync: true });
      this.isLoading = toSignal(this.isLoading$, { requireSync: true });
      this.isSaving = toSignal(this.isSaving$, { requireSync: true });
      this.isDeleting = toSignal(this.isDeleting$, { requireSync: true });
      this.loadedAt = toSignal(this.loadedAt$, { requireSync: true });
      this.savedAt = toSignal(this.savedAt$, { requireSync: true });
      this.createdAt = toSignal(this.createdAt$, { requireSync: true });
      this.updatedAt = toSignal(this.updatedAt$, { requireSync: true });
      this.replacedAt = toSignal(this.replacedAt$, { requireSync: true });
      this.deletedAt = toSignal(this.deletedAt$, { requireSync: true });
    }

    // region Selections
    all$: Observable<TModel[]>;
    sorted$: Observable<TModel[]>;
    entities$: Observable<IEntityDictionary<TModel>>;
    ids$: Observable<EntityIdentity[]>;
    total$: Observable<number>;
    hasEntities$: Observable<boolean>;
    hasNoEntities$: Observable<boolean>;
    current$: Observable<TModel>;
    currentKey$: Observable<EntityIdentity>;
    currentSet$: Observable<TModel[]>;
    currentSetKeys$: Observable<EntityIdentity[]>;
    edited$: Observable<Partial<TModel>>;
    isDirty$: Observable<boolean>;
    currentPage$: Observable<Page>;
    currentRange$: Observable<Range>;
    totalPageable$: Observable<number>;
    hasBeenLoaded$: Observable<boolean>;
    loadWasAttempted$: Observable<boolean>;
    isLoading$: Observable<boolean>;
    isSaving$: Observable<boolean>;
    isDeleting$: Observable<boolean>;
    loadedAt$: Observable<Date>;
    savedAt$: Observable<Date>;
    createdAt$: Observable<Date>;
    updatedAt$: Observable<Date>;
    replacedAt$: Observable<Date>;
    deletedAt$: Observable<Date>;

    all: Signal<TModel[]>;
    sorted: Signal<TModel[]>;
    entities: Signal<IEntityDictionary<TModel>>;
    ids: Signal<EntityIdentity[]>;
    total: Signal<number>;
    hasEntities: Signal<boolean>;
    hasNoEntities: Signal<boolean>;
    current: Signal<TModel>;
    currentKey: Signal<EntityIdentity>;
    currentSet: Signal<TModel[]>;
    currentSetKeys: Signal<EntityIdentity[]>;
    edited: Signal<Partial<TModel>>;
    isDirty: Signal<boolean>;
    currentPage: Signal<Page>;
    currentRange: Signal<Range>;
    totalPageable: Signal<number>;
    hasBeenLoaded: Signal<boolean>;
    loadWasAttempted: Signal<boolean>;
    isLoading: Signal<boolean>;
    isSaving: Signal<boolean>;
    isDeleting: Signal<boolean>;
    loadedAt: Signal<Date>;
    savedAt: Signal<Date>;
    createdAt: Signal<Date>;
    updatedAt: Signal<Date>;
    replacedAt: Signal<Date>;
    deletedAt: Signal<Date>;
    // endregion

    // region Activities
    select(entity: TModel, correlationId?: string): string {
      const action = new Select(this.modelType, entity, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    selectByKey(key: EntityIdentity, correlationId?: string): string {
      const action = new SelectByKey(this.modelType, key, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    selectMany(entities: TModel[], correlationId?: string): string {
      const action = new SelectMany(this.modelType, entities, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    selectMore(entities: TModel[], correlationId?: string): string {
      const action = new SelectMore(this.modelType, entities, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    selectManyByKeys(keys: EntityIdentity[], correlationId?: string): string {
      const action = new SelectManyByKeys(this.modelType, keys, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    selectMoreByKeys(keys: EntityIdentity[], correlationId?: string): string {
      const action = new SelectMoreByKeys(this.modelType, keys, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    deselect(correlationId?: string): string {
      const action = new Deselect(this.modelType, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    deselectMany(entities: TModel[], correlationId?: string): string {
      const action = new DeselectMany(this.modelType, entities, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    deselectManyByKeys(keys: EntityIdentity[], correlationId?: string): string {
      const action = new DeselectManyByKeys(this.modelType, keys, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    deselectAll(correlationId?: string): string {
      const action = new DeselectAll(this.modelType, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    edit(entity: Partial<TModel>, correlationId?: string): string {
      const action = new Edit(this.modelType, entity, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    editNew(entity?: Partial<TModel>, correlationId?: string): string {
      const action = new EditNew(this.modelType, entity, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    editByKey(key: EntityIdentity, correlationId?: string): string {
      const action = new EditByKey(this.modelType, key, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    change(entity: Partial<TModel>, correlationId?: string): string {
      const action = new Change(this.modelType, entity, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    endEdit(correlationId?: string): string {
      const action = new EndEdit(this.modelType, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    load(keys?: any, criteria?: any, correlationId?: string): string {
      const action = new Load(this.modelType, keys, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    loadIfNecessary(keys?: any, criteria?: any, maxAge?: number, correlationId?: string): string {
      const action = new LoadIfNecessary(this.modelType, keys, maxAge, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    loadMany(criteria?: any, correlationId?: string): string {
      const action = new LoadMany(this.modelType, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    loadManyIfNecessary(criteria?: any, maxAge?: number, correlationId?: string): string {
      const action = new LoadManyIfNecessary(this.modelType, maxAge, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    loadAll(criteria?: any, correlationId?: string): string {
      const action = new LoadAll(this.modelType, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    loadAllIfNecessary(criteria?: any, maxAge?: number, correlationId?: string): string {
      const action = new LoadAllIfNecessary(this.modelType, maxAge, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    loadPage(page: Page, criteria?: any, correlationId?: string): string {
      const action = new LoadPage(this.modelType, page, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    loadPageIfNecessary(page: Page, criteria?: any, maxAge?: number, correlationId?: string): string {
      const action = new LoadPageIfNecessary(this.modelType, page, maxAge, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    loadRange(range: Range, criteria?: any, correlationId?: string): string {
      const action = new LoadRange(this.modelType, range, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    loadRangeIfNecessary(range: Range, criteria?: any, maxAge?: number, correlationId?: string): string {
      const action = new LoadRangeIfNecessary(this.modelType, range, maxAge, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    create(entity: TModel, criteria?: any, correlationId?: string): string {
      const action = new Create(this.modelType, entity, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    createMany(entities: TModel[], criteria?: any, correlationId?: string): string {
      const action = new CreateMany(this.modelType, entities, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    update(entity: TModel, criteria?: any, correlationId?: string): string {
      const action = new Update(this.modelType, entity, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    updateMany(entities: TModel[], criteria?: any, correlationId?: string): string {
      const action = new UpdateMany(this.modelType, entities, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    upsert(entity: TModel, criteria?: any, correlationId?: string): string {
      const action = new Upsert(this.modelType, entity, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    upsertMany(entities: TModel[], criteria?: any, correlationId?: string): string {
      const action = new UpsertMany(this.modelType, entities, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    replace(entity: TModel, criteria?: any, correlationId?: string): string {
      const action = new Replace(this.modelType, entity, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    replaceMany(entities: TModel[], criteria?: any, correlationId?: string): string {
      const action = new ReplaceMany(this.modelType, entities, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    delete(entity: TModel, criteria?: any, correlationId?: string): string {
      const action = new Delete(this.modelType, entity, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    deleteMany(entities: TModel[], criteria?: any, correlationId?: string): string {
      const action = new DeleteMany(this.modelType, entities, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    deleteByKey(key: string | number, criteria?: any, correlationId?: string): string {
      const action = new DeleteByKey(this.modelType, key, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    deleteManyByKeys(keys: EntityIdentity[], criteria?: any, correlationId?: string): string {
      const action = new DeleteManyByKeys(this.modelType, keys, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    clear(correlationId?: string): string {
      const action = new Clear(this.modelType, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }
    // endregion
  }

  return EntityFacadeBase;
};
