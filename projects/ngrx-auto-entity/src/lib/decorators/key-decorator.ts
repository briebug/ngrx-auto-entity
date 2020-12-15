import { NAE_KEY_NAMES, NAE_KEYS } from './entity-tokens';

/**
 * Used to designate the key property for the entity
 *
 * @param target the entity's class
 * @param keyName the key's name
 */
export function Key(target, keyName: string | symbol): void {
  target[NAE_KEY_NAMES] = target[NAE_KEY_NAMES] ? [...target[NAE_KEY_NAMES], keyName] : [keyName];
  // tslint:disable-next-line:no-unused-expression
  !target[NAE_KEYS] && Object.defineProperty(target, NAE_KEYS, { get: () => target[NAE_KEY_NAMES] });
}
