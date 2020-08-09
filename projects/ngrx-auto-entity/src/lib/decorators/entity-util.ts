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

export const mapComparer = (options: IEntityOptions, name: string): EntityComparer =>
  !!options.comparers
    ? typeof options.comparers[name] === 'string'
      ? (options.comparers[options.comparers[name] as string] as EntityComparer)
      : (options.comparers[name] as EntityComparer)
    : undefined;

export const defaultComparer = (options: IEntityOptions): EntityComparer =>
  options.comparer || mapComparer(options, 'default');

export const namedComparer = (options: IEntityOptions, name: string): EntityComparer =>
  !!options.comparers
    ? (options.comparers[name] as EntityComparer) || mapComparer(options, name)
    : name === 'default'
    ? defaultComparer(options)
    : undefined;

export const getComparer = (options: IEntityOptions, name?: string): EntityComparer =>
  !!options ? (!!name ? namedComparer(options, name) : defaultComparer(options)) : undefined;

export const getEntity = <TModel>(entityOrType: TNew<TModel> | TModel | TModel[]): TNew<TModel> | TModel =>
  Array.isArray(entityOrType) ? entityOrType[0] : entityOrType;

export const entityComparer = <TModel>(
  entityOrType: TNew<TModel> | TModel | TModel[],
  name?: string
): EntityComparer | null | undefined =>
  (entityOrType = getEntity(entityOrType)) &&
  entityOrType &&
  getComparer(
    (entityOrType[ENTITY_OPTS_PROP] ||
      (entityOrType.constructor ? entityOrType.constructor[ENTITY_OPTS_PROP] : {}) ||
      {}) as IEntityOptions,
    name
  );

export const entityTransforms = <TModel>(
  entityOrType: TNew<TModel> | TModel
): IEntityTransformer[] | null | undefined =>
  entityOrType &&
  ((entityOrType[ENTITY_OPTS_PROP] ||
    (entityOrType.constructor ? entityOrType.constructor[ENTITY_OPTS_PROP] : {}) ||
    {}) as IEntityOptions).transform;
