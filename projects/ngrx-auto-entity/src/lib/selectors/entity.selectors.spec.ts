import { Entity, Key, makeEntity } from '../..';
import { mapToCustomSortedEntityArray, mapToEntityArray, mapToSortedEntityArray } from './entity.selectors';

@Entity({
  modelName: 'Test',
  comparer: (a, b) => a.id - b.id,
  comparers: {
    test: (a, b) => a.name.localeCompare(b.name)
  }
})
class Test {
  @Key id: number;
  name: string;
}

const makeTestModel = makeEntity(Test);

describe('mapToEntityArray()', () => {
  it('should return empty array if entities is falsy', () => {
    const entities = mapToEntityArray(null, []);
    expect(entities).toEqual([]);
  });

  it('should return empty array if ids is falsy', () => {
    const entities = mapToEntityArray({}, null);
    expect(entities).toEqual([]);
  });

  it('should return empty array if ids is empty', () => {
    const entities = mapToEntityArray({ 1: { id: 1, name: 'test' } }, []);
    expect(entities).toEqual([]);
  });

  it('should return array of entity objects', () => {
    const entities = mapToEntityArray({ 1: { id: 1, name: 'test 1' }, 2: { id: 2, name: 'test 2' } }, [1, 2]);
    expect(entities).toEqual([
      { id: 1, name: 'test 1' },
      { id: 2, name: 'test 2' }
    ]);
  });
});

describe('mapToSortedEntityArray()', () => {
  it('should return empty array if all array is falsy', () => {
    const entities = mapToSortedEntityArray(null);
    expect(entities).toEqual([]);
  });

  it('should return sorted array of entity objects', () => {
    const all = [makeTestModel({ id: 2, name: 'test 2' }), makeTestModel({ id: 1, name: 'test 1' })];
    const entities = mapToSortedEntityArray(all);
    expect(entities).toEqual([
      { id: 1, name: 'test 1' },
      { id: 2, name: 'test 2' }
    ]);
  });
});

describe('mapToCustomSortedEntityArray()', () => {
  it('should return empty array if all array is falsy', () => {
    const entities = mapToCustomSortedEntityArray(null, { name: '' });
    expect(entities).toEqual([]);
  });

  it('should return sorted array of entity objects', () => {
    const all = [makeTestModel({ id: 2, name: 'test 2' }), makeTestModel({ id: 1, name: 'test 1' })];
    const entities = mapToCustomSortedEntityArray(all, { name: 'test' });
    expect(entities).toEqual([
      { id: 1, name: 'test 1' },
      { id: 2, name: 'test 2' }
    ]);
  });
});
