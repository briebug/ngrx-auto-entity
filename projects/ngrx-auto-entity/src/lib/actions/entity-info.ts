import { IEntityNames, IEntityTransformer } from '../decorators/entity-options';

/**
 * Descriptor of an Entity model and related metadata.
 */
export interface IEntityInfo extends IEntityNames {
  modelType: new () => any;
  transform?: IEntityTransformer[];
}
