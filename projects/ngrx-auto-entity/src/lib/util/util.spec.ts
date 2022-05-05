import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { createFeatureSelector, Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { IEntityState } from './entity-state';
import { buildFacade } from './facade-builder';
import { buildSelectorMap } from './selector-map-builder';
import { buildFeatureState, buildState } from './state-builder';
import { FEATURE_AFFINITY } from './util-tokens';

@Entity({ modelName: 'Test' })
class Test {
  @Key id: number;
}

interface ITestState {
  test: IEntityState<Test>;
}

interface ITestFeatureState {
  feature: {
    test: IEntityState<Test>;
  };
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
  'selectHasBeenLoaded',
  'selectLoadWasAttempted',
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

describe('Utilities', () => {
  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            test: {
              entities: {},
              ids: []
            },
            feature: {
              test: {
                entities: {},
                ids: []
              }
            }
          }
        })
      ]
    });
  });

  describe('Function: buildSelectorMap', () => {
    it('should create a selector map for the specified state', () => {
      const selectorMap = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(state => state.test);
      expect(selectorMap).toSatisfy(testSelectorMap);
    });
  });

  describe('Function: buildFacade', () => {
    it('should create base facade class', () => {
      const selectors = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(state => state.test);
      const TestFacade = buildFacade<Test, ITestState>(selectors);

      expect(TestFacade.constructor).toBeTruthy();

      const store = TestBed.inject(Store) as Store<ITestState>;
      const facadeInstance = new TestFacade(Test, store);
      expect(facadeInstance).toBeInstanceOf(TestFacade);
    });
  });

  describe('Function: buildState', () => {
    it('should create root state facilities', () => {
      const { initialState, selectors, facade: FacadeBase, reducer, entityState } = buildState(Test);

      const store = TestBed.inject(Store) as Store<ITestState>;
      const facade = new FacadeBase(Test, store);

      expect(initialState).toEqual({
        entities: {},
        ids: []
      });
      expect(selectors).toSatisfy(testSelectorMap);
      expect(FacadeBase.constructor).toBeTruthy();
      expect(facade).toBeInstanceOf(FacadeBase);
      expect(reducer).toEqual(expect.any(Function));
      expect(entityState).toEqual(expect.any(Function));
    });
  });

  describe('Function: buildFeatureState', () => {
    it('should create feature state facilities', () => {
      const store = TestBed.inject(Store) as Store<ITestFeatureState>;
      const featureSelector = createFeatureSelector('feature');

      const { initialState, selectors, facade: FacadeBase, reducer, entityState } = buildFeatureState(Test, 'feature', featureSelector);

      const facade = new FacadeBase(Test, store);

      expect(Test[FEATURE_AFFINITY]).toBe('feature');

      expect(initialState).toEqual({
        entities: {},
        ids: []
      });
      expect(selectors).toSatisfy(testSelectorMap);
      expect(FacadeBase.constructor).toBeTruthy();
      expect(facade).toBeInstanceOf(FacadeBase);
      expect(reducer).toEqual(expect.any(Function));
      expect(entityState).toEqual(expect.any(Function));
    });
  });
});
