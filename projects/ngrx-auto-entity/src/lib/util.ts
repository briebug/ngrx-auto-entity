import { createSelector, MemoizedSelector, select, Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { camelCase } from '../util/case';
import {
  Change,
  Clear,
  Create,
  CreateMany,
  Delete,
  DeleteMany,
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
} from './actions';
// NOTE: The following line MUST import:  IPage, IPageInfo, IRangeInfo, Page, Range; Required for AOT!
import { IPage, IPageInfo, IRangeInfo, Page, Range } from './models'; // NOTE: Keep ALL imports here!!!!

/**
 * Structure for how entities are stored within the `entities` state property:
 * a single object with the key being each entity's @Key value and the value being the entity itself
 */
export interface IEntityDictionary<TModel> {
  [key: string]: TModel;
}

export type EntityIdentity = string | number;

/**
 * Structure for how entities are stored, including useful computed properties
 * such as an array of their keys, status flags, timestamps, etc.
 */
export interface IEntityState<TModel> {
  entities: IEntityDictionary<TModel>;
  ids: EntityIdentity[];
  currentEntityKey?: EntityIdentity;
  currentEntitiesKeys?: EntityIdentity[];
  editedEntity?: Partial<TModel>;
  isDirty?: boolean;
  currentPage?: Page;
  currentRange?: Range;
  totalPageableCount?: number;
  isLoading?: boolean;
  isSaving?: boolean;
  isDeleting?: boolean;
  loadedAt?: Date;
  savedAt?: Date;
  createdAt?: Date;
  deletedAt?: Date;
}

/**
 * Structure of the model state built by the buildState() function
 */
export interface IModelState<TParentState, TState, TModel> {
  initialState: TState;
  selectors: ISelectorMap<TParentState, TModel>;
  reducer: (state: TState) => IEntityState<TModel>;
  facade: new (type: new () => TModel, store: Store<any>) => IEntityFacade<TModel>;
  entityState: ((state: TParentState) => TState) | (MemoizedSelector<object, any>);
}

/**
 * Structure of a Selector Map defining all the selectors that may
 * be used to retrieve state managed by Auto-Entity
 */
export interface ISelectorMap<TParentState, TModel> {
  selectIds: MemoizedSelector<object | TParentState, EntityIdentity[]>;
  selectEntities: MemoizedSelector<object | TParentState, IEntityDictionary<TModel>>;
  selectAll: MemoizedSelector<object | TParentState, TModel[]>;
  selectTotal: MemoizedSelector<object | TParentState, number>;
  selectCurrentEntity: MemoizedSelector<object | TParentState, TModel>;
  selectCurrentEntityKey: MemoizedSelector<object | TParentState, EntityIdentity>;
  selectCurrentEntities: MemoizedSelector<object | TParentState, TModel[]>;
  selectCurrentEntitiesKeys: MemoizedSelector<object | TParentState, EntityIdentity[]>;
  selectEditedEntity: MemoizedSelector<object | TParentState, Partial<TModel>>;
  selectIsDirty: MemoizedSelector<object | TParentState, boolean>;
  selectCurrentPage: MemoizedSelector<object | TParentState, Page>;
  selectCurrentRange: MemoizedSelector<object | TParentState, Range>;
  selectTotalPageable: MemoizedSelector<object | TParentState, number>;
  selectIsLoading: MemoizedSelector<object | TParentState, boolean>;
  selectIsSaving: MemoizedSelector<object | TParentState, boolean>;
  selectIsDeleting: MemoizedSelector<object | TParentState, boolean>;
  selectLoadedAt: MemoizedSelector<object | TParentState, Date>;
  selectSavedAt: MemoizedSelector<object | TParentState, Date>;
  selectCreatedAt: MemoizedSelector<object | TParentState, Date>;
  selectDeletedAt: MemoizedSelector<object | TParentState, Date>;
}

export const buildSelectorMap = <TParentState, TState extends IEntityState<TModel>, TModel>(
  getState: Selector<TParentState, TState> | MemoizedSelector<object | TParentState, TState>
): ISelectorMap<TParentState, TModel> =>
  ({
    selectAll: createSelector(
      getState,
      (state: TState): TModel[] => state.ids.map(id => state.entities[id])
    ),
    selectEntities: createSelector(
      getState,
      (state: TState): IEntityDictionary<TModel> => state.entities
    ),
    selectIds: createSelector(
      getState,
      (state: TState): EntityIdentity[] => state.ids
    ),
    selectTotal: createSelector(
      getState,
      (state: TState): number => state.ids.length
    ),
    selectCurrentEntity: createSelector(
      getState,
      (state: TState): TModel => state.entities[state.currentEntityKey]
    ),
    selectCurrentEntityKey: createSelector(
      getState,
      (state: TState): EntityIdentity => state.currentEntityKey
    ),
    selectCurrentEntities: createSelector(
      getState,
      (state: TState): TModel[] => state.currentEntitiesKeys.map(key => state.entities[key])
    ),
    selectCurrentEntitiesKeys: createSelector(
      getState,
      (state: TState): EntityIdentity[] => state.currentEntitiesKeys
    ),
    selectEditedEntity: createSelector(
      getState,
      (state: TState): Partial<TModel> => state.editedEntity
    ),
    selectIsDirty: createSelector(
      getState,
      (state: TState): boolean => !!state.isDirty
    ),
    selectCurrentPage: createSelector(
      getState,
      (state: TState): Page => state.currentPage
    ),
    selectCurrentRange: createSelector(
      getState,
      (state: TState): Range => state.currentRange
    ),
    selectTotalPageable: createSelector(
      getState,
      (state: TState): number => state.totalPageableCount
    ),
    selectIsLoading: createSelector(
      getState,
      (state: TState): boolean => !!state.isLoading
    ),
    selectIsSaving: createSelector(
      getState,
      (state: TState): boolean => !!state.isSaving
    ),
    selectIsDeleting: createSelector(
      getState,
      (state: TState): boolean => !!state.isDeleting
    ),
    selectLoadedAt: createSelector(
      getState,
      (state: TState): Date => state.loadedAt
    ),
    selectSavedAt: createSelector(
      getState,
      (state: TState): Date => state.savedAt
    ),
    selectCreatedAt: createSelector(
      getState,
      (state: TState): Date => state.createdAt
    ),
    selectDeletedAt: createSelector(
      getState,
      (state: TState): Date => state.deletedAt
    )
  } as ISelectorMap<TParentState, TModel>);

/**
 * The basic structure of a class for an entity
 */
export type IModelClass<TModel> = new () => TModel;

/**
 * The definition of an Auto-Entity facade class
 */
export interface IEntityFacade<TModel> {
  all$: Observable<TModel[]>;
  entities$: Observable<IEntityDictionary<TModel>>;
  ids$: Observable<EntityIdentity[]>;
  total$: Observable<number>;
  current$: Observable<TModel>;
  currentKey$: Observable<EntityIdentity>;
  currentSet$: Observable<TModel[]>;
  currentSetKeys$: Observable<EntityIdentity[]>;
  edited$: Observable<Partial<TModel>>;
  isDirty$: Observable<boolean>;
  currentPage$: Observable<Page>;
  currentRange$: Observable<Range>;
  totalPageable$: Observable<number>;
  isLoading$: Observable<boolean>;
  isSaving$: Observable<boolean>;
  isDeleting$: Observable<boolean>;
  loadedAt$: Observable<Date>;
  savedAt$: Observable<Date>;
  createdAt$: Observable<Date>;
  deletedAt$: Observable<Date>;

  select(entity: TModel): void;

  selectByKey(key: EntityIdentity): void;

  selectMany(entities: TModel[]): void;

  selectMore(entities: TModel[]): void;

  selectManyByKeys(keys: EntityIdentity[]): void;

  selectMoreByKeys(keys: EntityIdentity[]): void;

  deselect(): void;

  deselectMany(entities: TModel[]): void;

  deselectManyByKeys(keys: EntityIdentity[]): void;

  deselectAll(): void;

  edit(entity: Partial<TModel>): void;

  change(entity: Partial<TModel>): void;

  endEdit(): void;

  load(keys: any, criteria?: any): void;

  loadMany(criteria: any): void;

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
      return this.store.pipe(select(selectors.selectAll));
    }

    get entities$(): Observable<IEntityDictionary<TModel>> {
      return this.store.pipe(select(selectors.selectEntities));
    }

    get ids$(): Observable<EntityIdentity[]> {
      return this.store.pipe(select(selectors.selectIds));
    }

    get total$(): Observable<number> {
      return this.store.pipe(select(selectors.selectTotal));
    }

    get current$(): Observable<TModel> {
      return this.store.pipe(select(selectors.selectCurrentEntity));
    }

    get currentKey$(): Observable<EntityIdentity> {
      return this.store.pipe(select(selectors.selectCurrentEntityKey));
    }

    get currentSet$(): Observable<TModel[]> {
      return this.store.pipe(select(selectors.selectCurrentEntities));
    }

    get currentSetKeys$(): Observable<EntityIdentity[]> {
      return this.store.pipe(select(selectors.selectCurrentEntitiesKeys));
    }

    get edited$(): Observable<Partial<TModel>> {
      return this.store.pipe(select(selectors.selectEditedEntity));
    }

    get isDirty$(): Observable<boolean> {
      return this.store.pipe(select(selectors.selectIsDirty));
    }

    get currentPage$(): Observable<Page> {
      return this.store.pipe(select(selectors.selectCurrentPage));
    }

    get currentRange$(): Observable<Range> {
      return this.store.pipe(select(selectors.selectCurrentRange));
    }

    get totalPageable$(): Observable<number> {
      return this.store.pipe(select(selectors.selectTotalPageable));
    }

    get isLoading$(): Observable<boolean> {
      return this.store.pipe(select(selectors.selectIsLoading));
    }

    get isSaving$(): Observable<boolean> {
      return this.store.pipe(select(selectors.selectIsSaving));
    }

    get isDeleting$(): Observable<boolean> {
      return this.store.pipe(select(selectors.selectIsDeleting));
    }

    get loadedAt$(): Observable<Date> {
      return this.store.pipe(select(selectors.selectLoadedAt));
    }

    get savedAt$(): Observable<Date> {
      return this.store.pipe(select(selectors.selectSavedAt));
    }

    get createdAt$(): Observable<Date> {
      return this.store.pipe(select(selectors.selectCreatedAt));
    }

    get deletedAt$(): Observable<Date> {
      return this.store.pipe(select(selectors.selectDeletedAt));
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

    clear(): void {
      this.store.dispatch(new Clear(this.modelType));
    }
    // endregion
  };

  return BaseFacade;
};

/**
 * Builds the initial Ngrx state for an entity
 *
 * @param type - the entity class
 * @param extraInitialState - the (optional) initial state
 */
export const buildState = <TState extends IEntityState<TModel>, TParentState, TModel>(
  type: IModelClass<TModel>,
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

  const selectors = buildSelectorMap<TParentState, TState, TModel>(getState);
  const facade = buildFacade<TModel, TParentState>(selectors);
  const reducer = (state = initialState): IEntityState<TModel> => {
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

export const FEATURE_AFFINITY = '__ngrxae_feature_affinity';
/**
 * Builds the Ngrx state for an entity that is part of a feature module
 *
 * @param type the entity class
 * @param featureStateName the name of the feature state
 * @param selectParentState a selector for the entity's parent state
 * @param extraInitialState the (optional) initial feature state
 */
export const buildFeatureState = <TState extends IEntityState<TModel>, TParentState, TModel>(
  type: IModelClass<TModel>,
  featureStateName: NonNullable<string>,
  selectParentState: MemoizedSelector<object, TParentState>,
  extraInitialState?: any
): IModelState<TParentState, TState, TModel> => {
  const modelName = camelCase(new type().constructor.name);
  (type as any)[FEATURE_AFFINITY] = featureStateName;

  const selectState = createSelector(
    selectParentState,
    (state: TParentState) => state[modelName]
  );

  // This uses ES6/TS computed property names: http://es6-features.org/#ComputedPropertyNames

  const initialState = {
    entities: {},
    ids: [],
    ...extraInitialState
  } as TState;

  const selectors = buildSelectorMap<TParentState, TState, TModel>(selectState);
  const facade = buildFacade<TModel, TParentState>(selectors);
  const reducer = (state = initialState): IEntityState<TModel> => {
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
