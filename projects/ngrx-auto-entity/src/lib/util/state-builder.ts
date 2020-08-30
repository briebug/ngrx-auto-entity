import { createSelector, MemoizedSelector } from '@ngrx/store';

import { camelCase } from '../../util/case';
import { IEntityOptions } from '../decorators/entity-options';
import { ENTITY_OPTS_PROP, NAE_KEY_NAMES, NAE_KEYS } from '../decorators/entity-tokens';
import { EntityIdentity } from '../types/entity-identity';
import { IEntityState } from './entity-state';
import { buildFacade } from './facade-builder';
import { makeEntity } from './make-entity';
import { IModelClass, IModelState } from './model-state';
import { buildSelectorMap } from './selector-map-builder';
import { FEATURE_AFFINITY } from './util-tokens';

const sortAlpha = (aKey: string, bKey: string): number => aKey.localeCompare(bKey);

const sortNumeric = (aKey: number, bKey: number): number => aKey - bKey;

const defaultSort = (aKey: EntityIdentity, bKey: EntityIdentity): number =>
  typeof aKey === 'string' ? sortAlpha(aKey, bKey as string) : sortNumeric(aKey, bKey as number);

export const NO_ENTITY_DECORATOR_MSG =
  'Specified model is not decorated with @Entity. All automatic entities must be decorated with a modelName specified. Building of state aborted!';
const ensureEntityDecorator = <TModel>(type: IModelClass<TModel>): void => {
  if (!type[ENTITY_OPTS_PROP]) {
    const example = ` Example model with proper decoration:

@Entity({modelName: 'Test'})
export class Test {
  @Key yourKey: number | string;
  // ... other properties ...
}`;
    console.error('[NGRX-AE] ! ' + NO_ENTITY_DECORATOR_MSG + example);
    throw new Error(NO_ENTITY_DECORATOR_MSG);
  }
};

export const NO_ENTITY_KEY_MSG =
  'Specified model has no properties decorated with @Key. All automatic entities must have at least one property identified as the entity key. Building of state aborted!';
const ensureEntityKey = <TModel>(type: IModelClass<TModel>): void => {
  if (!type.prototype[NAE_KEY_NAMES] || !type.prototype[NAE_KEYS]) {
    const example = ` Example model with proper decoration:

@Entity({modelName: '${type[ENTITY_OPTS_PROP].modelName}'})
export class ${type[ENTITY_OPTS_PROP].modelName} {
  @Key yourKey: number | string;
  // ... other properties ...
}`;
    console.error('[NGRX-AE] ! ' + NO_ENTITY_KEY_MSG + example);
    throw new Error(NO_ENTITY_KEY_MSG);
  }
};

export const NO_MODEL_NAME_MSG =
  'Specified model is decorated with @Entity but does not specify a modelName, which is required for proper production execution. Building of state aborted!';
const ensureModelName = (opts: IEntityOptions) => {
  if (!opts.modelName) {
    const example = ` Example model with proper decoration:

@Entity({modelName: 'Test'})
export class Test {
  @Key yourKey: number | string;
  // ... other properties ...
}`;
    console.error('[NGRX-AE] ! ' + NO_MODEL_NAME_MSG + example);
    throw new Error(NO_MODEL_NAME_MSG);
  }
};

/**
 * Builds the initial Ngrx state for an entity
 *
 * @param type - the entity class
 * @param extraInitialState - the (optional) initial state
 */
export const buildState = <TState extends IEntityState<TModel>, TParentState extends any, TModel, TExtra>(
  type: IModelClass<TModel>,
  extraInitialState?: TExtra
): IModelState<TParentState, TState, TModel, TExtra> => {
  ensureEntityDecorator(type);
  ensureEntityKey(type);

  const opts = type[ENTITY_OPTS_PROP];
  ensureModelName(opts);

  const modelName = camelCase(opts.modelName);

  const getState = (state: TParentState): TState & TExtra => {
    const modelState = state[modelName];
    if (!modelState) {
      const message = `State for model ${opts.modelName} could not be found! Make sure you add your entity state to the parent state with a property named exactly '${modelName}'.`;
      const example = ` Example app state:

export interface AppState {
  // ... other states ...
  ${modelName}: IEntityState<${opts.modelName}>,
  // ... other states ...
}`;
      console.error('[NGRX-AE] ! ' + message + example);
      throw new Error(message);
    }
    return modelState;
  };

  const initialState = {
    entities: {},
    ids: [],
    ...extraInitialState
  } as TState & TExtra;

  const selectors = buildSelectorMap<TParentState, TState, TModel, TExtra>(getState);
  const facade = buildFacade<TModel, TParentState>(selectors);
  const reducer = (state = initialState): IEntityState<TModel> & TExtra => {
    return state;
  };

  const entityState = getState as (state: TParentState) => TState & TExtra;

  return {
    initialState,
    selectors,
    reducer,
    facade,
    entityState,
    makeEntity: makeEntity(type)
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
export const buildFeatureState = <TState extends IEntityState<TModel>, TParentState extends any, TModel, TExtra>(
  type: IModelClass<TModel>,
  featureStateName: NonNullable<string>,
  selectParentState: MemoizedSelector<object, TParentState>,
  extraInitialState?: TExtra
): IModelState<TParentState, TState, TModel, TExtra> => {
  ensureEntityDecorator(type);
  ensureEntityKey(type);

  const opts = type[ENTITY_OPTS_PROP];
  ensureModelName(opts);

  const modelName = camelCase(opts.modelName);

  (type as any)[FEATURE_AFFINITY] = featureStateName;

  const selectState = createSelector(
    selectParentState,
    (state: TParentState) => {
      if (!state) {
        const message = `Could not retrieve feature state ${featureStateName} for model ${opts.modelName}! Make sure you add your entity state to the feature state with a property named exactly '${modelName}'.`;
        const example = ` Example app state:

export interface FeatureState {
  // ... other states ...
  ${modelName}: IEntityState<${opts.modelName}>,
  // ... other states ...
}`;
        console.error('[NGRX-AE] ! ' + message + example);
        throw new Error(message);
      }
      const modelState = state[modelName];
      if (!modelState) {
        const message = `State for model ${modelName} in feature ${featureStateName} could not be found!`;
        console.error('[NGRX-AE] ! ' + message);
        throw new Error(message);
      }
      return modelState;
    }
  );

  const initialState = {
    entities: {},
    ids: [],
    ...extraInitialState
  } as TState & TExtra;

  const selectors = buildSelectorMap<TParentState, TState, TModel, TExtra>(selectState);
  const facade = buildFacade<TModel, TParentState>(selectors);
  const reducer = (state = initialState): IEntityState<TModel> & TExtra => {
    return state;
  };

  const entityState = selectState as MemoizedSelector<object, any>;

  return {
    initialState,
    selectors,
    reducer,
    facade,
    entityState,
    makeEntity: makeEntity(type)
  };
};
