import { camelCase } from '../../util/case';
import { pipe } from '../../util/func';
import { TNew } from '../actions/model-constructor';
import { EntityComparer, IEntityOptions, IEntityTransformer } from './entity-options';
import { ENTITY_OPTS_PROP } from './entity-tokens';

export const EMPTY_OBJECT = {};

export const getEntity = <TModel>(entityOrType: TNew<TModel> | TModel | TModel[]): TNew<TModel> | TModel =>
  Array.isArray(entityOrType) ? entityOrType[0] : entityOrType;

export const ensureObject = value => value || EMPTY_OBJECT;

export const getEntityOptions = <TModel>(entityOrType: TNew<TModel> | TModel | TModel[]): IEntityOptions =>
  (entityOrType[ENTITY_OPTS_PROP] ||
    (entityOrType.constructor ? entityOrType.constructor[ENTITY_OPTS_PROP] : EMPTY_OBJECT) ||
    EMPTY_OBJECT) as IEntityOptions;

export const entityOptions = <TModel>(entityOrType: TNew<TModel> | TModel | TModel[]): IEntityOptions =>
  pipe(
    getEntity,
    ensureObject,
    getEntityOptions
  )(entityOrType);

export const entityStateName = (modelName: string): string => camelCase(modelName);

export const nameOfEntity = <TModel>(entityOrType: TNew<TModel> | TModel): string | undefined => entityOptions(entityOrType).modelName;

export const uriNameOfEntity = <TModel>(entityOrType: TNew<TModel> | TModel): string | null | undefined =>
  entityOptions(entityOrType).uriName;

export const pluralNameOfEntity = <TModel>(entityOrType: TNew<TModel> | TModel): string | null | undefined =>
  entityOptions(entityOrType).pluralName;

export const stateNameOfEntity = <TModel>(entityOrType: TNew<TModel> | TModel): string | null | undefined =>
  entityStateName(entityOptions(entityOrType).modelName);

export const mapComparer = (options: IEntityOptions, name: string): EntityComparer =>
  !!options.comparers
    ? typeof options.comparers[name] === 'string'
      ? (options.comparers[options.comparers[name] as string] as EntityComparer)
      : (options.comparers[name] as EntityComparer)
    : undefined;

export const defaultComparer = (options: IEntityOptions): EntityComparer => options.comparer || mapComparer(options, 'default');

export const namedComparer = (options: IEntityOptions, name: string): EntityComparer =>
  !!options.comparers
    ? (options.comparers[name] as EntityComparer) || mapComparer(options, name)
    : name === 'default'
    ? defaultComparer(options)
    : undefined;

export const getComparer = (options: IEntityOptions, name?: string): EntityComparer =>
  !!options ? (!!name ? namedComparer(options, name) : defaultComparer(options)) : undefined;

export const entityComparer = <TModel>(entityOrType: TNew<TModel> | TModel | TModel[], name?: string): EntityComparer | null | undefined =>
  getComparer(entityOptions(entityOrType), name);

export const entityTransforms = <TModel>(entityOrType: TNew<TModel> | TModel): IEntityTransformer[] | null | undefined =>
  entityOptions(entityOrType).transform;

export const entityMaxAge = <TModel>(entityOrType: TNew<TModel> | TModel | TModel[]): number => entityOptions(entityOrType).defaultMaxAge;
