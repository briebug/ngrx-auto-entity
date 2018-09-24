import { EntityAction } from './actions';

// NOTE: The following two constants should be Symbol() to avoid any potential conflict with
// any user-defined properties on the entity models. However, use of Symbol() here causes
// problems with the Jest test runner at the current time
export const NAE_KEYS = '__nae_keys';
export const NAE_KEY_NAMES = '__nae_key_names';

export const NAE_GET_KEY = 'getEntityKey';

/**
 * Used to designate the key property for the entity
 *
 * @param target the entity's class
 * @param keyName the key's name
 */
export function Key(target, keyName: string | symbol): void {
  target[NAE_KEY_NAMES] = target[NAE_KEY_NAMES] ? [...target[NAE_KEY_NAMES], keyName] : [keyName];
  target[NAE_GET_KEY] = () => _getKey(this, target[NAE_KEY_NAMES]);
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

export function getKeyNames(action: EntityAction): string[] {
  const keys = action.info.modelType.prototype[NAE_KEYS];
  if (keys === undefined) {
    console.error(`[NGRX-AE] Entity model '${action.info.modelName}' does not have a key specified!`);
  }
  return keys;
}

function _getKey(entity: any, keyNames: string[]): string | number {
  if (keyNames.length === 1) {
    return entity[keyNames[0]];
  }

  // Combine composite key values into underscore-separated string
  const compositeKey = keyNames.map(key => entity[key]).reduce((ck, key) => ck + '_' + key.toString(), '');
  return compositeKey.substr(1);
}

export function getKey(action: EntityAction, entity: any): any {
  const keyNames = getKeyNames(action);
  return _getKey(entity, keyNames);
}
