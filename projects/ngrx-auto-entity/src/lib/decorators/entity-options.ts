import { EntityActionTypes } from '../actions/action-types';
import { IEffectExclusions } from './effect-exclusions';

/**
 * Defines effect exceptions for the decorated model.
 */
export interface IEffectExcept {
  except?: (...actions: EntityActionTypes[]) => IEffectExclusions;
}

/**
 * Defines an entity data transformer capable of transforming data to and from the server.
 */
export interface IEntityTransformer {
  /**
   * Transforms all data received from the server
   * @param data - The data received
   * @param criteria - The custom criteria for the originating action
   */
  fromServer?: (data: any, criteria?: any) => any;

  /**
   * Transforms all entities sent to the server
   * @param entity - The entity to transform
   * @param criteria - The custom criteria for the originating action
   */
  toServer?: (entity: any, criteria?: any) => any;
}

/**
 * A function that compares two entities.
 *
 * @remarks
 * A positive return value indicates that a is greater than b.
 * A negative return value indicates that a is less than b.
 * A zero return value indicates that a is equal to b.
 */
export type EntityComparer = (a, b) => number;

/**
 * A map of comparer functions or named comparer references for sorting entities
 */
export interface IEntityComparerMap {
  [key: string]: EntityComparer | string;
}

export interface IEntityNames {
  /**
   * The entity model's singular name.
   *
   * @remarks
   * This is used to derive the state's name.
   *
   * @example
   * ```text
   * City
   * ```
   */
  modelName: string;

  /**
   * The entity model's plural name.
   *
   * @example
   * ```text
   * Cities
   * ```
   */
  pluralName?: string;

  /**
   * The entity model's URI name.
   *
   * @remarks
   * This can be used to create generic entity services
   * that work with multiple entity models.
   *
   * @example
   * ```text
   * city
   * ```
   */
  uriName?: string;
}

/**
 * A set of common entity ages
 */
export enum EntityAge {
  Minute = 60,
  Hour = EntityAge.Minute * 60,
  QuarterDay = EntityAge.Hour * 6,
  HalfDay = EntityAge.Hour * 12,
  Day = EntityAge.Hour * 24,
  Week = EntityAge.Day * 7
}

/**
 * The options that may be configured for a decorated entity model.
 */
export interface IEntityOptions extends IEntityNames {
  /**
   * A default comparer for sorting entities on selection
   */
  comparer?: EntityComparer;

  /**
   * A map of comparer functions or named comparer references for sorting entities
   */
  comparers?: IEntityComparerMap;

  /**
   * A set of entity transform objects that may be composed, in order, to transform the entity
   */
  transform?: IEntityTransformer[];

  /**
   * The effect exclusion config
   * @see IEffectExclusions
   * @see IEffectExcept
   */
  excludeEffects?: IEffectExclusions | IEffectExcept;

  /**
   * A default maximum age, in seconds, after which load*IfNecessary actions will always load
   */
  defaultMaxAge?: number | EntityAge;
}
