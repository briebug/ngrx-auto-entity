import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';
import { Page, Range } from '../models';
import { EntityIdentity, IEntityDictionary, IEntityState } from './entity-state';
import { ISelectorMap } from './selector-map';

export const buildSelectorMap = <TParentState, TState extends IEntityState<TModel>, TModel, TExtra>(
  getState: Selector<TParentState, TState & TExtra> | MemoizedSelector<object | TParentState, TState & TExtra>,
  compareFn?: (a, b) => number
): ISelectorMap<TParentState, TModel> =>
  ({
    selectAll: createSelector(
      getState,
      (state: TState & TExtra): TModel[] =>
        !state || !state.ids || !state.entities ? [] : state.ids.map(id => state.entities[id])
    ),
    selectAllSorted: createSelector(
      getState,
      (state: TState & TExtra): TModel[] =>
        (!state || !state.ids || !state.entities ? [] : state.ids.map(id => state.entities[id])).sort(compareFn)
    ),
    selectEntities: createSelector(
      getState,
      (state: TState & TExtra): IEntityDictionary<TModel> => (!state || !state.entities ? {} : state.entities)
    ),
    selectIds: createSelector(
      getState,
      (state: TState & TExtra): EntityIdentity[] => (!state || !state.ids ? [] : state.ids)
    ),
    selectTotal: createSelector(
      getState,
      (state: TState & TExtra): number => (!state || !state.ids ? 0 : state.ids.length)
    ),
    selectCurrentEntity: createSelector(
      getState,
      (state: TState & TExtra): TModel =>
        !state || !state.entities || !state.currentEntityKey ? null : state.entities[state.currentEntityKey]
    ),
    selectCurrentEntityKey: createSelector(
      getState,
      (state: TState & TExtra): EntityIdentity => (!state ? null : state.currentEntityKey)
    ),
    selectCurrentEntities: createSelector(
      getState,
      (state: TState & TExtra): TModel[] =>
        // prettier-ignore
        (!state || !state.currentEntitiesKeys || !state.entities)
          ? []
          : state.currentEntitiesKeys.map(key => state.entities[key])
    ),
    selectCurrentEntitiesKeys: createSelector(
      getState,
      (state: TState & TExtra): EntityIdentity[] =>
        // prettier-ignore
        (!state || !state.currentEntitiesKeys) ? [] : state.currentEntitiesKeys
    ),
    selectEditedEntity: createSelector(
      getState,
      (state: TState & TExtra): Partial<TModel> => (!state ? null : state.editedEntity)
    ),
    selectIsDirty: createSelector(
      getState,
      (state: TState & TExtra): boolean => (!state ? false : !!state.isDirty)
    ),
    selectCurrentPage: createSelector(
      getState,
      (state: TState & TExtra): Page => (!state ? null : state.currentPage)
    ),
    selectCurrentRange: createSelector(
      getState,
      (state: TState & TExtra): Range => (!state ? null : state.currentRange)
    ),
    selectTotalPageable: createSelector(
      getState,
      (state: TState & TExtra): number => (!state ? 0 : state.totalPageableCount)
    ),
    selectIsLoading: createSelector(
      getState,
      (state: TState & TExtra): boolean => (!state ? false : !!state.isLoading)
    ),
    selectIsSaving: createSelector(
      getState,
      (state: TState & TExtra): boolean => (!state ? false : !!state.isSaving)
    ),
    selectIsDeleting: createSelector(
      getState,
      (state: TState & TExtra): boolean => (!state ? false : !!state.isDeleting)
    ),
    selectLoadedAt: createSelector(
      getState,
      (state: TState & TExtra): Date => (!state ? null : state.loadedAt)
    ),
    selectSavedAt: createSelector(
      getState,
      (state: TState & TExtra): Date => (!state ? null : state.savedAt)
    ),
    selectCreatedAt: createSelector(
      getState,
      (state: TState & TExtra): Date => (!state ? null : state.createdAt)
    ),
    selectDeletedAt: createSelector(
      getState,
      (state: TState & TExtra): Date => (!state ? null : state.deletedAt)
    )
  } as ISelectorMap<TParentState, TModel>);
