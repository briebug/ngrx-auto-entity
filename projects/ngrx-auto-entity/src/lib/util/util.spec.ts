import { TestBed } from '@angular/core/testing';
import { createFeatureSelector, Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { Key } from '../decorators/key';
import { IEntityState } from './entity-state';
import { buildFacade } from './facade-builder';
import { ISelectorMap } from './selector-map';
import { buildSelectorMap } from './selector-map-builder';
import { buildFeatureState, buildState } from './state-builder';
import { FEATURE_AFFINITY } from './util-tokens';

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

describe('Utilities', () => {
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

  describe('Function: buildSelectorMap', () => {
    it('should create a selector map for the specified state', () => {
      const selectorMap = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(state => state.test);
      expect(selectorMap).toEqual(testSelectorMap);
    });
  });

  describe('Function: buildFacade', () => {
    it('should create base facade class', () => {
      const selectors = buildSelectorMap<ITestState, IEntityState<Test>, Test, unknown>(state => state.test);
      const TestFacade = buildFacade<Test, ITestState>(selectors);

      expect(TestFacade.constructor).toBeTruthy();

      const store = TestBed.get(Store) as Store<ITestState>;
      const facadeInstance = new TestFacade(Test, store);
      expect(facadeInstance).toBeInstanceOf(TestFacade);
    });
  });

  describe('Function: buildState', () => {
    it('should create root state facilities', () => {
      const { initialState, selectors, facade: FacadeBase, reducer, entityState } = buildState(Test);

      const store = TestBed.get(Store) as Store<ITestState>;
      const facade = new FacadeBase(Test, store);

      expect(initialState).toEqual({
        entities: {},
        ids: []
      });
      expect(selectors).toEqual(testSelectorMap);
      expect(FacadeBase.constructor).toBeTruthy();
      expect(facade).toBeInstanceOf(FacadeBase);
      expect(reducer).toEqual(expect.any(Function));
      expect(entityState).toEqual(expect.any(Function));
    });
  });

  describe('Function: buildFeatureState', () => {
    it('should create feature state facilities', () => {
      const store = TestBed.get(Store) as Store<ITestFeatureState>;
      const featureSelector = createFeatureSelector('feature');

      const { initialState, selectors, facade: FacadeBase, reducer, entityState } = buildFeatureState(
        Test,
        'feature',
        featureSelector
      );

      const facade = new FacadeBase(Test, store);

      expect(Test[FEATURE_AFFINITY]).toBe('feature');

      expect(initialState).toEqual({
        entities: {},
        ids: []
      });
      expect(selectors).toEqual(testSelectorMap);
      expect(FacadeBase.constructor).toBeTruthy();
      expect(facade).toBeInstanceOf(FacadeBase);
      expect(reducer).toEqual(expect.any(Function));
      expect(entityState).toEqual(expect.any(Function));
    });
  });
});
