import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { ISelectorMap } from '../util/selector-map';
import { IEntityState } from './entity-state';
import { makeEntity } from './make-entity';
import {
  buildSelectorMap,
  mapToCreatedAt,
  mapToCustomSortedEntityArray,
  mapToDeletedAt,
  mapToEntityArray,
  mapToLoadedAt,
  mapToReplacedAt,
  mapToSavedAt,
  mapToSortedEntityArray,
  mapToUpdatedAt
} from './selector-map-builder';

expect.extend({
  toBeMemoizedSelector(received) {
    const isFunction = typeof received === 'function';
    const hasProjector = !!received.projector;
    const hasRelease = !!received.release;
    const hasSetResult = !!received.setResult;

    const pass = isFunction && hasProjector && hasRelease && hasSetResult;

    const opts = { isNot: this ? this.isNot : false };
    const message = pass
      ? () => this.utils.matcherHint('toBeMemoizedSelector', undefined, undefined, opts) +
        '\n\n' +
        `Expected: not [Function memoized]` +
        `Received: ${this.utils.printReceived(received)}`
      : () => this.utils.matcherHint('toBeMemoizedSelector', undefined, undefined, opts) +
        '\n\n' +
        `Expected: [Function memoized]` +
        `Received: ${this.utils.printReceived(received)}`;

    return { actual: received, message, pass };
  }
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeMemoizedSelector(): R;
    }

    interface Expect {
      toBeMemoizedSelector(): any;
    }
  }
}

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

@Entity({
  modelName: 'Alt'
})
class Alt {
  @Key id: number;
  name: string;
}

const makeTestModel = makeEntity(Test);
const makeAltModel = makeEntity(Alt);

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
  it('should return empty array if all array is falsy', () => {
    const entities = mapToSortedEntityArray(null);
    expect(entities).toEqual([]);
  });

  it('should return sorted array of entity objects', () => {
    const all = [makeTestModel({ id: 2, name: 'test 2' }), makeTestModel({ id: 1, name: 'test 1' })];
    const entities = mapToSortedEntityArray(all);
    expect(entities).toEqual([{ id: 1, name: 'test 1' }, { id: 2, name: 'test 2' }]);
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

describe('mapToUpdatedAt()', () => {
  it('should return null if state falsy', () => {
    const ts = mapToUpdatedAt(null);
    expect(ts).toBeNull();
  });

  it('should return null if updatedAt state is falsy', () => {
    const ts = mapToUpdatedAt({ entities: {}, ids: [] });
    expect(ts).toBeNull();
  });

  it('should return Date', () => {
    const now = Date.now();
    const ts = mapToUpdatedAt({ entities: {}, ids: [], updatedAt: now });
    expect(ts).toStrictEqual(new Date(now));
  });
});

describe('mapToReplacedAt()', () => {
  it('should return null if state falsy', () => {
    const ts = mapToReplacedAt(null);
    expect(ts).toBeNull();
  });

  it('should return null if replacedAt state is falsy', () => {
    const ts = mapToReplacedAt({ entities: {}, ids: [] });
    expect(ts).toBeNull();
  });

  it('should return Date', () => {
    const now = Date.now();
    const ts = mapToReplacedAt({ entities: {}, ids: [], replacedAt: now });
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

interface ITestState {
  test: IEntityState<Test>;
  alt?: IEntityState<Alt>;
}

const testSelectorMap: ISelectorMap<ITestState, Test> = {
  selectAll: expect.toBeMemoizedSelector(),
  selectAllSorted: expect.toBeMemoizedSelector(),
  selectCustomSorted: expect.toBeMemoizedSelector(),
  selectEntities: expect.toBeMemoizedSelector(),
  selectIds: expect.toBeMemoizedSelector(),
  selectTotal: expect.toBeMemoizedSelector(),
  selectHasEntities: expect.toBeMemoizedSelector(),
  selectHasNoEntities: expect.toBeMemoizedSelector(),
  selectCurrentEntity: expect.toBeMemoizedSelector(),
  selectCurrentEntityKey: expect.toBeMemoizedSelector(),
  selectCurrentEntities: expect.toBeMemoizedSelector(),
  selectCurrentEntitiesKeys: expect.toBeMemoizedSelector(),
  selectEditedEntity: expect.toBeMemoizedSelector(),
  selectIsDirty: expect.toBeMemoizedSelector(),
  selectCurrentPage: expect.toBeMemoizedSelector(),
  selectCurrentRange: expect.toBeMemoizedSelector(),
  selectTotalPageable: expect.toBeMemoizedSelector(),
  selectIsLoading: expect.toBeMemoizedSelector(),
  selectIsSaving: expect.toBeMemoizedSelector(),
  selectIsDeleting: expect.toBeMemoizedSelector(),
  selectLoadedAt: expect.toBeMemoizedSelector(),
  selectSavedAt: expect.toBeMemoizedSelector(),
  selectCreatedAt: expect.toBeMemoizedSelector(),
  selectUpdatedAt: expect.toBeMemoizedSelector(),
  selectReplacedAt: expect.toBeMemoizedSelector(),
  selectDeletedAt: expect.toBeMemoizedSelector()
};

const altSelectorMap: ISelectorMap<ITestState, Alt> = {
  selectAll: expect.toBeMemoizedSelector(),
  selectAllSorted: expect.toBeMemoizedSelector(),
  selectCustomSorted: expect.toBeMemoizedSelector(),
  selectEntities: expect.toBeMemoizedSelector(),
  selectIds: expect.toBeMemoizedSelector(),
  selectTotal: expect.toBeMemoizedSelector(),
  selectHasEntities: expect.toBeMemoizedSelector(),
  selectHasNoEntities: expect.toBeMemoizedSelector(),
  selectCurrentEntity: expect.toBeMemoizedSelector(),
  selectCurrentEntityKey: expect.toBeMemoizedSelector(),
  selectCurrentEntities: expect.toBeMemoizedSelector(),
  selectCurrentEntitiesKeys: expect.toBeMemoizedSelector(),
  selectEditedEntity: expect.toBeMemoizedSelector(),
  selectIsDirty: expect.toBeMemoizedSelector(),
  selectCurrentPage: expect.toBeMemoizedSelector(),
  selectCurrentRange: expect.toBeMemoizedSelector(),
  selectTotalPageable: expect.toBeMemoizedSelector(),
  selectIsLoading: expect.toBeMemoizedSelector(),
  selectIsSaving: expect.toBeMemoizedSelector(),
  selectIsDeleting: expect.toBeMemoizedSelector(),
  selectLoadedAt: expect.toBeMemoizedSelector(),
  selectSavedAt: expect.toBeMemoizedSelector(),
  selectCreatedAt: expect.toBeMemoizedSelector(),
  selectUpdatedAt: expect.toBeMemoizedSelector(),
  selectReplacedAt: expect.toBeMemoizedSelector(),
  selectDeletedAt: expect.toBeMemoizedSelector()
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

      store.resetSelectors();
      store.setState({});

      const getState = state => state.test;

      const { selectAll } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectAll);
      expect(entities).toBeObservable(hot('a', { a: [] }));
    });

    it('should return empty array if no entities in state', () => {
      const store: MockStore<ITestState> = TestBed.get(Store);

      store.resetSelectors();
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

      const entity1 = makeTestModel({ id: 1 });
      const entity2 = makeTestModel({ id: 2 });

      store.resetSelectors();
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

      store.resetSelectors();
      store.setState({});

      const getState = state => state.test;

      const { selectAllSorted } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectAllSorted);
      expect(entities).toBeObservable(hot('a', { a: [] }));
    });

    it('should return empty array if no entities in state', () => {
      const store: MockStore<ITestState> = TestBed.get(Store);

      store.resetSelectors();
      store.setState({
        test: {
          entities: {},
          ids: []
        }
      });

      const getState = state => state.test;

      const { selectAllSorted } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectAllSorted);
      expect(entities).toBeObservable(hot('a', { a: [] }));
    });

    it('should return entities in default sorted order', () => {
      const store: MockStore<ITestState> = TestBed.get(Store);

      const entity1 = makeTestModel({ id: 1 });
      const entity2 = makeTestModel({ id: 2 });

      store.resetSelectors();
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

      const { selectAllSorted } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectAllSorted);
      expect(entities).toBeObservable(hot('a', { a: [entity1, entity2] }));
    });

    it('should return entities in state order if no default comparer exists', () => {
      const store: MockStore<ITestState> = TestBed.get(Store);

      const entity1 = makeAltModel({ id: 1 });
      const entity2 = makeAltModel({ id: 2 });

      store.resetSelectors();
      store.setState({
        test: {
          entities: {},
          ids: []
        },
        alt: {
          entities: {
            1: entity1,
            2: entity2
          },
          ids: [2, 1]
        }
      });

      const getState = state => state.alt;

      const { selectAllSorted } = buildSelectorMap<ITestState, IEntityState<Alt>, Alt, unknown>(getState);
      const entities = store.select(selectAllSorted);
      expect(entities).toBeObservable(hot('a', { a: [entity2, entity1] }));
    });
  });

  describe('selectCustomSorted', () => {
    it('should return empty array if no state', () => {
      const store: MockStore<{}> = TestBed.get(Store);

      store.setState({});

      const getState = state => state.test;

      const { selectCustomSorted } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectCustomSorted, { name: 'test' });
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

      const { selectCustomSorted } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectCustomSorted, { name: 'test' });
      expect(entities).toBeObservable(hot('a', { a: [] }));
    });

    it('should return entities in custom sorted order', () => {
      const store: MockStore<ITestState> = TestBed.get(Store);

      const entity1 = makeTestModel({ id: 1, name: 'Test 1' });
      const entity2 = makeTestModel({ id: 2, name: 'Test 2' });

      store.resetSelectors();
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

      const { selectCustomSorted } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectCustomSorted, { name: 'test' });
      expect(entities).toBeObservable(hot('a', { a: [entity1, entity2] }));
    });

    it('should return entities in state order if named comparer does not exist', () => {
      const store: MockStore<ITestState> = TestBed.get(Store);

      const entity1 = makeTestModel({ id: 1, name: 'Test 1' });
      const entity2 = makeTestModel({ id: 2, name: 'Test 2' });

      store.resetSelectors();
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

      const { selectCustomSorted } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectCustomSorted, { name: 'nope' });
      expect(entities).toBeObservable(hot('a', { a: [entity2, entity1] }));
    });
  });

  describe('selectHasEntities', () => {
    it('should return false if no state', () => {
      const store: MockStore<{}> = TestBed.get(Store);

      store.resetSelectors();
      store.setState({});

      const getState = state => state.test;

      const { selectHasEntities } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectHasEntities);
      expect(entities).toBeObservable(hot('a', { a: false }));
    });

    it('should return false if no entities in state', () => {
      const store: MockStore<ITestState> = TestBed.get(Store);

      store.resetSelectors();
      store.setState({
        test: {
          entities: {},
          ids: []
        }
      });

      const getState = state => state.test;

      const { selectHasEntities } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectHasEntities);
      expect(entities).toBeObservable(hot('a', { a: false }));
    });

    it('should return true if entities in state', () => {
      const store: MockStore<ITestState> = TestBed.get(Store);

      const entity1 = makeTestModel({ id: 1 });
      const entity2 = makeTestModel({ id: 2 });

      store.resetSelectors();
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

      const { selectHasEntities } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectHasEntities);
      expect(entities).toBeObservable(hot('a', { a: true }));
    });
  });

  describe('selectHasNoEntities', () => {
    it('should return true if no state', () => {
      const store: MockStore<{}> = TestBed.get(Store);

      store.resetSelectors();
      store.setState({});

      const getState = state => state.test;

      const { selectHasNoEntities } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectHasNoEntities);
      expect(entities).toBeObservable(hot('a', { a: true }));
    });

    it('should return true if no entities in state', () => {
      const store: MockStore<ITestState> = TestBed.get(Store);

      store.resetSelectors();
      store.setState({
        test: {
          entities: {},
          ids: []
        }
      });

      const getState = state => state.test;

      const { selectHasNoEntities } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectHasNoEntities);
      expect(entities).toBeObservable(hot('a', { a: true }));
    });

    it('should return false if entities in state', () => {
      const store: MockStore<ITestState> = TestBed.get(Store);

      const entity1 = makeTestModel({ id: 1 });
      const entity2 = makeTestModel({ id: 2 });

      store.resetSelectors();
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

      const { selectHasNoEntities } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectHasNoEntities);
      expect(entities).toBeObservable(hot('a', { a: false }));
    });
  });
});
