import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { buildState, NO_ENTITY_DECORATOR_MSG, NO_ENTITY_KEY_MSG, NO_MODEL_NAME_MSG } from './state-builder';

@Entity({ modelName: 'Test' })
class Test {
  @Key id: number;
}

@Entity({ modelName: 'Test2' })
class Test2 {
  @Key key: string;
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

  // eslint-disable-next-line max-len
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
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectHasBeenLoaded'));
    expect(built.selectors).toSatisfy(selectors => selectors.__proto__.hasOwnProperty('selectLoadWasAttempted'));
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
        'State for model Test could not be found! Make sure you add your entity state to the parent state with a property named exactly \'test\'.' // eslint-disable-line
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

  describe('Aspect: Concurrent Entities', () => {
    it('should support proper use of multiple distinct entities created with buildState', () => {
      const {
        initialState: initialTestState,
        entityState: testState,
        facade: testFacadeBase,
        makeEntity: makeTestEntity,
        selectors: {
          selectAllSorted: allTestSorted,
          selectAll: allTest,
          selectIds: testIds,
          selectCurrentEntities: currentTestEntities,
          selectCurrentEntitiesKeys: currentTestEntityKeys,
          selectCurrentEntity: currentTestEntity,
          selectCurrentEntityKey: currentTestEntityKey,
          selectCurrentPage: currentTestPage,
          selectCurrentRange: currentTestRange,
          selectDeletedAt: testDeletedAt,
          selectEditedEntity: testEditedEntity,
          selectEntities: testEntities,
          selectHasEntities: hasTestEntities,
          selectHasNoEntities: hasNoTestEntities,
          selectIsDeleting: testIsDeleting,
          selectIsDirty: testIsDirty,
          selectHasBeenLoaded: testHasBeenLoaded,
          selectLoadWasAttempted: testLoadWasAttempted,
          selectIsLoading: testIsLoading,
          selectIsSaving: testIsSaving,
          selectLoadedAt: testLoadedAt,
          selectReplacedAt: testReplacedAt,
          selectSavedAt: testSavedAt,
          selectTotal: testTotal,
          selectTotalPageable: testTotalPageable,
          selectUpdatedAt: testUpdatedAt,
          selectCreatedAt: testCreatedAt
        }
      } = buildState(Test);

      const {
        initialState: initialTest2State,
        entityState: test2State,
        facade: test2FacadeBase,
        makeEntity: makeTest2Entity,
        selectors: {
          selectAllSorted: allTest2Sorted,
          selectAll: allTest2,
          selectIds: test2Ids,
          selectCurrentEntities: currentTest2Entities,
          selectCurrentEntitiesKeys: currentTest2EntityKeys,
          selectCurrentEntity: currentTest2Entity,
          selectCurrentEntityKey: currentTest2EntityKey,
          selectCurrentPage: currentTest2Page,
          selectCurrentRange: currentTest2Range,
          selectDeletedAt: test2DeletedAt,
          selectEditedEntity: test2EditedEntity,
          selectEntities: test2Entities,
          selectHasEntities: hasTest2Entities,
          selectHasNoEntities: hasNoTest2Entities,
          selectIsDeleting: test2IsDeleting,
          selectIsDirty: test2IsDirty,
          selectHasBeenLoaded: test2HasBeenLoaded,
          selectLoadWasAttempted: test2LoadWasAttempted,
          selectIsLoading: test2IsLoading,
          selectIsSaving: test2IsSaving,
          selectLoadedAt: test2LoadedAt,
          selectReplacedAt: test2ReplacedAt,
          selectSavedAt: test2SavedAt,
          selectTotal: test2Total,
          selectTotalPageable: test2TotalPageable,
          selectUpdatedAt: test2UpdatedAt,
          selectCreatedAt: test2CreatedAt
        }
      } = buildState(Test2);

      const testEntity = makeTestEntity({ id: 1 });
      const test2Entity = makeTest2Entity({ id: '123abc' });

      expect(initialTestState).not.toBe(initialTest2State);
      expect(testState).not.toBe(test2State);
      expect(testFacadeBase).not.toEqual(test2FacadeBase);
      expect(makeTestEntity).not.toEqual(makeTest2Entity);

      expect(testEntity).not.toEqual(test2Entity);

      expect(allTestSorted).not.toEqual(allTest2Sorted);
      expect(allTest).not.toEqual(allTest2);
      expect(testIds).not.toEqual(test2Ids);
      expect(currentTestEntities).not.toEqual(currentTest2Entities);
      expect(currentTestEntityKeys).not.toEqual(currentTest2EntityKeys);
      expect(currentTestEntity).not.toEqual(currentTest2Entity);
      expect(currentTestEntityKey).not.toEqual(currentTest2EntityKey);
      expect(currentTestPage).not.toEqual(currentTest2Page);
      expect(currentTestRange).not.toEqual(currentTest2Range);
      expect(testDeletedAt).not.toEqual(test2DeletedAt);
      expect(testEditedEntity).not.toEqual(test2EditedEntity);
      expect(testEntities).not.toEqual(test2Entities);
      expect(hasTestEntities).not.toEqual(hasTest2Entities);
      expect(hasNoTestEntities).not.toEqual(hasNoTest2Entities);
      expect(testIsDeleting).not.toEqual(test2IsDeleting);
      expect(testIsDirty).not.toEqual(test2IsDirty);
      expect(testHasBeenLoaded).not.toEqual(test2HasBeenLoaded);
      expect(testLoadWasAttempted).not.toEqual(test2LoadWasAttempted);
      expect(testIsLoading).not.toEqual(test2IsLoading);
      expect(testIsSaving).not.toEqual(test2IsSaving);
      expect(testLoadedAt).not.toEqual(test2LoadedAt);
      expect(testReplacedAt).not.toEqual(test2ReplacedAt);
      expect(testSavedAt).not.toEqual(test2SavedAt);
      expect(testTotal).not.toEqual(test2Total);
      expect(testTotalPageable).not.toEqual(test2TotalPageable);
      expect(testUpdatedAt).not.toEqual(test2UpdatedAt);
      expect(testCreatedAt).not.toEqual(test2CreatedAt);
    });
  });
});
