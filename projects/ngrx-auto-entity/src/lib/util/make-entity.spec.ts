import { Entity, ENTITY_OPTS_PROP, Key } from '../..';
import { makeEntity } from './make-entity';

@Entity({
  modelName: 'Test'
})
class Test {
  @Key id: number;
  name: string;
}

describe('makeEntity()', () => {
  it('should return undefined if input type is falsy', () => {
    const makeTest = makeEntity(Test);
    const entity = makeTest({
      id: 1,
      name: 'Test 1'
    });

    expect(entity).toEqual({
      id: 1,
      name: 'Test 1'
    });
    expect(entity.constructor[ENTITY_OPTS_PROP]).toEqual({
      modelName: 'Test'
    });
  });
});
