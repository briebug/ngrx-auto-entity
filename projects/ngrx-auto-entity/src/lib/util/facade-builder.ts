import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  Change,
  Clear,
  Create,
  CreateMany,
  Delete,
  DeleteByKey,
  DeleteMany,
  DeleteManyByKeys,
  Deselect,
  DeselectAll,
  DeselectMany,
  DeselectManyByKeys,
  Edit,
  EndEdit,
  Load,
  LoadAll,
  LoadMany,
  LoadPage,
  LoadRange,
  Replace,
  ReplaceMany,
  Select,
  SelectByKey,
  SelectMany,
  SelectManyByKeys,
  SelectMore,
  SelectMoreByKeys,
  Update,
  UpdateMany
} from '../actions/actions';
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

    // endregion

    // region Dispatches
    select(entity: TModel): void {
      this.store.dispatch(new Select(this.modelType, entity));
    }

    selectByKey(key: EntityIdentity): void {
      this.store.dispatch(new SelectByKey(this.modelType, key));
    }

    selectMany(entities: TModel[]): void {
      this.store.dispatch(new SelectMany(this.modelType, entities));
    }

    selectMore(entities: TModel[]): void {
      this.store.dispatch(new SelectMore(this.modelType, entities));
    }

    selectManyByKeys(keys: EntityIdentity[]): void {
      this.store.dispatch(new SelectManyByKeys(this.modelType, keys));
    }

    selectMoreByKeys(keys: EntityIdentity[]): void {
      this.store.dispatch(new SelectMoreByKeys(this.modelType, keys));
    }

    deselect(): void {
      this.store.dispatch(new Deselect(this.modelType));
    }

    deselectMany(entities: TModel[]): void {
      this.store.dispatch(new DeselectMany(this.modelType, entities));
    }

    deselectManyByKeys(keys: EntityIdentity[]): void {
      this.store.dispatch(new DeselectManyByKeys(this.modelType, keys));
    }

    deselectAll(): void {
      this.store.dispatch(new DeselectAll(this.modelType));
    }

    edit(entity: Partial<TModel>): void {
      this.store.dispatch(new Edit(this.modelType, entity));
    }

    change(entity: Partial<TModel>): void {
      this.store.dispatch(new Change(this.modelType, entity));
    }

    endEdit(): void {
      this.store.dispatch(new EndEdit(this.modelType));
    }

    load(keys: any, criteria?: any): void {
      this.store.dispatch(new Load(this.modelType, keys, criteria));
    }

    loadMany(criteria?: any): void {
      this.store.dispatch(new LoadMany(this.modelType, criteria));
    }

    loadAll(criteria?: any): void {
      this.store.dispatch(new LoadAll(this.modelType, criteria));
    }

    loadPage(page: Page, criteria?: any): void {
      this.store.dispatch(new LoadPage(this.modelType, page, criteria));
    }

    loadRange(range: Range, criteria?: any): void {
      this.store.dispatch(new LoadRange(this.modelType, range, criteria));
    }

    create(entity: TModel, criteria?: any): void {
      this.store.dispatch(new Create(this.modelType, entity, criteria));
    }

    createMany(entities: TModel[], criteria?: any): void {
      this.store.dispatch(new CreateMany(this.modelType, entities, criteria));
    }

    update(entity: TModel, criteria?: any): void {
      this.store.dispatch(new Update(this.modelType, entity, criteria));
    }

    updateMany(entities: TModel[], criteria?: any): void {
      this.store.dispatch(new UpdateMany(this.modelType, entities, criteria));
    }

    replace(entity: TModel, criteria?: any): void {
      this.store.dispatch(new Replace(this.modelType, entity, criteria));
    }

    replaceMany(entities: TModel[], criteria?: any): void {
      this.store.dispatch(new ReplaceMany(this.modelType, entities, criteria));
    }

    delete(entity: TModel, criteria?: any): void {
      this.store.dispatch(new Delete(this.modelType, entity, criteria));
    }

    deleteMany(entities: TModel[], criteria?: any): void {
      this.store.dispatch(new DeleteMany(this.modelType, entities, criteria));
    }

    deleteByKey(key: string | number, criteria?: any): void {
      this.store.dispatch(new DeleteByKey(this.modelType, key, criteria));
    }

    deleteManyByKeys(keys: EntityIdentity[], criteria?: any): void {
      this.store.dispatch(new DeleteManyByKeys(this.modelType, keys, criteria));
    }

    clear(): void {
      this.store.dispatch(new Clear(this.modelType));
    }

    // endregion
  };

  return BaseFacade;
};
