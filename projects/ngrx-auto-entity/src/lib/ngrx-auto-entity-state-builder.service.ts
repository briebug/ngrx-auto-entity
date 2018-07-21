import { createSelector, MemoizedSelector } from '@ngrx/store';
import { camelCase } from 'change-case';

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
      selectEntities: createSelector(getState, (state: TState) => state.entities),
      selectIds: createSelector(getState, (state: TState) => state.ids),
      selectTotal: createSelector(getState, (state: TState) => state.ids.length)
    },
    entityState: getState
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
      selectAll: createSelector(selectState, state => state.ids.map(id => state.entities[id])),
      selectEntities: createSelector(selectState, state => state.entities),
      selectIds: createSelector(selectState, state => state.ids),
      selectTotal: createSelector(selectState, state => state.ids.length)
    },
    entityState: selectState
  };
};
