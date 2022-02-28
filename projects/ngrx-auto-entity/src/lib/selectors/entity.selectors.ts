import { entityComparer } from '../decorators/entity-util';
import { EntityIdentity } from '../types/entity-identity';
import { IEntityDictionary } from '../util/entity-state';

// prettier-ignore
export const mapToEntityArray =
  <TModel>(entities: IEntityDictionary<TModel>, ids: EntityIdentity[]): TModel[] =>
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
export const mapToHasEntities =
  (ids: EntityIdentity[]): boolean =>
    !ids ? false : !!ids.length;

// prettier-ignore
export const mapToHasNoEntities =
 (ids: EntityIdentity[]): boolean =>
    ids ? true : !ids.length;

// prettier-ignore
export const mapToTotal =
  (ids: EntityIdentity[]): number =>
    !ids ? 0 : ids.length;
