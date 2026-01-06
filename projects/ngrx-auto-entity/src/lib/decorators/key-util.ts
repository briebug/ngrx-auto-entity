import { IEntityAction } from '../actions/entity-action';
import { EntityIdentity } from '../types/entity-identity';
import { NAE_KEYS } from './entity-tokens';

/**
 * Checks if an entity's model has at least one decorated key.
 * @param type - The entity model class
 * @param modelName - The name of the entity model
 */
export function checkKeyName(type: any, modelName: string): boolean {
  const keys = type.prototype[NAE_KEYS];
  if (keys === undefined) {
    console.error(`[NGRX-AE] Entity model '${modelName}' does not have a key specified!`);
    return false;
  }
  return true;
}

/**
 * Extracts all key names for an entity using an entity action.
 * @param action - The action to extract the entity's info from
 * @returns The key names of the entity
 */
export function getKeyNames(action: IEntityAction): string[] {
  const keys = action && action.info && action.info.modelType.prototype[NAE_KEYS];
  if (keys === undefined) {
    console.error(
      `[NGRX-AE] [getKeyNames()] Entity model '${action && action.info && action.info.modelName}' does not have a key specified!`
    );
  }
  return keys || [];
}

/**
 * Extracts all key names for an entity using the entity's class.
 * @param type - The entity's class to extract the entity's info from
 * @returns The key names of the entity
 */
export function getKeyNamesFromModel<TModel>(type: new () => TModel): string[] {
  if (type === undefined) {
    console.error('[NGRX-AE] [getKeyNamesFromModel()] Specified type does not exist! Please provide a valid auto-entity model type.');
    return [];
  }

  const keys = type.prototype[NAE_KEYS];
  return keys || [];
}

/**
 * Extracts all key names for an entity using the entity instance.
 *
 * @remarks Requires the entity to be an instance of the entity's class.
 *
 * @param entity - The entity instance to extract the entity's info from
 * @returns The key names of the entity
 */
export function getKeyNamesFromEntity<TModel>(entity: TModel): string[] {
  if (!entity) {
    console.error('[NGRX-AE] [getKeyNamesFromEntity()] Specified entity does not exist! Please provide a valid auto-entity entity object.');
    return [];
  }

  const keys = entity[NAE_KEYS] || Object.getPrototypeOf(entity)[NAE_KEYS];
  return keys || [];
}

function _getKey(entity: any, keyNames: string[]): EntityIdentity {
  if (!entity) {
    console.error(`[NGRX-AE] Specified entity does not exist! Please provide a valid auto-entity entity object.`);
    return undefined;
  }

  if (!keyNames || !keyNames.length) {
    console.error(`[NGRX-AE] Specified entity does not have any properties decorated as keys.`);
    return undefined;
  }

  if (keyNames.length === 1) {
    return entity[keyNames[0]];
  }

  // Combine composite key values into underscore-separated string
  const compositeKey = keyNames.map(key => entity[key]).reduce((ck, key) => ck + '_' + key.toString(), '');
  return compositeKey.substr(1);
}

/**
 * Extracts the (composite) key value for the specified entity using an entity action.
 *
 * @remarks Usefully when the entity action is available and the entity is plain JavaScript object.
 *
 * @param action - The action to extract the entity's info from
 * @param entity - The entity instance
 * @returns The (composite) key for the specified entity
 */
export function getKey(action: IEntityAction, entity: any): EntityIdentity {
  const keyNames = getKeyNames(action);
  return _getKey(entity, keyNames);
}

/**
 * Extracts the (composite) key value for the specified entity using the entity's class.
 *
 * @remarks Usefully when the entity's class is known and the entity is plain JavaScript object.
 *
 * @param type - The entity's class to extract the entity's info from
 * @param entity - The entity instance
 * @returns The (composite) key for the specified entity
 */
export function getKeyFromModel<TModel>(type: new () => TModel, entity: TModel): EntityIdentity {
  const keyNames = getKeyNamesFromModel(type);
  return _getKey(entity, keyNames);
}

/**
 * Extracts the (composite) key value for the specified entity.
 *
 * @remarks Requires the entity to be an instance of the entity's class.
 *
 * @param entity - The entity instance
 * @returns The (composite) key for the specified entity
 */
export function getKeyFromEntity<TModel>(entity: TModel): EntityIdentity {
  const keyNames = getKeyNamesFromEntity(entity);
  return _getKey(entity, keyNames);
}
