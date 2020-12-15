import { MemoizedSelector } from '@ngrx/store';
import { Page, Range } from '../models';
import { EntityIdentity } from '../types/entity-identity';
import { IEntityDictionary } from './entity-state';

/**
 * Structure of a Selector Map defining all the selectors that may
 * be used to retrieve state managed by Auto-Entity
 */
export interface ISelectorMap<TParentState, TModel> {
  selectIds: MemoizedSelector<object | TParentState, EntityIdentity[]>;
  selectEntities: MemoizedSelector<object | TParentState, IEntityDictionary<TModel>>;
  selectAll: MemoizedSelector<object | TParentState, TModel[]>;
  selectAllSorted: MemoizedSelector<object | TParentState, TModel[]>;
  selectCustomSorted: MemoizedSelector<object | TParentState, TModel[]>;
  selectTotal: MemoizedSelector<object | TParentState, number>;
  selectHasEntities: MemoizedSelector<object | TParentState, boolean>;
  selectHasNoEntities: MemoizedSelector<object | TParentState, boolean>;
  selectCurrentEntity: MemoizedSelector<object | TParentState, TModel | null>;
  selectCurrentEntityKey: MemoizedSelector<object | TParentState, EntityIdentity | null>;
  selectCurrentEntities: MemoizedSelector<object | TParentState, TModel[]>;
  selectCurrentEntitiesKeys: MemoizedSelector<object | TParentState, EntityIdentity[]>;
  selectEditedEntity: MemoizedSelector<object | TParentState, Partial<TModel> | null>;
  selectIsDirty: MemoizedSelector<object | TParentState, boolean>;
  selectCurrentPage: MemoizedSelector<object | TParentState, Page | null>;
  selectCurrentRange: MemoizedSelector<object | TParentState, Range | null>;
  selectTotalPageable: MemoizedSelector<object | TParentState, number>;
  selectIsLoading: MemoizedSelector<object | TParentState, boolean>;
  selectIsSaving: MemoizedSelector<object | TParentState, boolean>;
  selectIsDeleting: MemoizedSelector<object | TParentState, boolean>;
  selectLoadedAt: MemoizedSelector<object | TParentState, Date | null>;
  selectSavedAt: MemoizedSelector<object | TParentState, Date | null>;
  selectCreatedAt: MemoizedSelector<object | TParentState, Date | null>;
  selectUpdatedAt: MemoizedSelector<object | TParentState, Date | null>;
  selectReplacedAt: MemoizedSelector<object | TParentState, Date | null>;
  selectDeletedAt: MemoizedSelector<object | TParentState, Date | null>;
}
