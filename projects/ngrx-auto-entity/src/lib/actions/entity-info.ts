import { IEntityOptions } from '../decorators/entity-options';

/**
 * Descriptor of an Entity model and related metadata.
 */
export interface IEntityInfo extends IEntityOptions {
  modelType: new () => any;
}
