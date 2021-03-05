import { entityComparer } from '../decorators/entity-util';
import { Page, Range } from '../models';
import { EntityIdentity } from '../types/entity-identity';
import { IEntityDictionary, IEntityState } from '../util/entity-state';

export const mapToEntityArray = <TModel>(entities: IEntityDictionary<TModel>, ids: EntityIdentity[]): TModel[] =>
  !ids || !entities ? [] : ids.map(id => entities[id]);

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
    (!state || !state.entities ? {} as IEntityDictionary<TModel> : state.entities);

// prettier-ignore
export const mapToIds =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): EntityIdentity[] =>
    (!state || !state.ids ? [] : state.ids);

// prettier-ignore
export const mapToTotal =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): number =>
    !state || !state.ids ? 0 : state.ids.length;

// prettier-ignore
export const mapToHasEntities =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): boolean =>
    !state || !state.ids ? false : !!state.ids.length;

// prettier-ignore
export const mapToHasNoEntities =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): boolean =>
    !state || !state.ids ? true : !state.ids.length;

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
export const mapToUpdatedAt =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): Date | null =>
    (!state || !state.updatedAt ? null : new Date(state.updatedAt));

// prettier-ignore
export const mapToReplacedAt =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): Date | null =>
    (!state || !state.replacedAt ? null : new Date(state.replacedAt));

// prettier-ignore
export const mapToDeletedAt =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): Date | null =>
    (!state || !state.deletedAt ? null : new Date(state.deletedAt));
