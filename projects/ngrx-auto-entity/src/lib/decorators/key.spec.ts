import { getKey, getKeyFromModel, Load, LoadAll } from '../..';
import { makeEntity } from '../util/make-entity';
import {
  getKeyFromEntity,
  getKeyNames,
  getKeyNamesFromEntity,
  getKeyNamesFromModel,
  Key,
  NAE_KEY_NAMES,
  NAE_KEYS
} from './key';

class TestEntity {
  @Key id: number;
}

class CompositeEntity {
  @Key key1: number;
  @Key key2: string;
}

const makeTestEntity = makeEntity(TestEntity);
const makeCompositeEntity = makeEntity(CompositeEntity);

describe('Function: Key', () => {
  test(`should attach ${NAE_KEYS} property to target`, () => {
    const myEntity = {};
    Key(myEntity, 'test');
    expect(myEntity[NAE_KEYS]).toBeDefined();
  });
});

describe('Decorator: @Key', () => {
  test(`should attach ${NAE_KEYS} property to target`, () => {
    const myEntity = new TestEntity();
    expect(myEntity[NAE_KEYS]).toBeDefined();
  });

  test(`should return name key property`, () => {
    const myEntity = new TestEntity();
    const keyNames = myEntity[NAE_KEYS];
    expect(keyNames.length).toBe(1);
    expect(keyNames[0]).toBe('id');
  });
});

describe('Constant: NAE_KEYS', () => {
  test('should equal "__nae_keys"', () => {
    expect(NAE_KEYS).toBe('__nae_keys');
  });
});

describe('Constant: NAE_KEY_NAMES', () => {
  test('should equal "__nae_key_names"', () => {
    expect(NAE_KEY_NAMES).toBe('__nae_key_names');
  });
});

describe('Function: getKeyNames()', () => {
  it('should log a console error and return empty array if action is falsy', () => {
    const errorSpy = jest.spyOn(console, 'error');
    const names = getKeyNames(undefined);

    expect(names.length).toBe(0);
    expect(errorSpy).toHaveBeenCalled();
  });

  it('should return primary key from a single-key model type', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockClear();
    const action = new LoadAll(TestEntity);
    const names = getKeyNames(action);

    expect(names).toEqual(['id']);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should return primary key from a composite-key model type', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockClear();
    const action = new LoadAll(CompositeEntity);
    const names = getKeyNames(action);

    expect(names).toEqual(['key1', 'key2']);
    expect(errorSpy).not.toHaveBeenCalled();
  });
});

describe('Function: getKeyNamesFromModel()', () => {
  it('should log a console error and return empty array if type is falsy', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockClear();
    const names = getKeyNamesFromModel(undefined);

    expect(names.length).toBe(0);
    expect(errorSpy).toHaveBeenCalled();
  });

  it('should return primary key from a single-key model type', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockClear();
    const names = getKeyNamesFromModel(TestEntity);

    expect(names).toEqual(['id']);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should return primary key from a composite-key model type', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockClear();
    const names = getKeyNamesFromModel(CompositeEntity);

    expect(names).toEqual(['key1', 'key2']);
    expect(errorSpy).not.toHaveBeenCalled();
  });
});

describe('Function: getKeyNamesFromEntity()', () => {
  it('should log a console error and return empty array if type is falsy', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockClear();
    const names = getKeyNamesFromEntity(undefined);

    expect(names.length).toBe(0);
    expect(errorSpy).toHaveBeenCalled();
  });

  it('should return primary key from a single-key model type', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockClear();
    const entity = makeTestEntity({
      id: 1,
      name: 'Test'
    });
    const names = getKeyNamesFromEntity(entity);

    expect(names).toEqual(['id']);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should return primary key from a composite-key model type', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockClear();
    const entity = makeCompositeEntity({
      key1: 1,
      key2: 'Test'
    });
    const names = getKeyNamesFromEntity(entity);

    expect(names).toEqual(['key1', 'key2']);
    expect(errorSpy).not.toHaveBeenCalled();
  });
});

describe('Function: getKey()', () => {
  it('should log a console error and return empty array if action is falsy', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockClear();
    const key = getKey(undefined, undefined);

    expect(key).toBeUndefined();
    expect(errorSpy).toHaveBeenCalled();
  });

  it('should log a console error and return empty array if entity is falsy', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockClear();
    const key = getKey(new Load(TestEntity), undefined);

    expect(key).toBeUndefined();
    expect(errorSpy).toHaveBeenCalled();
  });

  it('should return primary key from a single-key entity', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockClear();
    const entity = makeTestEntity({
      id: 1,
      name: 'Test'
    });
    const key = getKey(new Load(TestEntity), entity);

    expect(key).toEqual(1);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should return primary key from a composite-key model type', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockClear();
    const entity = makeCompositeEntity({
      key1: 1,
      key2: 'Test'
    });
    const key = getKey(new Load(CompositeEntity), entity);

    expect(key).toEqual('1_Test');
    expect(errorSpy).not.toHaveBeenCalled();
  });
});

describe('Function: getKeyFromModel()', () => {
  it('should log a console error and return empty array if model is falsy', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockClear();
    const key = getKeyFromModel(undefined, undefined);

    expect(key).toBeUndefined();
    expect(errorSpy).toHaveBeenCalled();
  });

  it('should log a console error and return empty array if entity is falsy', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockClear();
    const key = getKeyFromModel(TestEntity, undefined);

    expect(key).toBeUndefined();
    expect(errorSpy).toHaveBeenCalled();
  });

  it('should return primary key from a single-key entity', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockClear();
    const entity = makeTestEntity({
      id: 1,
      name: 'Test'
    });
    const key = getKeyFromModel(TestEntity, entity);

    expect(key).toEqual(1);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should return primary key from a composite-key model type', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockClear();
    const entity = makeCompositeEntity({
      key1: 1,
      key2: 'Test'
    });
    const key = getKeyFromModel(CompositeEntity, entity);

    expect(key).toEqual('1_Test');
    expect(errorSpy).not.toHaveBeenCalled();
  });
});

describe('Function: getKeyFromEntity()', () => {
  it('should log a console error and return empty array if entity is falsy', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockClear();
    const key = getKeyFromEntity(undefined);

    expect(key).toBeUndefined();
    expect(errorSpy).toHaveBeenCalled();
  });

  it('should return primary key from a single-key entity', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockClear();
    const entity = makeTestEntity({
      id: 1,
      name: 'Test'
    });
    const key = getKeyFromEntity(entity);

    expect(key).toEqual(1);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should return primary key from a composite-key entity', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockClear();
    const entity = makeCompositeEntity({
      key1: 1,
      key2: 'Test'
    });
    const key = getKeyFromEntity(entity);

    expect(key).toEqual('1_Test');
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
