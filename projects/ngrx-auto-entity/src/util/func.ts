export const pipe = (...fns) => data => fns.reduce((value, fn) => fn(value), data);
export const map = (fn: (x) => any) => data => fn(data);
export const tap = (fn: (x) => void) => data => {
  fn(data);
  return data;
};

export const asString = (value: any): string => (value == null ? '' : String(value));

export const replace = (exp: string | RegExp, repl) => value =>
  pipe(
    asString,
    (str: string) => str.replace(exp, repl)
  )(value);
