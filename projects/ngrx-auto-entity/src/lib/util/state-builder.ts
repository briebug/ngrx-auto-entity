import { createSelector, MemoizedSelector } from '@ngrx/store';

import { camelCase } from '../../util/case';
import { ENTITY_OPTS_PROP } from '../decorators/entity-tokens';
import { IEntityState } from './entity-state';
import { buildFacade } from './facade-builder';
import { IModelClass, IModelState } from './model-state';
import { buildSelectorMap } from './selector-map-builder';
import { FEATURE_AFFINITY } from './util-tokens';

/**
 * Builds the initial Ngrx state for an entity
 *
 * @param type - the entity class
 * @param extraInitialState - the (optional) initial state
 */
export const buildState = <TState extends IEntityState<TModel>, TParentState, TModel, TExtra>(
  type: IModelClass<TModel>,
  extraInitialState?: TExtra
): IModelState<TParentState, TState, TModel, TExtra> => {
  const instance = new type();
  const opts = type[ENTITY_OPTS_PROP] || {
    modelName: instance.constructor.name,
    comparer: () => 0
  };
  const modelName = camelCase(opts.modelName);

  const getState = (state: TParentState): TState & TExtra => {
    const modelState = state[modelName];
    if (!modelState) {
      console.error(`NGRX-AE: State for model ${modelName} could not be found!`);
      throw new Error(`State could not be found for model ${modelName}!`);
    }
    return modelState;
  };

  // This uses ES6/TS computed property names: http://es6-features.org/#ComputedPropertyNames

  const initialState = {
    entities: {},
    ids: [],
    ...extraInitialState
  } as TState & TExtra;

  const selectors = buildSelectorMap<TParentState, TState, TModel, TExtra>(getState, opts.comparer);
  const facade = buildFacade<TModel, TParentState>(selectors);
  const reducer = (state = initialState): IEntityState<TModel> & TExtra => {
    // tslint:disable-line
    return state;
  };

  const entityState = getState as (state: TParentState) => TState & TExtra;

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
 * @param featureStateName the name of the feature state
 * @param selectParentState a selector for the entity's parent state
 * @param extraInitialState the (optional) initial feature state
 */
export const buildFeatureState = <TState extends IEntityState<TModel>, TParentState, TModel, TExtra>(
  type: IModelClass<TModel>,
  featureStateName: NonNullable<string>,
  selectParentState: MemoizedSelector<object, TParentState>,
  extraInitialState?: TExtra
): IModelState<TParentState, TState, TModel, TExtra> => {
  const instance = new type();
  const opts = type[ENTITY_OPTS_PROP] || {
    modelName: instance.constructor.name
  };
  const modelName = camelCase(opts.modelName);

  (type as any)[FEATURE_AFFINITY] = featureStateName;

  const selectState = createSelector(
    selectParentState,
    (state: TParentState) => {
      if (!state) {
        console.error(`NGRX-AE: Could not retrieve feature state ${featureStateName} for model ${modelName}!`);
      }
      const modelState = state[modelName];
      if (!modelState) {
        console.error(`NGRX-AE: State for model ${modelName} in feature ${featureStateName} could not be found!`);
        throw new Error(`State could not be found for model ${modelName} in feature ${featureStateName}!`);
      }
      return modelState;
    }
  );

  // This uses ES6/TS computed property names: http://es6-features.org/#ComputedPropertyNames

  const initialState = {
    entities: {},
    ids: [],
    ...extraInitialState
  } as TState & TExtra;

  const selectors = buildSelectorMap<TParentState, TState, TModel, TExtra>(selectState);
  const facade = buildFacade<TModel, TParentState>(selectors);
  const reducer = (state = initialState): IEntityState<TModel> & TExtra => {
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
