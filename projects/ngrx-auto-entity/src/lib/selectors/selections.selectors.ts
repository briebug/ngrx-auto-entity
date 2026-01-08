import { EntityIdentity } from '../types/entity-identity';
import { IEntityDictionary, IEntitySelections } from '../util/entity-state';

// prettier-ignore
export const mapToCurrentEntity =
  <TModel>(selections: IEntitySelections | undefined, entities: IEntityDictionary<TModel> | undefined): TModel | undefined =>
    !entities || !selections || !selections.currentEntityKey ? undefined : entities[selections.currentEntityKey];

// prettier-ignore
export const mapToCurrentEntityKey =
  (selections: IEntitySelections | undefined): EntityIdentity | undefined =>
    (!selections ? undefined : selections.currentEntityKey);

// prettier-ignore
export const mapToCurrentEntities =
  <TModel>(selections: IEntitySelections | undefined, entities: IEntityDictionary<TModel> | undefined): TModel[] =>
    (!selections || !selections.currentEntitiesKeys || !entities)
      ? []
      : selections.currentEntitiesKeys.reduce((all, key) => entities[key] ? [...all, entities[key]] : all, [] as TModel[]);

// prettier-ignore
export const mapToCurrentEntitiesKeys =
  (selections: IEntitySelections | undefined): EntityIdentity[] =>
    (!selections || !selections.currentEntitiesKeys) ? [] : selections.currentEntitiesKeys;
