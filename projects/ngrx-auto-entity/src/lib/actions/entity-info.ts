import { IEntityOptions } from '../decorators/entity-options';
import { TNew } from './model-constructor';

// TODO: remove any default from TModel
/**
 * Descriptor of an Entity model and related metadata.
 */
export interface IEntityInfo<TModel = any> extends IEntityOptions {
  modelType: TNew<TModel>;
}
