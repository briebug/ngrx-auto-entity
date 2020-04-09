import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { ISelectorMap, Key } from '../..';
import { IEntityState } from './entity-state';
import {
  buildSelectorMap,
  mapToCreatedAt,
  mapToDeletedAt,
  mapToEntityArray,
  mapToLoadedAt,
  mapToSavedAt,
  mapToSortedEntityArray
} from './selector-map-builder';

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
    expect(entities).toEqual([{ id: 1, name: 'test 1' }, { id: 2, name: 'test 2' }]);
  });
});

describe('mapToSortedEntityArray()', () => {
  const compare = (a, b) => a.id - b.id;

  it('should return empty array if all array is falsy', () => {
    const entities = mapToSortedEntityArray(null, compare);
    expect(entities).toEqual([]);
  });

  it('should return sorted array of entity objects', () => {
    const all = [{ id: 2, name: 'test 2' }, { id: 1, name: 'test 1' }];
    const entities = mapToSortedEntityArray(all, compare);
    expect(entities).toEqual([{ id: 1, name: 'test 1' }, { id: 2, name: 'test 2' }]);
  });
});

describe('mapToLoadedAt()', () => {
  it('should return null if state falsy', () => {
    const ts = mapToLoadedAt(null);
    expect(ts).toBeNull();
  });

  it('should return null if loadedAt state is falsy', () => {
    const ts = mapToLoadedAt({ entities: {}, ids: [] });
    expect(ts).toBeNull();
  });

  it('should return Date', () => {
    const now = Date.now();
    const ts = mapToLoadedAt({ entities: {}, ids: [], loadedAt: now });
    expect(ts).toStrictEqual(new Date(now));
  });
});

describe('mapToSavedAt()', () => {
  it('should return null if state falsy', () => {
    const ts = mapToSavedAt(null);
    expect(ts).toBeNull();
  });

  it('should return null if savedAt state is falsy', () => {
    const ts = mapToSavedAt({ entities: {}, ids: [] });
    expect(ts).toBeNull();
  });

  it('should return Date', () => {
    const now = Date.now();
    const ts = mapToSavedAt({ entities: {}, ids: [], savedAt: now });
    expect(ts).toStrictEqual(new Date(now));
  });
});

describe('mapToCreatedAt()', () => {
  it('should return null if state falsy', () => {
    const ts = mapToCreatedAt(null);
    expect(ts).toBeNull();
  });

  it('should return null if createdAt state is falsy', () => {
    const ts = mapToCreatedAt({ entities: {}, ids: [] });
    expect(ts).toBeNull();
  });

  it('should return Date', () => {
    const now = Date.now();
    const ts = mapToCreatedAt({ entities: {}, ids: [], createdAt: now });
    expect(ts).toStrictEqual(new Date(now));
  });
});

describe('mapToDeletedAt()', () => {
  it('should return null if state falsy', () => {
    const ts = mapToDeletedAt(null);
    expect(ts).toBeNull();
  });

  it('should return null if deletedAt state is falsy', () => {
    const ts = mapToDeletedAt({ entities: {}, ids: [] });
    expect(ts).toBeNull();
  });

  it('should return Date', () => {
    const now = Date.now();
    const ts = mapToDeletedAt({ entities: {}, ids: [], deletedAt: now });
    expect(ts).toStrictEqual(new Date(now));
  });
});

class Test {
  @Key id: number;
}

interface ITestState {
  test: IEntityState<Test>;
}

const testSelectorMap: ISelectorMap<ITestState, Test> = {
  selectAll: expect.any(Function),
  selectAllSorted: expect.any(Function),
  selectEntities: expect.any(Function),
  selectIds: expect.any(Function),
  selectTotal: expect.any(Function),
  selectCurrentEntity: expect.any(Function),
  selectCurrentEntityKey: expect.any(Function),
  selectCurrentEntities: expect.any(Function),
  selectCurrentEntitiesKeys: expect.any(Function),
  selectEditedEntity: expect.any(Function),
  selectIsDirty: expect.any(Function),
  selectCurrentPage: expect.any(Function),
  selectCurrentRange: expect.any(Function),
  selectTotalPageable: expect.any(Function),
  selectIsLoading: expect.any(Function),
  selectIsSaving: expect.any(Function),
  selectIsDeleting: expect.any(Function),
  selectLoadedAt: expect.any(Function),
  selectSavedAt: expect.any(Function),
  selectCreatedAt: expect.any(Function),
  selectDeletedAt: expect.any(Function)
};

describe('buildSelectorMap()', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            test: {
              entities: {},
              ids: []
            }
          }
        })
      ]
    });
  });

  it('should create a selector map for the specified state', () => {
    const selectorMap = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(state => state.test);
    expect(selectorMap).toEqual(testSelectorMap);
  });

  describe('selectAll', () => {
    it('should return empty array if no state', () => {
      const store: MockStore<{}> = TestBed.get(Store);

      store.setState({});

      const getState = state => state.test;

      const { selectAll } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectAll);
      expect(entities).toBeObservable(hot('a', { a: [] }));
    });

    it('should return empty array if no entities in state', () => {
      const store: MockStore<ITestState> = TestBed.get(Store);

      store.setState({
        test: {
          entities: {},
          ids: []
        }
      });

      const getState = state => state.test;

      const { selectAll } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectAll);
      expect(entities).toBeObservable(hot('a', { a: [] }));
    });

    it('should return entities in state order', () => {
      const store: MockStore<ITestState> = TestBed.get(Store);

      const entity1 = { id: 1 };
      const entity2 = { id: 2 };
      store.setState({
        test: {
          entities: {
            1: entity1,
            2: entity2
          },
          ids: [2, 1]
        }
      });

      const getState = state => state.test;

      const { selectAll } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectAll);
      expect(entities).toBeObservable(hot('a', { a: [entity2, entity1] }));
    });
  });

  describe('selectAllSorted', () => {
    it('should return empty array if no state', () => {
      const store: MockStore<{}> = TestBed.get(Store);

      store.setState({});

      const getState = state => state.test;

      const { selectAllSorted } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(
        getState,
        (a, b) => a.id - b.id
      );
      const entities = store.select(selectAllSorted);
      expect(entities).toBeObservable(hot('a', { a: [] }));
    });

    it('should return empty array if no entities in state', () => {
      const store: MockStore<ITestState> = TestBed.get(Store);

      store.setState({
        test: {
          entities: {},
          ids: []
        }
      });

      const getState = state => state.test;

      const { selectAllSorted } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(
        getState,
        (a, b) => a.id - b.id
      );
      const entities = store.select(selectAllSorted);
      expect(entities).toBeObservable(hot('a', { a: [] }));
    });

    it('should return entities in state order', () => {
      const store: MockStore<ITestState> = TestBed.get(Store);

      const entity1 = { id: 1 };
      const entity2 = { id: 2 };
      store.setState({
        test: {
          entities: {
            1: entity1,
            2: entity2
          },
          ids: [2, 1]
        }
      });

      const getState = state => state.test;

      const { selectAllSorted } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(
        getState,
        (a, b) => a.id - b.id
      );
      const entities = store.select(selectAllSorted);
      expect(entities).toBeObservable(hot('a', { a: [entity1, entity2] }));
    });
  });
});
