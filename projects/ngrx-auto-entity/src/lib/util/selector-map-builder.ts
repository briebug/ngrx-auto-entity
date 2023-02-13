import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';
import { mapToEditedEntity, mapToIsDirty } from '../selectors/edits.selectors';
import {
  mapToCustomSortedEntityArray,
  mapToEntityArray,
  mapToHasEntities,
  mapToHasNoEntities,
  mapToSortedEntityArray,
  mapToTotal
} from '../selectors/entity.selectors';
import { mapToCurrentPage, mapToCurrentRange, mapToTotalPageable } from '../selectors/paging.selectors';
import { mapToEdits, mapToEntities, mapToIds, mapToPaging, mapToSelections, mapToTracking } from '../selectors/root.selectors';
import {
  mapToCurrentEntities,
  mapToCurrentEntitiesKeys,
  mapToCurrentEntity,
  mapToCurrentEntityKey
} from '../selectors/selections.selectors';
import {
  mapToCreatedAt,
  mapToDeletedAt,
  mapToHasBeenLoaded,
  mapToIsDeleting,
  mapToIsLoading,
  mapToIsSaving,
  mapToLoadedAt,
  mapToLoadWasAttempted,
  mapToReplacedAt,
  mapToSavedAt,
  mapToUpdatedAt
} from '../selectors/tracking.selectors';
import { IEntityDictionary, IEntityEdits, IEntityPaging, IEntitySelections, IEntityState, IEntityTracking } from './entity-state';
import { IModelClass } from './model-state';
import { ISelectorMap } from './selector-map';

// prettier-ignore
export const buildSelectorMap = <TParentState, TState extends IEntityState<TModel>, TModel, TExtra>(
  getState: Selector<TParentState, TState & TExtra> | MemoizedSelector<object | TParentState, TState & TExtra>,
  type: IModelClass<TModel>,
): ISelectorMap<TParentState, TModel> => {
  class SelectorResolver implements ISelectorMap<TParentState, TModel> {
    // State Roots:
    get selectEntities() {
      return createSelector(getState, mapToEntities) as MemoizedSelector<object | TParentState, IEntityDictionary<TModel>>;
    }

    get selectIds() {
      return createSelector(getState, mapToIds);
    }

    get selectSelections() {
      return createSelector(getState, mapToSelections) as MemoizedSelector<object | TParentState, IEntitySelections>;
    }

    get selectEdits() {
      return createSelector(getState, mapToEdits) as MemoizedSelector<object | TParentState, IEntityEdits<TModel>>;
    }

    get selectPaging() {
      return createSelector(getState, mapToPaging) as MemoizedSelector<object | TParentState, IEntityPaging>;
    }

    get selectTracking() {
      return createSelector(getState, mapToTracking) as MemoizedSelector<object | TParentState, IEntityTracking>;
    }

    // Entity:
    get selectAll() {
      return createSelector(this.selectEntities, this.selectIds, mapToEntityArray);
    }

    get selectAllSorted() {
      return createSelector(this.selectAll, mapToSortedEntityArray(type));
    }

    get selectCustomSorted() {
      return createSelector(this.selectAll, mapToCustomSortedEntityArray(type));
    }

    get selectTotal() {
      return createSelector(this.selectIds, mapToTotal);
    }

    get selectHasEntities() {
      return createSelector(this.selectIds, mapToHasEntities);
    }

    get selectHasNoEntities() {
      return createSelector(this.selectIds, mapToHasNoEntities);
    }

    // Selections:
    get selectCurrentEntity() {
      return createSelector(
        this.selectSelections,
        this.selectEntities,
        mapToCurrentEntity
      ) as MemoizedSelector<object | TParentState, TModel | null>;
    }

    get selectCurrentEntityKey() {
      return createSelector(this.selectSelections, mapToCurrentEntityKey);
    }

    get selectCurrentEntities() {
      return createSelector(
        this.selectSelections,
        this.selectEntities,
        mapToCurrentEntities
      ) as MemoizedSelector<object | TParentState, TModel[]>;
    }

    get selectCurrentEntitiesKeys() {
      return createSelector(this.selectSelections, mapToCurrentEntitiesKeys);
    }

    // Edits:
    get selectEditedEntity() {
      return createSelector(this.selectEdits, mapToEditedEntity);
    }

    get selectIsDirty() {
      return createSelector(this.selectEdits, mapToIsDirty);
    }

    // Paging:
    get selectCurrentPage() {
      return createSelector(this.selectPaging, mapToCurrentPage);
    }

    get selectCurrentRange() {
      return createSelector(this.selectPaging, mapToCurrentRange);
    }

    get selectTotalPageable() {
      return createSelector(this.selectPaging, mapToTotalPageable);
    }

    // Tracking:
    get selectHasBeenLoaded() {
      return createSelector(this.selectTracking, mapToHasBeenLoaded);
    }

    get selectLoadWasAttempted() {
      return createSelector(this.selectTracking, mapToLoadWasAttempted);
    }

    get selectIsLoading() {
      return createSelector(this.selectTracking, mapToIsLoading);
    }

    get selectIsSaving() {
      return createSelector(this.selectTracking, mapToIsSaving);
    }

    get selectIsDeleting() {
      return createSelector(this.selectTracking, mapToIsDeleting);
    }

    get selectLoadedAt() {
      return createSelector(this.selectTracking, mapToLoadedAt);
    }

    get selectSavedAt() {
      return createSelector(this.selectTracking, mapToSavedAt);
    }

    get selectCreatedAt() {
      return createSelector(this.selectTracking, mapToCreatedAt);
    }

    get selectUpdatedAt() {
      return createSelector(this.selectTracking, mapToUpdatedAt);
    }

    get selectReplacedAt() {
      return createSelector(this.selectTracking, mapToReplacedAt);
    }

    get selectDeletedAt() {
      return createSelector(this.selectTracking, mapToDeletedAt);
    }
  }

  const resolver = new SelectorResolver();
  return resolver;
};
