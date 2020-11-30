import { pascalCase } from '../../util/case';
import { IEntityOptions } from '../decorators/entity-options';
import { ENTITY_OPTS_PROP } from '../decorators/entity-tokens';
import { checkKeyName } from '../decorators/key-util';
import { IEntityInfo } from './entity-info';
import { TNew } from './model-constructor';

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
    ...opts
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

export const setActionType = <TModel, T extends string>(actionType: string, type: TNew<TModel>): T => {
  const info = setInfo(type);
  const typedType = setType(actionType, info) as T;
  return typedType;
};
