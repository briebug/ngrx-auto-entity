import { Key, NAE_ID } from './decorators';

class TestEntity {
  @Key id: number;
}

describe('NgRX Auto-Entity: Decorators', () => {
  describe('Key', () => {
    it(`should attach ${NAE_ID} property to target`, () => {
      const myEntity = {};
      Key(myEntity, 'test');
      expect(myEntity[NAE_ID]).toBeDefined();
    });
  });

  describe('@Key', () => {
    it(`should attach ${NAE_ID} property to target`, () => {
      const myEntity = new TestEntity();
      expect(myEntity[NAE_ID]).toBeDefined();
    });
  });

  describe('NAE_ID', () => {
    it(`should return name key property`, () => {
      const myEntity = new TestEntity();
      const keyName = myEntity[NAE_ID];
      expect(keyName).toBe('id');
    });
  });
});
