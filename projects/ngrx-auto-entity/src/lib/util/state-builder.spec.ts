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
    const built = buildState(Test);

    expect(built.initialState).toEqual({
      entities: {},
      ids: []
    });
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectAll'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectAllSorted'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectCustomSorted'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectEntities'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectIds'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectTotal'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectHasEntities'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectHasNoEntities'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectCurrentEntity'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectCurrentEntityKey'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectCurrentEntities'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectCurrentEntitiesKeys'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectEditedEntity'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectIsDirty'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectCurrentPage'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectCurrentRange'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectTotalPageable'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectIsLoading'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectIsSaving'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectIsDeleting'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectLoadedAt'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectSavedAt'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectCreatedAt'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectUpdatedAt'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectReplacedAt'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectDeletedAt'));

    expect(built).toSatisfy(build => build.__proto__.hasOwnProperty('reducer'));
    expect(built.reducer).toEqual(expect.any(Function));

    expect(built).toSatisfy(build => build.__proto__.hasOwnProperty('entityState'));
    expect(built.entityState).toEqual(expect.any(Function));

    expect(built).toSatisfy(build => build.__proto__.hasOwnProperty('makeEntity'));
    expect(built.makeEntity).toEqual(expect.any(Function));

    expect(built).toSatisfy(build => build.__proto__.hasOwnProperty('facade'));
    expect(built.facade).toBeTruthy();
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
        // prettier-ignore
        'State for model Test could not be found! Make sure you add your entity state to the parent state with a property named exactly \'test\'.' // tslint:disable-line
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
