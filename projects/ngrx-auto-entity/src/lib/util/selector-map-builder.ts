import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';
import { Page, Range } from '../models';
import { EntityIdentity, IEntityDictionary, IEntityState } from './entity-state';
import { ISelectorMap } from './selector-map';

// prettier-ignore
export const mapToEntityArray =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): TModel[] =>
    (!state || !state.ids || !state.entities ? [] : state.ids.map(id => state.entities[id]));

// prettier-ignore
export const mapToSortedEntityArray =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra, compare: (a, b) => number): TModel[] =>
    (!state || !state.ids || !state.entities ? [] : state.ids.map(id => state.entities[id])).sort(compare);

// prettier-ignore
export const mapToEntities =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): IEntityDictionary<TModel> =>
    (!state || !state.entities ? {} : state.entities);

// prettier-ignore
export const mapToIds =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): EntityIdentity[] =>
    (!state || !state.ids ? [] : state.ids);

// prettier-ignore
export const mapToTotal =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): number =>
    !state || !state.ids ? 0 : state.ids.length;

// prettier-ignore
export const mapToCurrentEntity =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): TModel | null =>
    !state || !state.entities || !state.currentEntityKey ? null : state.entities[state.currentEntityKey];

// prettier-ignore
export const mapToCurrentEntityKey =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): EntityIdentity | null =>
    (!state ? null : state.currentEntityKey);

// prettier-ignore
export const mapToCurrentEntities =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): TModel[] =>
    (!state || !state.currentEntitiesKeys || !state.entities)
      ? []
      : state.currentEntitiesKeys.map(key => state.entities[key]);

// prettier-ignore
export const mapToCurrentEntitiesKeys =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): EntityIdentity[] =>
    (!state || !state.currentEntitiesKeys) ? [] : state.currentEntitiesKeys;

// prettier-ignore
export const mapToEditedEntity =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): Partial<TModel> | null =>
    (!state ? null : state.editedEntity);

// prettier-ignore
export const mapToIsDirty =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): boolean =>
    (!state ? false : !!state.isDirty);

// prettier-ignore
export const mapToCurrentPage =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): Page | null =>
    (!state ? null : state.currentPage);

// prettier-ignore
export const mapToCurrentRange =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): Range | null =>
    (!state ? null : state.currentRange);

// prettier-ignore
export const mapToTotalPageable =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): number =>
    (!state ? 0 : state.totalPageableCount);

// prettier-ignore
export const mapToIsLoading =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): boolean =>
    (!state ? false : !!state.isLoading);

// prettier-ignore
export const mapToIsSaving =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): boolean =>
    (!state ? false : !!state.isSaving);

// prettier-ignore
export const mapToIsDeleting =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): boolean =>
    (!state ? false : !!state.isDeleting);

// prettier-ignore
export const mapToLoadedAt =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): Date | null =>
    (!state ? null : new Date(state.loadedAt));

// prettier-ignore
export const mapToSavedAt =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): Date | null =>
    (!state ? null : new Date(state.savedAt));

// prettier-ignore
export const mapToCreatedAt =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): Date | null =>
    (!state ? null : new Date(state.createdAt));

// prettier-ignore
export const mapToDeletedAt =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): Date | null =>
    (!state ? null : new Date(state.deletedAt));

// prettier-ignore
export const buildSelectorMap = <TParentState, TState extends IEntityState<TModel>, TModel, TExtra>(
  getState: Selector<TParentState, TState & TExtra> | MemoizedSelector<object | TParentState, TState & TExtra>,
  compareFn?: (a, b) => number
): ISelectorMap<TParentState, TModel> =>
  ({
    selectAll: createSelector(getState, mapToEntityArray),
    selectAllSorted: createSelector(getState, () => compareFn, mapToSortedEntityArray),
    selectEntities: createSelector(getState, mapToEntities),
    selectIds: createSelector(getState, mapToIds),
    selectTotal: createSelector(getState, mapToTotal),
    selectCurrentEntity: createSelector(getState, mapToCurrentEntity),
    selectCurrentEntityKey: createSelector(getState, mapToCurrentEntityKey),
    selectCurrentEntities: createSelector(getState, mapToCurrentEntities),
    selectCurrentEntitiesKeys: createSelector(getState, mapToCurrentEntitiesKeys),
    selectEditedEntity: createSelector(getState, mapToEditedEntity),
    selectIsDirty: createSelector(getState, mapToIsDirty),
    selectCurrentPage: createSelector(getState, mapToCurrentPage),
    selectCurrentRange: createSelector(getState, mapToCurrentRange),
    selectTotalPageable: createSelector(getState, mapToTotalPageable),
    selectIsLoading: createSelector(getState, mapToIsLoading),
    selectIsSaving: createSelector(getState, mapToIsSaving),
    selectIsDeleting: createSelector(getState, mapToIsDeleting),
    selectLoadedAt: createSelector(getState, mapToLoadedAt),
    selectSavedAt: createSelector(getState, mapToSavedAt),
    selectCreatedAt: createSelector(getState, mapToCreatedAt),
    selectDeletedAt: createSelector(getState, mapToDeletedAt)
  } as ISelectorMap<TParentState, TModel>);
