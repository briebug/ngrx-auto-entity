import { EntityIdentity } from '../types/entity-identity';
import { IEntityDictionary, IEntitySelections } from '../util/entity-state';

// prettier-ignore
export const mapToCurrentEntity =
  <TModel>(selections: IEntitySelections, entities: IEntityDictionary<TModel>): TModel | undefined =>
    !entities || !selections ? undefined : entities[selections.currentEntityKey];

// prettier-ignore
export const mapToCurrentEntityKey =
  (selections: IEntitySelections): EntityIdentity | undefined =>
    (!selections ? undefined : selections.currentEntityKey);

// prettier-ignore
export const mapToCurrentEntities =
  <TModel>(selections: IEntitySelections, entities: IEntityDictionary<TModel>): TModel[] =>
    (!selections || !selections.currentEntitiesKeys || !entities)
      ? []
      : selections.currentEntitiesKeys.reduce((all, key) => entities[key] ? [...all, entities[key]] : all, []);

// prettier-ignore
export const mapToCurrentEntitiesKeys =
  (selections: IEntitySelections): EntityIdentity[] =>
    (!selections || !selections.currentEntitiesKeys) ? [] : selections.currentEntitiesKeys;
