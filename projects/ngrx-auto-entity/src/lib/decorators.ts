export const NAE_ID = '_nae_id';

/**
 * Used to designate the key property for the entity
 *
 * @param target the entity's class
 * @param keyName the key's name
 */
export function Key(target, keyName: string | symbol): void {
  Object.defineProperty(target, NAE_ID, { get: () => keyName });
}
