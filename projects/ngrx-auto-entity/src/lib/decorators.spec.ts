import { Key, NAE_KEYS } from './decorators';

class TestEntity {
  @Key id: number;
}

describe('NgRX Auto-Entity: Decorators', () => {
  describe('Key', () => {
    it(`should attach ${NAE_KEYS} property to target`, () => {
      const myEntity = {};
      Key(myEntity, 'test');
      expect(myEntity[NAE_KEYS]).toBeDefined();
    });
  });

  describe('@Key', () => {
    it(`should attach ${NAE_KEYS} property to target`, () => {
      const myEntity = new TestEntity();
      expect(myEntity[NAE_KEYS]).toBeDefined();
    });
  });

  describe('NAE_KEYS', () => {
    it(`should return name key property`, () => {
      const myEntity = new TestEntity();
      const keyNames = myEntity[NAE_KEYS];
      expect(keyNames.length).toBe(1);
      expect(keyNames[0]).toBe('id');
    });
  });
});
