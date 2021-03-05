import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';
import {
  mapToCreatedAt,
  mapToCurrentEntities,
  mapToCurrentEntitiesKeys,
  mapToCurrentEntity,
  mapToCurrentEntityKey,
  mapToCurrentPage,
  mapToCurrentRange,
  mapToCustomSortedEntityArray,
  mapToDeletedAt,
  mapToEditedEntity,
  mapToEntities,
  mapToEntityArray,
  mapToHasEntities,
  mapToHasNoEntities,
  mapToIds,
  mapToIsDeleting,
  mapToIsDirty,
  mapToIsLoading,
  mapToIsSaving,
  mapToLoadedAt,
  mapToReplacedAt,
  mapToSavedAt,
  mapToSortedEntityArray,
  mapToTotal,
  mapToTotalPageable,
  mapToUpdatedAt
} from '../selectors/selectors';
import { IEntityDictionary, IEntityState } from './entity-state';
import { ISelectorMap } from './selector-map';

// prettier-ignore
export const buildSelectorMap = <TParentState, TState extends IEntityState<TModel>, TModel, TExtra>(
  getState: Selector<TParentState, TState & TExtra> | MemoizedSelector<object | TParentState, TState & TExtra>
): ISelectorMap<TParentState, TModel> => {
  class SelectorResolver implements ISelectorMap<TParentState, TModel> {
    get selectAll() {
      return createSelector(this.selectEntities, this.selectIds, mapToEntityArray);
    }

    get selectAllSorted() {
      return createSelector(this.selectAll, mapToSortedEntityArray);
    }

    get selectCustomSorted() {
      return createSelector(this.selectAll, mapToCustomSortedEntityArray);
    }

    get selectEntities() {
      return createSelector(getState, mapToEntities) as MemoizedSelector<object | TParentState, IEntityDictionary<TModel>>;
    }

    get selectIds() {
      return createSelector(getState, mapToIds);
    }

    get selectTotal() {
      return createSelector(getState, mapToTotal);
    }

    get selectHasEntities() {
      return createSelector(getState, mapToHasEntities);
    }

    get selectHasNoEntities() {
      return createSelector(getState, mapToHasNoEntities);
    }

    get selectCurrentEntity() {
      return createSelector(getState, mapToCurrentEntity) as MemoizedSelector<object | TParentState, TModel | null>;
    }

    get selectCurrentEntityKey() {
      return createSelector(getState, mapToCurrentEntityKey);
    }

    get selectCurrentEntities() {
      return createSelector(getState, mapToCurrentEntities) as MemoizedSelector<object | TParentState, TModel[]>;
    }

    get selectCurrentEntitiesKeys() {
      return createSelector(getState, mapToCurrentEntitiesKeys);
    }

    get selectEditedEntity() {
      return createSelector(getState, mapToEditedEntity);
    }

    get selectIsDirty() {
      return createSelector(getState, mapToIsDirty);
    }

    get selectCurrentPage() {
      return createSelector(getState, mapToCurrentPage);
    }

    get selectCurrentRange() {
      return createSelector(getState, mapToCurrentRange);
    }

    get selectTotalPageable() {
      return createSelector(getState, mapToTotalPageable);
    }

    get selectIsLoading() {
      return createSelector(getState, mapToIsLoading);
    }

    get selectIsSaving() {
      return createSelector(getState, mapToIsSaving);
    }

    get selectIsDeleting() {
      return createSelector(getState, mapToIsDeleting);
    }

    get selectLoadedAt() {
      return createSelector(getState, mapToLoadedAt);
    }

    get selectSavedAt() {
      return createSelector(getState, mapToSavedAt);
    }

    get selectCreatedAt() {
      return createSelector(getState, mapToCreatedAt);
    }

    get selectUpdatedAt() {
      return createSelector(getState, mapToUpdatedAt);
    }

    get selectReplacedAt() {
      return createSelector(getState, mapToReplacedAt);
    }

    get selectDeletedAt() {
      return createSelector(getState, mapToDeletedAt);
    }
  }

  const resolver = new SelectorResolver();
  return resolver;
};
