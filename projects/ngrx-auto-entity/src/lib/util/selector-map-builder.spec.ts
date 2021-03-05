import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { IEntityState } from './entity-state';
import { makeEntity } from './make-entity';
import { buildSelectorMap } from './selector-map-builder';

expect.extend({
  toBeMemoizedSelector(received) {
    const isFunction = typeof received === 'function';
    const hasProjector = !!received.projector;
    const hasRelease = !!received.release;
    const hasSetResult = !!received.setResult;

    const pass = isFunction && hasProjector && hasRelease && hasSetResult;

    const opts = { isNot: this ? this.isNot : false };
    const message = pass
      ? () =>
          this.utils.matcherHint('toBeMemoizedSelector', undefined, undefined, opts) +
          '\n\n' +
          `Expected: not [Function memoized]` +
          `Received: ${this.utils.printReceived(received)}`
      : () =>
          this.utils.matcherHint('toBeMemoizedSelector', undefined, undefined, opts) +
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

interface ITestState {
  test: IEntityState<Test>;
  alt?: IEntityState<Alt>;
}

const selectorProperties = [
  'selectAll',
  'selectAllSorted',
  'selectCustomSorted',
  'selectEntities',
  'selectIds',
  'selectTotal',
  'selectHasEntities',
  'selectHasNoEntities',
  'selectCurrentEntity',
  'selectCurrentEntityKey',
  'selectCurrentEntities',
  'selectCurrentEntitiesKeys',
  'selectEditedEntity',
  'selectIsDirty',
  'selectCurrentPage',
  'selectCurrentRange',
  'selectTotalPageable',
  'selectIsLoading',
  'selectIsSaving',
  'selectIsDeleting',
  'selectLoadedAt',
  'selectSavedAt',
  'selectCreatedAt',
  'selectUpdatedAt',
  'selectReplacedAt',
  'selectDeletedAt'
];

const testSelectorMap = selectors => selectorProperties.every(prop => selectors.__proto__.hasOwnProperty(prop));

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
    expect(selectorMap).toSatisfy(testSelectorMap);
  });

  describe('selectAll', () => {
    it('should return empty array if no state', () => {
      const store: MockStore<{}> = TestBed.inject(MockStore);

      store.resetSelectors();
      store.setState({});

      const getState = state => state.test;

      const { selectAll } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectAll);
      expect(entities).toBeObservable(hot('a', { a: [] }));
    });

    it('should return empty array if no entities in state', () => {
      const store: MockStore<ITestState> = TestBed.inject(MockStore);

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
      const store: MockStore<ITestState> = TestBed.inject(MockStore);

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
      const store: MockStore<{}> = TestBed.inject(MockStore);

      store.resetSelectors();
      store.setState({});

      const getState = state => state.test;

      const { selectAllSorted } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectAllSorted);
      expect(entities).toBeObservable(hot('a', { a: [] }));
    });

    it('should return empty array if no entities in state', () => {
      const store: MockStore<ITestState> = TestBed.inject(MockStore);

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
      const store: MockStore<ITestState> = TestBed.inject(MockStore);

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
      const store: MockStore<ITestState> = TestBed.inject(MockStore);

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
      const store: MockStore<{}> = TestBed.inject(MockStore);

      store.setState({});

      const getState = state => state.test;

      const { selectCustomSorted } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectCustomSorted, { name: 'test' });
      expect(entities).toBeObservable(hot('a', { a: [] }));
    });

    it('should return empty array if no entities in state', () => {
      const store: MockStore<ITestState> = TestBed.inject(MockStore);

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
      const store: MockStore<ITestState> = TestBed.inject(MockStore);

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
      const store: MockStore<ITestState> = TestBed.inject(MockStore);

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
      const store: MockStore<{}> = TestBed.inject(MockStore);

      store.resetSelectors();
      store.setState({});

      const getState = state => state.test;

      const { selectHasEntities } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectHasEntities);
      expect(entities).toBeObservable(hot('a', { a: false }));
    });

    it('should return false if no entities in state', () => {
      const store: MockStore<ITestState> = TestBed.inject(MockStore);

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
      const store: MockStore<ITestState> = TestBed.inject(MockStore);

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
      const store: MockStore<{}> = TestBed.inject(MockStore);

      store.resetSelectors();
      store.setState({});

      const getState = state => state.test;

      const { selectHasNoEntities } = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(getState);
      const entities = store.select(selectHasNoEntities);
      expect(entities).toBeObservable(hot('a', { a: true }));
    });

    it('should return true if no entities in state', () => {
      const store: MockStore<ITestState> = TestBed.inject(MockStore);

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
      const store: MockStore<ITestState> = TestBed.inject(MockStore);

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
