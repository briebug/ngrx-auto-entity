import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';
import { entityComparer } from '../decorators/entity-util';
import { Page, Range } from '../models';
import { EntityIdentity } from '../types/entity-identity';
import { IEntityDictionary, IEntityState } from './entity-state';
import { ISelectorMap } from './selector-map';

// prettier-ignore
export const mapToEntityArray =
  <TModel>(entities: IEntityDictionary<TModel>, ids: EntityIdentity[]): TModel[] =>
    (!ids || !entities ? [] : ids.map(id => entities[id]));

// prettier-ignore
export const mapToSortedEntityArray =
  <TModel>(all: TModel[]): TModel[] =>
    !all ? [] : all.sort(entityComparer(all));

// prettier-ignore
export const mapToCustomSortedEntityArray =
  <TModel>(all: TModel[], { name }): TModel[] =>
    !all ? [] : all.sort(entityComparer(all, name));

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
    (!state || !state.loadedAt ? null : new Date(state.loadedAt));

// prettier-ignore
export const mapToSavedAt =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): Date | null =>
    (!state || !state.savedAt ? null : new Date(state.savedAt));

// prettier-ignore
export const mapToCreatedAt =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): Date | null =>
    (!state || !state.createdAt ? null : new Date(state.createdAt));

// prettier-ignore
export const mapToDeletedAt =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): Date | null =>
    (!state || !state.deletedAt ? null : new Date(state.deletedAt));

// prettier-ignore
export const buildSelectorMap = <TParentState, TState extends IEntityState<TModel>, TModel, TExtra>(
  getState: Selector<TParentState, TState & TExtra> | MemoizedSelector<object | TParentState, TState & TExtra>
): ISelectorMap<TParentState, TModel> => {
  const selectEntities = createSelector(getState, mapToEntities);
  const selectIds = createSelector(getState, mapToIds);
  const selectTotal = createSelector(getState, mapToTotal);
  const selectAll = createSelector(selectEntities, selectIds, mapToEntityArray);
  const selectAllSorted = createSelector(selectAll, mapToSortedEntityArray);
  const selectCustomSorted = createSelector(selectAll, mapToCustomSortedEntityArray);
  const selectCurrentEntity = createSelector(getState, mapToCurrentEntity);
  const selectCurrentEntityKey = createSelector(getState, mapToCurrentEntityKey);
  const selectCurrentEntities = createSelector(getState, mapToCurrentEntities);
  const selectCurrentEntitiesKeys = createSelector(getState, mapToCurrentEntitiesKeys);
  const selectEditedEntity = createSelector(getState, mapToEditedEntity);
  const selectIsDirty = createSelector(getState, mapToIsDirty);
  const selectCurrentPage = createSelector(getState, mapToCurrentPage);
  const selectCurrentRange = createSelector(getState, mapToCurrentRange);
  const selectTotalPageable = createSelector(getState, mapToTotalPageable);
  const selectIsLoading = createSelector(getState, mapToIsLoading);
  const selectIsSaving = createSelector(getState, mapToIsSaving);
  const selectIsDeleting = createSelector(getState, mapToIsDeleting);
  const selectLoadedAt = createSelector(getState, mapToLoadedAt);
  const selectSavedAt = createSelector(getState, mapToSavedAt);
  const selectCreatedAt = createSelector(getState, mapToCreatedAt);
  const selectDeletedAt = createSelector(getState, mapToDeletedAt);

  return {
    selectAll,
    selectAllSorted,
    selectCustomSorted,
    selectEntities,
    selectIds,
    selectTotal,
    selectCurrentEntity,
    selectCurrentEntityKey,
    selectCurrentEntities,
    selectCurrentEntitiesKeys,
    selectEditedEntity,
    selectIsDirty,
    selectCurrentPage,
    selectCurrentRange,
    selectTotalPageable,
    selectIsLoading,
    selectIsSaving,
    selectIsDeleting,
    selectLoadedAt,
    selectSavedAt,
    selectCreatedAt,
    selectDeletedAt
  } as ISelectorMap<TParentState, TModel>;
};
