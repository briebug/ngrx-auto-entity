import { Key, NAE_KEY_NAMES, NAE_KEYS } from './key';

class TestEntity {
  @Key id: number;
}

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
