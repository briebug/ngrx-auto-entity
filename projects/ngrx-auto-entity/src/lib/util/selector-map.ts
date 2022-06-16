import { MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
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
  /**
   * @deprecated selectCustomSorted relies on selectors with props, which has fallen out of practice. Will be removed
   * in the next version of auto-entity.
   */
  selectCustomSorted: MemoizedSelectorWithProps<object | TParentState, { readonly name?: any }, TModel[]>;
  selectTotal: MemoizedSelector<object | TParentState, number>;
  selectHasEntities: MemoizedSelector<object | TParentState, boolean>;
  selectHasNoEntities: MemoizedSelector<object | TParentState, boolean>;
  selectCurrentEntity: MemoizedSelector<object | TParentState, TModel | undefined>;
  selectCurrentEntityKey: MemoizedSelector<object | TParentState, EntityIdentity | undefined>;
  selectCurrentEntities: MemoizedSelector<object | TParentState, TModel[]>;
  selectCurrentEntitiesKeys: MemoizedSelector<object | TParentState, EntityIdentity[]>;
  selectEditedEntity: MemoizedSelector<object | TParentState, Partial<TModel> | undefined>;
  selectIsDirty: MemoizedSelector<object | TParentState, boolean>;
  selectCurrentPage: MemoizedSelector<object | TParentState, Page | undefined>;
  selectCurrentRange: MemoizedSelector<object | TParentState, Range | undefined>;
  selectTotalPageable: MemoizedSelector<object | TParentState, number>;
  selectHasBeenLoaded: MemoizedSelector<object | TParentState, boolean>;
  selectLoadWasAttempted: MemoizedSelector<object | TParentState, boolean>;
  selectIsLoading: MemoizedSelector<object | TParentState, boolean>;
  selectIsSaving: MemoizedSelector<object | TParentState, boolean>;
  selectIsDeleting: MemoizedSelector<object | TParentState, boolean>;
  selectLoadedAt: MemoizedSelector<object | TParentState, Date | undefined>;
  selectSavedAt: MemoizedSelector<object | TParentState, Date | undefined>;
  selectCreatedAt: MemoizedSelector<object | TParentState, Date | undefined>;
  selectUpdatedAt: MemoizedSelector<object | TParentState, Date | undefined>;
  selectReplacedAt: MemoizedSelector<object | TParentState, Date | undefined>;
  selectDeletedAt: MemoizedSelector<object | TParentState, Date | undefined>;
}
