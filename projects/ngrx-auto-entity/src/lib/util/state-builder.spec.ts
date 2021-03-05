import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { buildState, NO_ENTITY_DECORATOR_MSG, NO_ENTITY_KEY_MSG, NO_MODEL_NAME_MSG } from './state-builder';

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

@Entity({ modelName: 'Test' })
class Test {
  @Key id: number;
}

@Entity({ modelName: '' })
class NoModelName {
  @Key id: number;
}

@Entity({ modelName: 'NoKey' })
class NoKey {}

class NonEntity {}

describe('buildState()', () => {
  it('should throw exception if entity is not decorated', () => {
    expect(() => buildState(NonEntity)).toThrow(NO_ENTITY_DECORATOR_MSG);
  });

  it('should throw exception if entity has no key', () => {
    expect(() => buildState(NoKey)).toThrow(NO_ENTITY_KEY_MSG);
  });

  it('should throw exception if entity has no modelName', () => {
    expect(() => buildState(NoModelName)).toThrow(NO_MODEL_NAME_MSG);
  });

  // tslint:disable-next-line:max-line-length
  it('should return an object with initial state, selectors, the root entity state, a makeEntity function, a reducer and a base facade class', () => {
    const state = buildState(Test);

    expect(state.initialState).toEqual({
      entities: {},
      ids: []
    });
    expect(state.selectors).toEqual({
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
    });
    expect(state.reducer).toEqual(expect.any(Function));
    expect(state.entityState).toEqual(expect.any(Function));
    expect(state.makeEntity).toEqual(expect.any(Function));
    expect(state.facade).toBeTruthy();
  });

  it('should include extra state in initial state', () => {
    const state = buildState(Test, {
      extra: 'state',
      number: 1
    });

    expect(state.initialState).toEqual({
      entities: {},
      ids: [],
      extra: 'state',
      number: 1
    });
  });

  describe('entityState', () => {
    it('should throw exception if parent state does not have a property matching the name of camelCase(@Entity.modelName)', () => {
      const state = buildState(Test);
      expect(() => state.entityState({})).toThrow(
        // tslint:disable-next-line:max-line-length
        'State for model Test could not be found! Make sure you add your entity state to the parent state with a property named exactly \'test\'.'
      );
    });
  });

  describe('makeEntity', () => {
    it('should return a function to make entities of the specified model type', () => {
      const { makeEntity: makeTest } = buildState(Test);
      const entity = makeTest({
        id: 101
      });

      expect(Object.getPrototypeOf(entity)).toEqual(Test.prototype);
    });
  });
});
