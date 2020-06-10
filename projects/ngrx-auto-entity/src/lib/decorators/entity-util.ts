import { TNew } from '../actions/model-constructor';
import { EntityComparer, IEntityOptions, IEntityTransformer } from './entity';
import { ENTITY_OPTS_PROP } from './entity-tokens';

export const nameOfEntity = <TModel>(entityOrType: TNew<TModel> | TModel): string | null | undefined =>
  entityOrType &&
  ((entityOrType[ENTITY_OPTS_PROP] ||
    (entityOrType.constructor ? entityOrType.constructor[ENTITY_OPTS_PROP] : {}) ||
    {}) as IEntityOptions).modelName;

export const uriNameOfEntity = <TModel>(entityOrType: TNew<TModel> | TModel): string | null | undefined =>
  entityOrType &&
  ((entityOrType[ENTITY_OPTS_PROP] ||
    (entityOrType.constructor ? entityOrType.constructor[ENTITY_OPTS_PROP] : {}) ||
    {}) as IEntityOptions).uriName;

export const pluralNameOfEntity = <TModel>(entityOrType: TNew<TModel> | TModel): string | null | undefined =>
  entityOrType &&
  ((entityOrType[ENTITY_OPTS_PROP] ||
    (entityOrType.constructor ? entityOrType.constructor[ENTITY_OPTS_PROP] : {}) ||
    {}) as IEntityOptions).pluralName;

export const entityComparer = <TModel>(entityOrType: TNew<TModel> | TModel): EntityComparer | null | undefined =>
  entityOrType &&
  ((entityOrType[ENTITY_OPTS_PROP] ||
    (entityOrType.constructor ? entityOrType.constructor[ENTITY_OPTS_PROP] : {}) ||
    {}) as IEntityOptions).comparer;

export const entityTransforms = <TModel>(
  entityOrType: TNew<TModel> | TModel
): IEntityTransformer[] | null | undefined =>
  entityOrType &&
  ((entityOrType[ENTITY_OPTS_PROP] ||
    (entityOrType.constructor ? entityOrType.constructor[ENTITY_OPTS_PROP] : {}) ||
    {}) as IEntityOptions).transform;
