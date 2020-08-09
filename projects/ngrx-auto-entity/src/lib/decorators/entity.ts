import { EntityActionTypes } from '../actions/action-types';
import { IEffectExclusions } from './effect-exclusions';
import { ENTITY_OPTS_PROP } from './entity-tokens';

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
  fromServer?: (data: any, criteria?: any) => any;
  toServer?: (entity: any, criteria?: any) => any;
}

export type EntityComparer = (a, b) => number;
export interface IEntityComparerMap {
  [key: string]: EntityComparer | string;
}

export interface IEntityNames {
  modelName: string;
  pluralName?: string;
  uriName?: string;
}

/**
 * The options that may be configured for a decorated entity model.
 */
export interface IEntityOptions extends IEntityNames {
  comparer?: EntityComparer;
  comparers?: IEntityComparerMap;
  transform?: IEntityTransformer[];
  excludeEffects?: IEffectExclusions | IEffectExcept;
}

/**
 * Entity decorator for configuring each entity model.
 *
 * @param options The configuration options to apply.
 */
export function Entity(options: IEntityOptions) {
  return function entityDecorator(constructor: any) {
    const descriptor = Object.create(null);
    descriptor.value = options;
    Object.defineProperty(constructor, ENTITY_OPTS_PROP, descriptor);

    return constructor;
  };
}
