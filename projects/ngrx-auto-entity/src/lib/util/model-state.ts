import { MemoizedSelector, Store } from '@ngrx/store';
import { IEntityState } from './entity-state';
import { IEntityFacade } from './facade';

import { ISelectorMap } from './selector-map';

/**
 * Structure of the model state built by the buildState() function
 */
export interface IModelState<TParentState, TState, TModel, TExtra> {
  initialState: TState & TExtra;
  selectors: ISelectorMap<TParentState, TModel>;
  reducer: (state: TState & TExtra) => IEntityState<TModel> & TExtra;
  facade: new (type: new () => TModel, store: Store<any>) => IEntityFacade<TModel>;
  entityState: ((state: TParentState) => TState & TExtra) | (MemoizedSelector<object, any>);
  makeEntity: (obj: any) => TModel;
}

/**
 * The basic structure of a class for an entity
 */
export type IModelClass<TModel> = new () => TModel;
