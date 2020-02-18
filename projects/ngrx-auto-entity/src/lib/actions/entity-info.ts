import { IEntityTransformer } from '../decorators/entity';

/**
 * Descriptor of an Entity model and related metadata.
 */
export interface IEntityInfo {
  modelName: string;
  pluralName?: string;
  uriName?: string;
  modelType: new () => any;
  transform?: IEntityTransformer[];
}
