import { EntityIdentity } from '../types/entity-identity';
import { IEntityDictionary, IEntityEdits, IEntityPaging, IEntitySelections, IEntityState, IEntityTracking } from '../util/entity-state';

// prettier-ignore
export const mapToEntities =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): IEntityDictionary<TModel> =>
    (!state || !state.entities ? {} as IEntityDictionary<TModel> : state.entities);

// prettier-ignore
export const mapToIds =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): EntityIdentity[] =>
    (!state || !state.ids ? [] : state.ids);

// prettier-ignore
export const mapToSelections =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): IEntitySelections =>
    (!state || !state.selections ? undefined : state.selections);

// prettier-ignore
export const mapToEdits =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): IEntityEdits<TModel> =>
    (!state || !state.edits ? undefined : state.edits);

// prettier-ignore
export const mapToPaging =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): IEntityPaging =>
    (!state || !state.paging ? undefined : state.paging);

// prettier-ignore
export const mapToTracking =
  <TState extends IEntityState<TModel>, TModel, TExtra>(state: TState & TExtra): IEntityTracking =>
    (!state || !state.tracking ? undefined : state.tracking);
