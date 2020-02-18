import { pascalCase } from '../../util/case';
import { IEntityOptions } from '../decorators/entity';
import { ENTITY_OPTS_PROP } from '../decorators/entity-tokens';
import { checkKeyName } from '../decorators/key';
import { IEntityInfo } from './entity-info';

/**
 * Sets the entity info for a given model.
 *
 * @param type The entity model type
 */
export const setInfo = (type: any): IEntityInfo => {
  const instance = new type();
  const opts = (type[ENTITY_OPTS_PROP] || { modelName: instance.constructor.name }) as IEntityOptions;
  const modelName = opts.modelName;
  checkKeyName(type, modelName);
  return {
    modelType: type,
    modelName,
    pluralName: opts.pluralName,
    uriName: opts.uriName,
    transform: opts.transform
  };
};

/**
 * Sets the action type info for a given model.
 *
 * @param actionType The type of entity action
 * @param info The entity info
 */
export const setType = (actionType: string, info: IEntityInfo): string => {
  const name = info.modelName;
  const entity = pascalCase(name);

  return actionType.replace('Entity', entity);
};
