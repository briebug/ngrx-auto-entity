import { IEntityAction } from '../actions/entity-action';
import { EntityIdentity } from '../util/entity-state';

// NOTE: The following two constants should be Symbol() to avoid any potential conflict with
// any user-defined properties on the entity models. However, use of Symbol() here causes
// problems with the Jest test runner at the current time
export const NAE_KEYS = '__nae_keys';
export const NAE_KEY_NAMES = '__nae_key_names';

/**
 * Used to designate the key property for the entity
 *
 * @param target the entity's class
 * @param keyName the key's name
 */
export function Key(target, keyName: string | symbol): void {
  target[NAE_KEY_NAMES] = target[NAE_KEY_NAMES] ? [...target[NAE_KEY_NAMES], keyName] : [keyName];
  Object.defineProperty(target, NAE_KEYS, { get: () => target[NAE_KEY_NAMES] });
}

export function checkKeyName(type: any, modelName: string): boolean {
  const keys = type.prototype[NAE_KEYS];
  if (keys === undefined) {
    console.error(`[NGRX-AE] Entity model '${modelName}' does not have a key specified!`);
    return false;
  }
  return true;
}

export function getKeyNames(action: IEntityAction): string[] {
  const keys = action && action.info && action.info.modelType.prototype[NAE_KEYS];
  if (keys === undefined) {
    console.error(
      `[NGRX-AE] [getKeyNames()] Entity model '${action &&
        action.info &&
        action.info.modelName}' does not have a key specified!`
    );
  }
  return keys || [];
}

export function getKeyNamesFromModel<TModel>(type: new () => TModel): string[] {
  if (type === undefined) {
    console.error(
      '[NGRX-AE] [getKeyNamesFromModel()] Specified type does not exist! Please provide a valid auto-entity model type.'
    );
    return [];
  }

  const keys = type.prototype[NAE_KEYS];
  return keys || [];
}

export function getKeyNamesFromEntity<TModel>(entity: TModel): string[] {
  if (!entity) {
    console.error(
      '[NGRX-AE] [getKeyNamesFromEntity()] Specified entity does not exist! Please provide a valid auto-entity entity object.'
    );
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

export function getKey(action: IEntityAction, entity: any): EntityIdentity {
  const keyNames = getKeyNames(action);
  return _getKey(entity, keyNames);
}

export function getKeyFromModel<TModel>(type: new () => TModel, entity: TModel): EntityIdentity {
  const keyNames = getKeyNamesFromModel(type);
  return _getKey(entity, keyNames);
}

export function getKeyFromEntity<TModel>(entity: TModel): EntityIdentity {
  const keyNames = getKeyNamesFromEntity(entity);
  return _getKey(entity, keyNames);
}
