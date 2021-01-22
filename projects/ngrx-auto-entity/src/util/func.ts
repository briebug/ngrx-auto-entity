export const pipe = (...fns) => data => fns.reduce((value, fn) => fn(value), data);
export const tpipe = <TInput>(fn1: (value: TInput) => any, ...fns: Array<(value: any) => any>) => data =>
  [fn1, ...fns].reduce((value, fn) => fn(value), data);

export const map = (fn: (x) => any) => data => fn(data);
export const tap = (fn: (x) => void) => data => {
  fn(data);
  return data;
};

export const noop = () => void 0;

export const not = (fn: (...args: any[]) => any) => value => fn(!value);

export const isUndefined = value => value === undefined;

export const throwError = (message: string) => () => {
  throw new Error(message);
};

export const iif = (predicate: (value: any) => boolean, whenTrue: (value: any) => any, whenFalse: (value: any) => any) => value =>
  predicate(value) ? whenTrue(value) : whenFalse(value);

export const asString = (value: any): string => (value == null ? '' : String(value));

export const replace = (exp: string | RegExp, repl) => tpipe(asString, (str: string) => str.replace(exp, repl));
