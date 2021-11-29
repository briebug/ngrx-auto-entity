import { MemoizedSelector, Store } from '@ngrx/store';
import { IActionMap } from './action-map';
import { IEntityState } from './entity-state';
import { IEntityFacade } from './facade';

import { ISelectorMap } from './selector-map';

/**
 * Structure of the model state built by the buildState() function
 */
export interface IModelState<TParentState, TState, TModel, TExtra> {
  initialState: TState & TExtra;
  actions: IActionMap<TModel>;
  selectors: ISelectorMap<TParentState, TModel>;
  reducer: (state: TState & TExtra) => IEntityState<TModel> & TExtra;
  facade: new (store: Store<any>) => IEntityFacade<TModel>;
  entityState: ((state: TParentState) => TState & TExtra) | MemoizedSelector<TParentState, TState & TExtra>;
  makeEntity: (obj: any) => TModel;
}

/**
 * The basic structure of a class for an entity
 */
export type IModelClass<TModel> = new () => TModel;
