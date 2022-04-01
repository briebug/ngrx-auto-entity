import { Entity, Key, makeEntity } from '../..';
import { mapToCustomSortedEntityArray, mapToEntityArray, mapToSortedEntityArray } from './entity.selectors';
import { mapToCreatedAt, mapToDeletedAt, mapToLoadedAt, mapToReplacedAt, mapToSavedAt, mapToUpdatedAt } from './tracking.selectors';

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

describe('mapToLoadedAt()', () => {
  it('should return undefined if state falsy', () => {
    const ts = mapToLoadedAt(null);
    expect(ts).toBeUndefined();
  });

  it('should return undefined if loadedAt state is falsy', () => {
    const ts = mapToLoadedAt({});
    expect(ts).toBeUndefined();
  });

  it('should return Date', () => {
    const now = Date.now();
    const ts = mapToLoadedAt({ loadedAt: now });
    expect(ts).toStrictEqual(new Date(now));
  });
});

describe('mapToSavedAt()', () => {
  it('should return undefined if state falsy', () => {
    const ts = mapToSavedAt(null);
    expect(ts).toBeUndefined();
  });

  it('should return undefined if savedAt state is falsy', () => {
    const ts = mapToSavedAt({});
    expect(ts).toBeUndefined();
  });

  it('should return Date', () => {
    const now = Date.now();
    const ts = mapToSavedAt({ savedAt: now });
    expect(ts).toStrictEqual(new Date(now));
  });
});

describe('mapToCreatedAt()', () => {
  it('should return undefined if state falsy', () => {
    const ts = mapToCreatedAt(null);
    expect(ts).toBeUndefined();
  });

  it('should return undefined if createdAt state is falsy', () => {
    const ts = mapToCreatedAt({});
    expect(ts).toBeUndefined();
  });

  it('should return Date', () => {
    const now = Date.now();
    const ts = mapToCreatedAt({ createdAt: now });
    expect(ts).toStrictEqual(new Date(now));
  });
});

describe('mapToUpdatedAt()', () => {
  it('should return undefined if state falsy', () => {
    const ts = mapToUpdatedAt(null);
    expect(ts).toBeUndefined();
  });

  it('should return undefined if updatedAt state is falsy', () => {
    const ts = mapToUpdatedAt({});
    expect(ts).toBeUndefined();
  });

  it('should return Date', () => {
    const now = Date.now();
    const ts = mapToUpdatedAt({ updatedAt: now });
    expect(ts).toStrictEqual(new Date(now));
  });
});

describe('mapToReplacedAt()', () => {
  it('should return undefined if state falsy', () => {
    const ts = mapToReplacedAt(null);
    expect(ts).toBeUndefined();
  });

  it('should return undefined if replacedAt state is falsy', () => {
    const ts = mapToReplacedAt({});
    expect(ts).toBeUndefined();
  });

  it('should return Date', () => {
    const now = Date.now();
    const ts = mapToReplacedAt({ replacedAt: now });
    expect(ts).toStrictEqual(new Date(now));
  });
});

describe('mapToDeletedAt()', () => {
  it('should return undefined if state falsy', () => {
    const ts = mapToDeletedAt(null);
    expect(ts).toBeUndefined();
  });

  it('should return undefined if deletedAt state is falsy', () => {
    const ts = mapToDeletedAt({});
    expect(ts).toBeUndefined();
  });

  it('should return Date', () => {
    const now = Date.now();
    const ts = mapToDeletedAt({ deletedAt: now });
    expect(ts).toStrictEqual(new Date(now));
  });
});
