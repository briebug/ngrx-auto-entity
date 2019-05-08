import { createSelector, MemoizedSelector, select, Store } from '@ngrx/store';
import { camelCase } from 'change-case';
import { Observable } from 'rxjs';
import {
  Clear,
  Create,
  CreateMany,
  Delete,
  DeleteMany,
  Deselect,
  Load,
  LoadAll,
  LoadMany,
  LoadPage,
  LoadRange,
  Replace,
  ReplaceMany,
  Select,
  SelectByKey,
  Update,
  UpdateMany
} from './actions';
import { Page, Range } from './models';

/**
 * Structure for how entities are stored within the `entities` state property:
 * a single object with the key being each entity's @Key value and the value being the entity itself
 */
export interface IEntityDictionary<TModel> {
  [key: string]: TModel;
}

export type EntityIdentity = string | number;

/**
 * Structure for how entities are stored along with the array of their keys
 */
export interface IEntityState<TModel> {
  entities: IEntityDictionary<TModel>;
  ids: EntityIdentity[];
  currentEntityKey?: string | number;
  currentPage?: Page;
  currentRange?: Range;
  totalPageableCount?: number;
  isLoading?: boolean;
  isSaving?: boolean;
  isDeleting?: boolean;
  loadedAt?: Date;
  savedAt?: Date;
  deletedAt?: Date;
}

export interface IModelState<TParentState, TState, TModel> {
  initialState: TState;
  selectors: ISelectorMap<TParentState, TModel>;
  reducer: (state: TState) => IEntityState<TModel>;
  facade: { new (type: { new (): TModel }, store: Store<any>): IEntityFacade<TModel> };
  entityState: ((state: TParentState) => TState) | (MemoizedSelector<object, any>);
}

export interface ISelectorMap<TParentState, TModel> {
  selectIds: MemoizedSelector<object | TParentState, EntityIdentity[]>;
  selectEntities: MemoizedSelector<object | TParentState, IEntityDictionary<TModel>>;
  selectAll: MemoizedSelector<object | TParentState, TModel[]>;
  selectTotal: MemoizedSelector<object | TParentState, number>;
  selectCurrentEntity: MemoizedSelector<object | TParentState, TModel>;
  selectCurrentEntityKey: MemoizedSelector<object | TParentState, any>;
  selectCurrentPage: MemoizedSelector<object | TParentState, Page>;
  selectCurrentRange: MemoizedSelector<object | TParentState, Range>;
  selectTotalPageable: MemoizedSelector<object | TParentState, number>;
  selectIsLoading: MemoizedSelector<object | TParentState, boolean>;
  selectIsSaving: MemoizedSelector<object | TParentState, boolean>;
  selectIsDeleting: MemoizedSelector<object | TParentState, boolean>;
  selectLoadedAt: MemoizedSelector<object | TParentState, Date>;
  selectSavedAt: MemoizedSelector<object | TParentState, Date>;
  selectDeletedAt: MemoizedSelector<object | TParentState, Date>;
}

/**
 * The basic structure of a class for an entity
 */
export interface ITModelClass<TModel> {
  new (): TModel;
}

export interface IEntityFacade<TModel> {
  all: Observable<TModel[]>;
  entities: Observable<IEntityDictionary<TModel>>;
  ids: Observable<EntityIdentity[]>;
  total: Observable<number>;
  current: Observable<TModel>;
  currentKey: Observable<any>;
  currentPage: Observable<Page>;
  currentRange: Observable<Range>;
  totalPageable: Observable<number>;
  isLoading: Observable<boolean>;
  isSaving: Observable<boolean>;
  isDeleting: Observable<boolean>;
  loadedAt: Observable<Date>;
  savedAt: Observable<Date>;
  deletedAt: Observable<Date>;

  select(entity: TModel): void;
  selectByKey(key: EntityIdentity): void;
  deselect(): void;
  load(keys: any, criteria?: any): void;
  loadMany(criteria?: any): void;
  loadAll(criteria?: any): void;
  loadPage(page: Page, criteria?: any): void;
  loadRange(range: Range, criteria?: any): void;
  create(entity: TModel, criteria?: any): void;
  createMany(entities: TModel[], criteria?: any): void;
  update(entity: TModel, criteria?: any): void;
  updateMany(entities: TModel[], criteria?: any): void;
  replace(entity: TModel, criteria?: any): void;
  replaceMany(entities: TModel[], criteria?: any): void;
  delete(entity: TModel, criteria?: any): void;
  deleteMany(entities: TModel[], criteria?: any): void;
  clear(): void;
}

/**
 * Builds the initial Ngrx state for an entity
 *
 * @param type the entity class
 * @param extraInitialState the (optional) initial state
 */
export const buildState = <TState extends IEntityState<TModel>, TParentState, TModel>(
  type: ITModelClass<TModel>,
  extraInitialState?: any
): IModelState<TParentState, TState, TModel> => {
  const modelName = camelCase(new type().constructor.name);

  const getState = (state: TParentState): TState => state[modelName];

  // This uses ES6/TS computed property names: http://es6-features.org/#ComputedPropertyNames

  const initialState = {
    entities: {},
    ids: [],
    ...extraInitialState
  } as TState;

  const selectors = {
    selectAll: createSelector(getState, (state: TState): TModel[] => state.ids.map(id => state.entities[id])),
    selectEntities: createSelector(getState, (state: TState): IEntityDictionary<TModel> => state.entities),
    selectIds: createSelector(getState, (state: TState): EntityIdentity[] => state.ids),
    selectTotal: createSelector(getState, (state: TState): number => state.ids.length),
    selectCurrentEntity: createSelector(getState, (state: TState): TModel => state.entities[state.currentEntityKey]),
    selectCurrentEntityKey: createSelector(getState, (state: TState): any => state.currentEntityKey),
    selectCurrentPage: createSelector(getState, (state: TState): Page => state.currentPage),
    selectCurrentRange: createSelector(getState, (state: TState): Range => state.currentRange),
    selectTotalPageable: createSelector(getState, (state: TState): number => state.totalPageableCount),
    selectIsLoading: createSelector(getState, (state: TState): boolean => !!state.isLoading),
    selectIsSaving: createSelector(getState, (state: TState): boolean => !!state.isSaving),
    selectIsDeleting: createSelector(getState, (state: TState): boolean => !!state.isDeleting),
    selectLoadedAt: createSelector(getState, (state: TState): Date => state.loadedAt),
    selectSavedAt: createSelector(getState, (state: TState): Date => state.savedAt),
    selectDeletedAt: createSelector(getState, (state: TState): Date => state.deletedAt)
  } as ISelectorMap<TParentState, TModel>;

  const facade = class Facade implements IEntityFacade<TModel> {
    constructor(protected modelType: { new (): TModel }, protected store: Store<any>) {}

    get all(): Observable<TModel[]> {
      return this.store.pipe(select(selectors.selectAll));
    }

    get entities(): Observable<IEntityDictionary<TModel>> {
      return this.store.pipe(select(selectors.selectEntities));
    }

    get ids(): Observable<EntityIdentity[]> {
      return this.store.pipe(select(selectors.selectIds));
    }

    get total(): Observable<number> {
      return this.store.pipe(select(selectors.selectTotal));
    }

    get current(): Observable<TModel> {
      return this.store.pipe(select(selectors.selectCurrentEntity));
    }

    get currentKey(): Observable<any> {
      return this.store.pipe(select(selectors.selectCurrentEntityKey));
    }

    get currentPage(): Observable<Page> {
      return this.store.pipe(select(selectors.selectCurrentPage));
    }

    get currentRange(): Observable<Range> {
      return this.store.pipe(select(selectors.selectCurrentRange));
    }

    get totalPageable(): Observable<number> {
      return this.store.pipe(select(selectors.selectTotalPageable));
    }

    get isLoading(): Observable<boolean> {
      return this.store.pipe(select(selectors.selectIsLoading));
    }

    get isSaving(): Observable<boolean> {
      return this.store.pipe(select(selectors.selectIsSaving));
    }

    get isDeleting(): Observable<boolean> {
      return this.store.pipe(select(selectors.selectIsDeleting));
    }

    get loadedAt(): Observable<Date> {
      return this.store.pipe(select(selectors.selectLoadedAt));
    }

    get savedAt(): Observable<Date> {
      return this.store.pipe(select(selectors.selectSavedAt));
    }

    get deletedAt(): Observable<Date> {
      return this.store.pipe(select(selectors.selectDeletedAt));
    }

    select(entity: TModel): void {
      this.store.dispatch(new Select(this.modelType, entity));
    }

    selectByKey(key: EntityIdentity): void {
      this.store.dispatch(new SelectByKey(this.modelType, key));
    }

    deselect(): void {
      this.store.dispatch(new Deselect(this.modelType));
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

    clear(): void {
      this.store.dispatch(new Clear(this.modelType));
    }
  };

  const reducer = function(state = initialState): IEntityState<TModel> {
    // tslint:disable-line
    return state;
  };

  const entityState = getState as (state: TParentState) => TState;

  return {
    initialState,
    selectors,
    reducer,
    facade,
    entityState
  };
};

/**
 * Builds the Ngrx state for an entity that is part of a feature module
 *
 * @param type the entity class
 * @param selectParentState a selector for the entity's parent state
 * @param extraInitialState the (optional) initial feature state
 */
export const buildFeatureState = <TState extends IEntityState<TModel>, TParentState, TModel>(
  type: ITModelClass<TModel>,
  selectParentState: MemoizedSelector<object, TParentState>,
  extraInitialState?: any
): IModelState<TParentState, TState, TModel> => {
  const modelName = camelCase(new type().constructor.name);

  const selectState = createSelector(selectParentState, (state: TParentState) => state[modelName]);

  // This uses ES6/TS computed property names: http://es6-features.org/#ComputedPropertyNames
  const initialState = {
    [modelName]: {
      entities: {},
      ids: [],
      ...extraInitialState
    }
  } as TState;

  const selectors = {
    selectAll: createSelector(selectState, (state: TState): TModel[] => state.ids.map(id => state.entities[id])),
    selectEntities: createSelector(selectState, (state: TState): IEntityDictionary<TModel> => state.entities),
    selectIds: createSelector(selectState, (state: TState): EntityIdentity[] => state.ids),
    selectTotal: createSelector(selectState, (state: TState): number => state.ids.length),
    selectCurrentEntity: createSelector(selectState, (state: TState): TModel => state.entities[state.currentEntityKey]),
    selectCurrentEntityKey: createSelector(selectState, (state: TState): any => state.currentEntityKey),
    selectCurrentPage: createSelector(selectState, (state: TState): Page => state.currentPage),
    selectCurrentRange: createSelector(selectState, (state: TState): Range => state.currentRange),
    selectTotalPageable: createSelector(selectState, (state: TState): number => state.totalPageableCount),
    selectIsLoading: createSelector(selectState, (state: TState): boolean => !!state.isLoading),
    selectIsSaving: createSelector(selectState, (state: TState): boolean => !!state.isSaving),
    selectIsDeleting: createSelector(selectState, (state: TState): boolean => !!state.isDeleting),
    selectLoadedAt: createSelector(selectState, (state: TState): Date => state.loadedAt),
    selectSavedAt: createSelector(selectState, (state: TState): Date => state.savedAt),
    selectDeletedAt: createSelector(selectState, (state: TState): Date => state.deletedAt)
  } as ISelectorMap<TParentState, TModel>;

  const facade = class Facade implements IEntityFacade<TModel> {
    constructor(protected modelType: { new (): TModel }, protected store: Store<any>) {}

    get all(): Observable<TModel[]> {
      return this.store.pipe(select(selectors.selectAll));
    }

    get entities(): Observable<IEntityDictionary<TModel>> {
      return this.store.pipe(select(selectors.selectEntities));
    }

    get ids(): Observable<EntityIdentity[]> {
      return this.store.pipe(select(selectors.selectIds));
    }

    get total(): Observable<number> {
      return this.store.pipe(select(selectors.selectTotal));
    }

    get current(): Observable<TModel> {
      return this.store.pipe(select(selectors.selectCurrentEntity));
    }

    get currentKey(): Observable<any> {
      return this.store.pipe(select(selectors.selectCurrentEntityKey));
    }

    get currentPage(): Observable<Page> {
      return this.store.pipe(select(selectors.selectCurrentPage));
    }

    get currentRange(): Observable<Range> {
      return this.store.pipe(select(selectors.selectCurrentRange));
    }

    get totalPageable(): Observable<number> {
      return this.store.pipe(select(selectors.selectTotalPageable));
    }

    get isLoading(): Observable<boolean> {
      return this.store.pipe(select(selectors.selectIsLoading));
    }

    get isSaving(): Observable<boolean> {
      return this.store.pipe(select(selectors.selectIsSaving));
    }

    get isDeleting(): Observable<boolean> {
      return this.store.pipe(select(selectors.selectIsDeleting));
    }

    get loadedAt(): Observable<Date> {
      return this.store.pipe(select(selectors.selectLoadedAt));
    }

    get savedAt(): Observable<Date> {
      return this.store.pipe(select(selectors.selectSavedAt));
    }

    get deletedAt(): Observable<Date> {
      return this.store.pipe(select(selectors.selectDeletedAt));
    }

    select(entity: TModel): void {
      this.store.dispatch(new Select(this.modelType, entity));
    }

    selectByKey(key: EntityIdentity): void {
      this.store.dispatch(new SelectByKey(this.modelType, key));
    }

    deselect(): void {
      this.store.dispatch(new Deselect(this.modelType));
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

    clear(): void {
      this.store.dispatch(new Clear(this.modelType));
    }
  };

  const reducer = function(state = initialState): IEntityState<TModel> {
    // tslint:disable-line
    return state;
  };

  const entityState = selectState as MemoizedSelector<object, any>;

  return {
    initialState,
    selectors,
    reducer,
    facade,
    entityState
  };
};
