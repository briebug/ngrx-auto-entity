import { MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { Page, Range } from '../models';
import { EntityIdentity } from '../types/entity-identity';
import { IEntityDictionary } from './entity-state';

/**
 * Structure of a Selector Map defining all the selectors that may
 * be used to retrieve state managed by Auto-Entity
 */
export interface ISelectorMap<TParentState, TModel> {
  selectIds: MemoizedSelector<TParentState, EntityIdentity[]>;
  selectEntities: MemoizedSelector<TParentState, IEntityDictionary<TModel>>;
  selectAll: MemoizedSelector<TParentState, TModel[]>;
  selectAllSorted: MemoizedSelector<TParentState, TModel[]>;
  selectTotal: MemoizedSelector<TParentState, number>;
  selectHasEntities: MemoizedSelector<TParentState, boolean>;
  selectHasNoEntities: MemoizedSelector<TParentState, boolean>;
  selectCurrentEntity: MemoizedSelector<TParentState, TModel | undefined>;
  selectCurrentEntityKey: MemoizedSelector<TParentState, EntityIdentity | undefined>;
  selectCurrentEntities: MemoizedSelector<TParentState, TModel[]>;
  selectCurrentEntitiesKeys: MemoizedSelector<TParentState, EntityIdentity[]>;
  selectEditedEntity: MemoizedSelector<TParentState, Partial<TModel> | undefined>;
  selectIsDirty: MemoizedSelector<TParentState, boolean>;
  selectCurrentPage: MemoizedSelector<TParentState, Page | undefined>;
  selectCurrentRange: MemoizedSelector<TParentState, Range | undefined>;
  selectTotalPageable: MemoizedSelector<TParentState, number>;
  selectHasBeenLoaded: MemoizedSelector<TParentState, boolean>;
  selectLoadWasAttempted: MemoizedSelector<TParentState, boolean>;
  selectIsLoading: MemoizedSelector<TParentState, boolean>;
  selectIsSaving: MemoizedSelector<TParentState, boolean>;
  selectIsDeleting: MemoizedSelector<TParentState, boolean>;
  selectLoadedAt: MemoizedSelector<TParentState, Date | undefined>;
  selectSavedAt: MemoizedSelector<TParentState, Date | undefined>;
  selectCreatedAt: MemoizedSelector<TParentState, Date | undefined>;
  selectUpdatedAt: MemoizedSelector<TParentState, Date | undefined>;
  selectReplacedAt: MemoizedSelector<TParentState, Date | undefined>;
  selectDeletedAt: MemoizedSelector<TParentState, Date | undefined>;
}
