import { NAE_KEY_NAMES, NAE_KEYS } from './entity-tokens';

/**
 * Used to designate the key property for the entity
 *
 * @param target the entity's class
 * @param keyName the key's name
 */
// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
export function Key(target: Object, keyName: string | symbol): void {
  // TODO: Use Reflect API instead of a dunder property
  // @ts-expect-error TS7053
  target[NAE_KEY_NAMES] = target[NAE_KEY_NAMES] ? [...target[NAE_KEY_NAMES], keyName] : [keyName];
  // @ts-expect-error TS7053
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  !target[NAE_KEYS] && Object.defineProperty(target, NAE_KEYS, { get: () => target[NAE_KEY_NAMES] });
}
