import { createSelector, MemoizedSelector } from '@ngrx/store';
import { camelCase } from 'change-case';

export interface IEntityDictionary<TModel> {
  [key: string]: TModel;
}

export interface IEntityState<TModel> {
  entities: IEntityDictionary<TModel>;
  ids: any[];
}

export interface IModelState<TParentState, TState, TModel> {
  initialState: TState;
  selectors: ISelectorMap<TParentState, TModel>;
}

export interface ISelectorMap<TParentState, TModel> {
  selectIds: MemoizedSelector<object | TParentState, any[]>;
  selectEntities: MemoizedSelector<object | TParentState, IEntityDictionary<TModel>>;
  selectAll: MemoizedSelector<object | TParentState, TModel[]>;
  selectTotal: MemoizedSelector<object | TParentState, number>;
}

export interface ITModelClass<TModel> {
  new (): TModel;
}

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
    }
  };
};

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
    }
  };
};
