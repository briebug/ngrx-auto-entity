import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as changeCase from 'change-case';

export interface EntityDictionary<TModel> {
  [key: string]: TModel;
}

export interface EntityState<TModel> {
  entities: EntityDictionary<TModel>;
  ids: any[];
}

export interface ModelState<TParentState, TState, TModel> {
  initialState: TState;
  selectors: SelectorMap<TParentState, TModel>;
}

export interface SelectorMap<TParentState, TModel> {
  selectIds: MemoizedSelector<object | TParentState, any[]>;
  selectEntities: MemoizedSelector<object | TParentState, EntityDictionary<TModel>>;
  selectAll: MemoizedSelector<object | TParentState, TModel[]>;
  selectTotal: MemoizedSelector<object | TParentState, number>;
}

export interface TModelClass<TModel> {
  new (): TModel;
}

export const buildState = <TState extends EntityState<TModel>, TParentState, TModel>(
  type: TModelClass<TModel>,
  initialState?: any
): ModelState<TParentState, TState, TModel> => {
  const modelName = changeCase.camelCase(new type().constructor.name);

  const getState = (state: TParentState): TState => state[modelName];

  // This uses ES6/TS computed property names: http://es6-features.org/#ComputedPropertyNames
  return {
    initialState: <TState>{
      entities: {},
      ids: [],
      ...initialState
    },
    selectors: {
      selectAll: createSelector(getState, (state: TState): TModel[] => state.ids.map(id => state.entities[id])),
      selectEntities: createSelector(getState, (state: TState) => state.entities),
      selectIds: createSelector(getState, (state: TState) => state.ids),
      selectTotal: createSelector(getState, (state: TState) => state.ids.length)
    }
  };
};

export const buildFeatureState = <TState extends EntityState<TModel>, TParentState, TModel>(
  type: TModelClass<TModel>,
  selectParentState: MemoizedSelector<object, TParentState>,
  initialState?: any
): ModelState<TParentState, TState, TModel> => {
  const modelName = changeCase.camelCase(new type().constructor.name);

  const selectState = createSelector(selectParentState, (state: TParentState) => state[modelName]);

  // This uses ES6/TS computed property names: http://es6-features.org/#ComputedPropertyNames
  return {
    initialState: <TState>{
      [modelName]: {
        entities: {},
        ids: [],
        ...initialState
      }
    },
    selectors: {
      selectAll: createSelector(selectState, state => state.ids.map(id => state.entities[id])),
      selectEntities: createSelector(selectState, state => state.entities),
      selectIds: createSelector(selectState, state => state.ids),
      selectTotal: createSelector(selectState, state => state.ids.length)
    }
  };
};
