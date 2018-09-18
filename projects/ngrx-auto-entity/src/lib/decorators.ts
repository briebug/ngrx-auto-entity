import { EntityAction } from './actions';

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

export function checkKeyName(type: any, modelName: string): boolean {
  const nae_id = type.prototype[NAE_ID];
  if (nae_id === undefined) {
    console.error(`[NGRX-AE] Entity model '${modelName}' does not have a key specified!`);
    return false;
  }
  return true;
}

export function getKeyName(action: EntityAction): string {
  const nae_id = action.info.modelType.prototype[NAE_ID];
  if (nae_id === undefined) {
    console.error(`[NGRX-AE] Entity model '${action.info.modelName}' does not have a key specified!`);
  }
  return nae_id;
}
