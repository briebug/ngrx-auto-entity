import { MemoizedSelector } from '@ngrx/store';
import { Page, Range } from '../models';
import { EntityIdentity, IEntityDictionary } from './entity-state';

/**
 * Structure of a Selector Map defining all the selectors that may
 * be used to retrieve state managed by Auto-Entity
 */
export interface ISelectorMap<TParentState, TModel> {
  selectIds: MemoizedSelector<object | TParentState, EntityIdentity[]>;
  selectEntities: MemoizedSelector<object | TParentState, IEntityDictionary<TModel>>;
  selectAll: MemoizedSelector<object | TParentState, TModel[]>;
  selectAllSorted: MemoizedSelector<object | TParentState, TModel[]>;
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
