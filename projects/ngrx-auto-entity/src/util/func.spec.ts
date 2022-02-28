import { asString, map, compose, replace } from './func';

describe('map', () => {
  test('should return input as is when identity', () => {
    const result = map(value => value)(10);
    expect(result).toBe(10);
  });

  test('should return input times is when multiply by ten', () => {
    const result = map(value => value * 10)(10);
    expect(result).toBe(100);
  });

  test('should return input as string is when convert to string', () => {
    const result = map(value => value.toString())(10);
    expect(result).toBe('10');
  });
});

describe('pipe', () => {
  test('should be identity if no functions', () => {
    const idnull = compose()(null);
    const id1 = compose()(1);
    const idstr = compose()('str');
    const idtrue = compose()(true);

    expect(idnull).toBe(null);
    expect(id1).toBe(1);
    expect(idstr).toBe('str');
    expect(idtrue).toBe(true);
  });

  test('should apply anonymous functions in top-down order', () => {
    const result = compose(
      val => val * 100,
      val => [Math.trunc(val), Math.trunc(val / 1000)],
      ([year, month]) => `${year}-0${month}-15`
    )(20.19);

    expect(result).toBe('2019-02-15');
  });

  test('should apply curried functions in top-down order', () => {
    const result = compose(
      map(val => val * 100),
      map(val => [Math.trunc(val), Math.trunc(val / 1000)]),
      map(([year, month]) => `${year}-0${month}-15`)
    )(20.19);

    expect(result).toBe('2019-02-15');
  });
});

describe('asString', () => {
  test('should convert string to string', () => {
    const result = asString('test');
    expect(result).toBe('test');
  });

  test('should convert number to string', () => {
    const result = asString(10);
    expect(result).toBe('10');
  });

  test('should convert negative number to string', () => {
    const result = asString(-1);
    expect(result).toBe('-1');
  });

  test('should convert zero to string', () => {
    const result = asString(0);
    expect(result).toBe('0');
  });

  test('should convert negative zero to string', () => {
    const result = asString(-0);
    expect(result).toBe('0');
  });

  test('should convert true to string', () => {
    const result = asString(true);
    expect(result).toBe('true');
  });

  test('should convert false to string', () => {
    const result = asString(false);
    expect(result).toBe('false');
  });

  // test('should convert Date to string', () => {
  //   const result = asString(new Date('2019-02-15T00:00:00'));
  //   expect(result).toBe(new Date('2019-02-15T00:00:00').toString());
  // });

  test('should convert null to empty string', () => {
    const result = asString(null);
    expect(result).toBe('');
  });

  test('should convert undefined to empty string', () => {
    const result = asString(undefined);
    expect(result).toBe('');
  });
});

describe('replace', () => {
  test('should replace match string with output string', () => {
    const result = replace('example', 'test')('my example string');
    expect(result).toBe('my test string');
  });

  test('should apply replacer function to match string', () => {
    const result = replace('example', substr => `awesome ${substr}`)('my example string');
    expect(result).toBe('my awesome example string');
  });

  test('should apply replacer function to regex matches', () => {
    const result = replace(/example|test/, substr => `awesome ${substr}`)('my test example string');
    expect(result).toBe('my awesome test example string');
  });

  test('should apply replacer function to regex matches', () => {
    const result = replace(/example|test/g, substr => `awesome ${substr}`)('my test example string');
    expect(result).toBe('my awesome test awesome example string');
  });
});
