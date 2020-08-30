import { Entity } from '../decorators/entity-decorator';
import { ENTITY_OPTS_PROP, NAE_KEY_NAMES, NAE_KEYS } from '../decorators/entity-tokens';
import { Key } from '../decorators/key-decorator';
import { makeEntity } from './make-entity';

@Entity({
  modelName: 'Test'
})
class Test {
  @Key id: number;
  name: string;
}

describe('makeEntity()', () => {
  it('should return entity with proper prototype', () => {
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
    expect(entity[NAE_KEY_NAMES]).toEqual(['id']);
    expect(entity[NAE_KEYS]).toEqual(['id']);
  });

  it('should make entities efficiently', () => {
    const makeTest = makeEntity(Test);
    const objects = [...Array(100000).keys()].map(id => ({ id, name: `Entity ${id}` }));

    const start = performance.now();
    const entities = objects.map(obj => makeTest(obj));
    const end = performance.now();

    expect(end - start).toBeLessThan(250);
  });
});
