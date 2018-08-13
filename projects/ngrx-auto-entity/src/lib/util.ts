import { createSelector, MemoizedSelector } from '@ngrx/store';
import { camelCase } from 'change-case';
import { Range } from './models';

/**
 * Structure for how entities are stored within the `entities` state property:
 * a single object with the key being each entity's @Key value and the value being the entity itself
 */
export interface IEntityDictionary<TModel> {
  [key: string]: TModel;
}

/**
 * Structure for how entities are stored along with the array of their keys
 */
export interface IEntityState<TModel> {
  entities: IEntityDictionary<TModel>;
  ids: any[];
  currentPage?: number;
  currentRange?: Range;
  totalPageableCount?: number;
}

export interface IModelState<TParentState, TState, TModel> {
  initialState: TState;
  selectors: ISelectorMap<TParentState, TModel>;
  entityState: ((state: TParentState) => TState) | (MemoizedSelector<object, any>);
}

export interface ISelectorMap<TParentState, TModel> {
  selectIds: MemoizedSelector<object | TParentState, any[]>;
  selectEntities: MemoizedSelector<object | TParentState, IEntityDictionary<TModel>>;
  selectAll: MemoizedSelector<object | TParentState, TModel[]>;
  selectTotal: MemoizedSelector<object | TParentState, number>;
  selectCurrentPage: MemoizedSelector<object | TParentState, number>;
  selectCurrentRange: MemoizedSelector<object | TParentState, Range>;
  selectTotalPageable: MemoizedSelector<object | TParentState, number>;
}

/**
 * The basic structure of a class for an entity
 */
export interface ITModelClass<TModel> {
  new (): TModel;
}

/**
 * Builds the initial Ngrx state for an entity
 *
 * @param type the entity class
 * @param initialState the (optional) initial state
 */
export const buildState = <TState extends IEntityState<TModel>, TParentState, TModel>(
  type: ITModelClass<TModel>,
  initialState?: any
): IModelState<TParentState, TState, TModel> => {
  const modelName = camelCase(new type().constructor.name);

  const getState = (state: TParentState): TState => state[modelName];

  // This uses ES6/TS computed property names: http://es6-features.org/#ComputedPropertyNames

  return {
    initialState: {
      entities: {},
      ids: [],
      ...initialState
    } as TState,
    selectors: {
      selectAll: createSelector(getState, (state: TState): TModel[] => state.ids.map(id => state.entities[id])),
      selectEntities: createSelector(getState, (state: TState): IEntityDictionary<TModel> => state.entities),
      selectIds: createSelector(getState, (state: TState): any[] => state.ids),
      selectTotal: createSelector(getState, (state: TState): number => state.ids.length),
      selectCurrentPage: createSelector(getState, (state: TState): number => state.currentPage),
      selectCurrentRange: createSelector(getState, (state: TState): Range => state.currentRange),
      selectTotalPageable: createSelector(getState, (state: TState): number => state.totalPageableCount)
    } as ISelectorMap<TParentState, TModel>,
    entityState: getState as (state: TParentState) => TState
  };
};

/**
 * Builds the Ngrx state for an entity that is part of a feature module
 *
 * @param type the entity class
 * @param selectParentState a selector for the entity's parent state
 * @param initialState the (optional) initial feature state
 */
export const buildFeatureState = <TState extends IEntityState<TModel>, TParentState, TModel>(
  type: ITModelClass<TModel>,
  selectParentState: MemoizedSelector<object, TParentState>,
  initialState?: any
): IModelState<TParentState, TState, TModel> => {
  const modelName = camelCase(new type().constructor.name);

  const selectState = createSelector(selectParentState, (state: TParentState) => state[modelName]);

  // This uses ES6/TS computed property names: http://es6-features.org/#ComputedPropertyNames
  return {
    initialState: {
      [modelName]: {
        entities: {},
        ids: [],
        ...initialState
      }
    } as TState,
    selectors: {
      selectAll: createSelector(selectState, (state: TState): TModel[] => state.ids.map(id => state.entities[id])),
      selectEntities: createSelector(selectState, (state: TState): IEntityDictionary<TModel> => state.entities),
      selectIds: createSelector(selectState, (state: TState): any[] => state.ids),
      selectTotal: createSelector(selectState, (state: TState): number => state.ids.length),
      selectCurrentPage: createSelector(selectState, (state: TState): number => state.currentPage),
      selectCurrentRange: createSelector(selectState, (state: TState): Range => state.currentRange),
      selectTotalPageable: createSelector(selectState, (state: TState): number => state.totalPageableCount)
    } as ISelectorMap<TParentState, TModel>,
    entityState: selectState as MemoizedSelector<object, any>
  };
};
