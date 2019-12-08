import { Omit } from 'shared/types/util.type';

export function omitByKeys<T = any, K extends keyof T = any>(collection: T, keys: K[]): Omit<T, K> {
  const _keys = [...keys];
  let index: number;

  return Object.keys(collection).reduce(
    (acc: Exclude<T, K>, k: any) => {
      index = _keys.indexOf(k);

      if (index > -1) {
        _keys.splice(index);
      } else {
        acc[k] = collection[k];
      }

      return acc;
    },
    {} as any
  );
}
