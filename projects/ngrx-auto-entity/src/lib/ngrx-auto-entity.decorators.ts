export const NAE_ID = '_nae_id';

export function Key(target, key: string | symbol): void {
  Object.defineProperty(target, NAE_ID, { get: () => key });
}
