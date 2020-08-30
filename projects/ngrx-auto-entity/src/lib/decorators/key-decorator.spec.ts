import { NAE_KEYS } from './entity-tokens';
import { Key } from './key-decorator';

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
