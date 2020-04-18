import { IEntityNames, IEntityTransformer } from '../decorators/entity';

/**
 * Descriptor of an Entity model and related metadata.
 */
export interface IEntityInfo extends IEntityNames {
  modelType: new () => any;
  transform?: IEntityTransformer[];
}
