import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  Change,
  Create,
  Delete,
  DeleteByKey, DeselectManyByKeys, EditByKey, EndEdit,
  Load,
  LoadMany,
  LoadPage,
  Replace,
  ReplaceMany, Select, SelectMany,
  SelectMore,
  Upsert,
  UpsertMany
} from '../..';
import {
  Clear
} from '../actions/actions';
import { CreateMany } from '../actions/create-actions';
import { DeleteMany } from '../actions/delete-actions';
import { DeleteManyByKeys } from '../actions/delete-by-key-actions';
import { Deselect, DeselectAll, DeselectMany } from '../actions/deselection-actions';
import { Edit } from '../actions/edit-actions';
import { LoadAll } from '../actions/load-all-actions';
import { LoadRange } from '../actions/load-range-actions';
import { SelectByKey, SelectManyByKeys, SelectMoreByKeys } from '../actions/selection-actions';
import { Update, UpdateMany } from '../actions/update-actions';
import { Page, Range } from '../models';
import { EntityIdentity, IEntityDictionary } from './entity-state';
import { IEntityFacade } from './facade';
import { ISelectorMap } from './selector-map';

/**
 * Builds a new facade class for the specified entity model and parent state.
 * @param selectors - the selector map for the specified entity
 */
export const buildFacade = <TModel, TParentState>(selectors: ISelectorMap<TParentState, TModel>) => {
  const BaseFacade = class Facade implements IEntityFacade<TModel> {
    modelType: new () => TModel;
    store: Store<any>;

    constructor(modelType: new () => TModel, store: Store<any>) {
      this.modelType = modelType;
      this.store = store;
    }

    // region Selections
    get all$(): Observable<TModel[]> {
      return this.store.select(selectors.selectAll);
    }

    get sorted$(): Observable<TModel[]> {
      return this.store.select(selectors.selectAllSorted);
    }

    get entities$(): Observable<IEntityDictionary<TModel>> {
      return this.store.select(selectors.selectEntities);
    }

    get ids$(): Observable<EntityIdentity[]> {
      return this.store.select(selectors.selectIds);
    }

    get total$(): Observable<number> {
      return this.store.select(selectors.selectTotal);
    }

    get current$(): Observable<TModel> {
      return this.store.select(selectors.selectCurrentEntity);
    }

    get currentKey$(): Observable<EntityIdentity> {
      return this.store.select(selectors.selectCurrentEntityKey);
    }

    get currentSet$(): Observable<TModel[]> {
      return this.store.select(selectors.selectCurrentEntities);
    }

    get currentSetKeys$(): Observable<EntityIdentity[]> {
      return this.store.select(selectors.selectCurrentEntitiesKeys);
    }

    get edited$(): Observable<Partial<TModel>> {
      return this.store.select(selectors.selectEditedEntity);
    }

    get isDirty$(): Observable<boolean> {
      return this.store.select(selectors.selectIsDirty);
    }

    get currentPage$(): Observable<Page> {
      return this.store.select(selectors.selectCurrentPage);
    }

    get currentRange$(): Observable<Range> {
      return this.store.select(selectors.selectCurrentRange);
    }

    get totalPageable$(): Observable<number> {
      return this.store.select(selectors.selectTotalPageable);
    }

    get isLoading$(): Observable<boolean> {
      return this.store.select(selectors.selectIsLoading);
    }

    get isSaving$(): Observable<boolean> {
      return this.store.select(selectors.selectIsSaving);
    }

    get isDeleting$(): Observable<boolean> {
      return this.store.select(selectors.selectIsDeleting);
    }

    get loadedAt$(): Observable<Date> {
      return this.store.select(selectors.selectLoadedAt);
    }

    get savedAt$(): Observable<Date> {
      return this.store.select(selectors.selectSavedAt);
    }

    get createdAt$(): Observable<Date> {
      return this.store.select(selectors.selectCreatedAt);
    }

    get deletedAt$(): Observable<Date> {
      return this.store.select(selectors.selectDeletedAt);
    }

    customSorted$(name: string): Observable<TModel[]> {
      return this.store.select(selectors.selectCustomSorted, { name });
    }
    // endregion

    // region Dispatches
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

    loadMany(criteria?: any, correlationId?: string): string {
      const action = new LoadMany(this.modelType, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    loadAll(criteria?: any, correlationId?: string): string {
      const action = new LoadAll(this.modelType, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    loadPage(page: Page, criteria?: any, correlationId?: string): string {
      const action = new LoadPage(this.modelType, page, criteria, correlationId);
      this.store.dispatch(action);
      return action.correlationId;
    }

    loadRange(range: Range, criteria?: any, correlationId?: string): string {
      const action = new LoadRange(this.modelType, range, criteria, correlationId);
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
  };

  return BaseFacade;
};
