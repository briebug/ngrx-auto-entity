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
  fromServer?: (data: any) => any;
  toServer?: (entity: any) => any;
}

/**
 * The options that may be configured for a decorated entity model.
 */
export interface IEntityOptions {
  modelName: string;
  uriName?: string;
  pluralName?: string;
  comparer?: (a, b) => number;
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
