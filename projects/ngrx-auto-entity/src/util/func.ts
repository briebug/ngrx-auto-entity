export const tpipe: {
  <A, B>(fn1: (a: A) => B): (data: A) => B;
  <A, B, C>(fn1: (a: A) => B, fn2: (b: B) => C): (data: A) => C;
  <A, B, C, D>(fn1: (a: A) => B, fn2: (b: B) => C, fn3: (c: C) => D): (data: A) => D;
  <A, B, C, D, E>(fn1: (a: A) => B, fn2: (b: B) => C, fn3: (c: C) => D, fn4: (d: D) => E): (data: A) => E;
  <A, B, C, D, E, F>(fn1: (a: A) => B, fn2: (b: B) => C, fn3: (c: C) => D, fn4: (d: D) => E, fn5: (e: E) => F): (data: A) => F;
  <A, B, C, D, E, F, G>(fn1: (a: A) => B, fn2: (b: B) => C, fn3: (c: C) => D, fn4: (d: D) => E, fn5: (e: E) => F, fn6: (f: F) => G): (
    data: A
  ) => G;
  <A, B, C, D, E, F, G, H>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
    fn7: (g: G) => H
  ): (data: A) => H;
  <A, B, C, D, E, F, G, H, I>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
    fn7: (g: G) => H,
    fn8: (h: H) => I
  ): (data: A) => I;
  <A, B, C, D, E, F, G, H, I, J>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
    fn7: (g: G) => H,
    fn8: (h: H) => I,
    fn9: (i: I) => J
  ): (data: A) => J;
  <A, B, C, D, E, F, G, H, I, J, K>(
    fn1: (a: A) => B,
    fn2: (b: B) => C,
    fn3: (c: C) => D,
    fn4: (d: D) => E,
    fn5: (e: E) => F,
    fn6: (f: F) => G,
    fn7: (g: G) => H,
    fn8: (h: H) => I,
    fn9: (i: I) => J,
    fn10: (j: J) => K
  ): (data: A) => K;
  (...fns: Array<(value: any) => any>): (data: any) => any;
} =
  (...fns: Array<(value: any) => any>) =>
  (data: any) =>
    fns.reduce((value, fn) => fn(value), data);

/** @deprecated Use {@link tpipe} instead */
export const compose = tpipe;

export const map =
  <A, B>(fn: (a: A) => B) =>
  (data: A) =>
    fn(data);
export const tap =
  <A>(fn: (a: A) => void) =>
  (data: A) => {
    fn(data);
    return data;
  };

export const noop = () => void 0;

export const not =
  <A>(fn: (value: boolean) => A) =>
  (value: boolean) =>
    fn(!value);

export const isUndefined = <A>(value: A | undefined): value is undefined => value === undefined;

export const throwError = (message: string) => () => {
  throw new Error(message);
};

export const iif =
  <TValue, TWhenTrue, TWhenFalse>(
    predicate: (value: TValue) => boolean,
    whenTrue: (value: TValue) => TWhenTrue,
    whenFalse: (value: TValue) => TWhenFalse
  ) =>
  (value: TValue) =>
    predicate(value) ? whenTrue(value) : whenFalse(value);

export const asString = <A>(value: A): string => (value == null ? '' : String(value));

export const replace: {
  <A>(exp: string | RegExp, replaceValue: string): (value: A) => string;
  <A>(exp: string | RegExp, replacer: (substring: string, ...args: any[]) => string): (value: A) => string;
} = (exp: string | RegExp, repl: any) => tpipe(asString, (str: string) => str.replace(exp, repl));
