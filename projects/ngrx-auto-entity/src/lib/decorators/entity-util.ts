import { camelCase } from '../../util/case';
import { compose } from '../../util/func';
import { TNew } from '../actions/model-constructor';
import { EntityComparer, IEntityOptions, IEntityTransformer } from './entity-options';
import { ENTITY_OPTS_PROP } from './entity-tokens';

export const EMPTY_OBJECT = {};

/** @internal **/
export const getEntity = <TModel>(entityOrType: TNew<TModel> | TModel | TModel[]): TNew<TModel> | TModel =>
  Array.isArray(entityOrType) ? entityOrType[0] : entityOrType;

/** @internal **/
export const ensureObject = value => value || EMPTY_OBJECT;

/** @internal **/
export const getEntityOptions = <TModel>(entityOrType: TNew<TModel> | TModel | TModel[]): IEntityOptions =>
  (entityOrType[ENTITY_OPTS_PROP] ||
    (entityOrType.constructor ? entityOrType.constructor[ENTITY_OPTS_PROP] : EMPTY_OBJECT) ||
    EMPTY_OBJECT) as IEntityOptions;

/** @internal **/
export const entityOptions = <TModel>(entityOrType: TNew<TModel> | TModel | TModel[]): IEntityOptions =>
  compose(getEntity, ensureObject, getEntityOptions)(entityOrType);

/** @internal **/
export const entityStateName = (modelName: string): string => camelCase(modelName);

/**
 * Returns the `modelName` of the specified entity(ies).
 */
export const nameOfEntity = <TModel>(entityOrType: TNew<TModel> | TModel): string | undefined => entityOptions(entityOrType).modelName;

/**
 * Returns the `uriName` of the specified entity(ies).
 */
export const uriNameOfEntity = <TModel>(entityOrType: TNew<TModel> | TModel): string | null | undefined =>
  entityOptions(entityOrType).uriName;

/**
 * Returns the `pluralName` of the specified entity(ies).
 */
export const pluralNameOfEntity = <TModel>(entityOrType: TNew<TModel> | TModel): string | null | undefined =>
  entityOptions(entityOrType).pluralName;

/**
 * Returns the state name of the specified entity(ies).
 *
 * @remarks This is the `modelName` converted to camelCase.
 */
export const stateNameOfEntity = <TModel>(entityOrType: TNew<TModel> | TModel): string | null | undefined =>
  entityStateName(entityOptions(entityOrType).modelName);

/** @internal **/
export const mapComparer = (options: IEntityOptions, name: string): EntityComparer =>
  options.comparers != null
    ? typeof options.comparers[name] === 'string'
      ? (options.comparers[options.comparers[name] as string] as EntityComparer)
      : (options.comparers[name] as EntityComparer)
    : undefined;

/** @internal **/
export const defaultComparer = (options: IEntityOptions): EntityComparer => options.comparer || mapComparer(options, 'default');

/** @internal **/
export const namedComparer = (options: IEntityOptions, name: string): EntityComparer =>
  options.comparers != null
    ? (options.comparers[name] as EntityComparer) || mapComparer(options, name)
    : name === 'default'
    ? defaultComparer(options)
    : undefined;

/** @internal **/
export const getComparer = (options: IEntityOptions, name?: string): EntityComparer =>
  options != null ? (name != null ? namedComparer(options, name) : defaultComparer(options)) : undefined;

/**
 * Returns the comparer function for the specified entity(ies).
 *
 * @remarks If no comparer is specified, the default comparer is returned.
 *
 * @param entityOrType - The entity(ies) to get the comparer for
 * @param name - The name of the comparer to get
 */
export const entityComparer = <TModel>(entityOrType: TNew<TModel> | TModel | TModel[], name?: string): EntityComparer | null | undefined =>
  getComparer(entityOptions(entityOrType), name);

/**
 * Returns the transformation functions for the specified entity(ies).
 */
export const entityTransforms = <TModel>(entityOrType: TNew<TModel> | TModel): IEntityTransformer[] | null | undefined =>
  entityOptions(entityOrType).transform;

/**
 * Returns the default max age for the specified entity(ies).
 */
export const entityMaxAge = <TModel>(entityOrType: TNew<TModel> | TModel | TModel[]): number => entityOptions(entityOrType).defaultMaxAge;
