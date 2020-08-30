import { IEntityOptions } from './entity-options';
import { ENTITY_OPTS_PROP } from './entity-tokens';

/**
 * Entity decorator for configuring each entity model.
 *
 * @param options - The configuration options to apply
 */
export function Entity(options: IEntityOptions);

/**
 * Entity decorator for configuring each entity model.
 *
 * @param modelName - The model name option to apply
 * @param options - Additional configuration options to apply
 */
export function Entity(modelName?: string, options?: Partial<IEntityOptions>);

/**
 * Entity decorator for configuring each entity model.
 *
 * @param nameOrOptions - The model name or configuration options to apply
 * @param maybeOptions - Additional options to apply if a model name is passed as the first param
 */
export function Entity(nameOrOptions: string | IEntityOptions, maybeOptions?: Partial<IEntityOptions>) {
  return function entityDecorator(constructor: any) {
    const initialOptions = typeof nameOrOptions === 'object' ? nameOrOptions : { modelName: nameOrOptions };
    const options = maybeOptions ? { ...maybeOptions, ...initialOptions } : initialOptions;

    const descriptor = Object.create(null);
    descriptor.configurable = false;
    descriptor.enumerable = false;
    descriptor.writable = false;
    descriptor.value = options;
    Object.defineProperty(constructor, ENTITY_OPTS_PROP, descriptor);

    return constructor;
  };
}
