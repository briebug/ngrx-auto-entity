export const NAE_ID = '_nae_id';

/**
 * Used to designate the key for the entity
 *
 * @param target the entity's class
 * @param key the key's name
 */
export function Key(target, key: string | symbol): void {
  Object.defineProperty(target, NAE_ID, { get: () => key });
}
