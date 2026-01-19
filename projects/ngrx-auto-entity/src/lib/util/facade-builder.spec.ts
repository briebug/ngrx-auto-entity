import { isSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { buildFacade } from './facade-builder';
import { makeEntity } from './make-entity';
import { ISelectorMap } from './selector-map';
import { buildSelectorMap } from './selector-map-builder';
import { NGRX_AUTO_ENTITY_APP_STORE } from '../effects/if-necessary-operator-utils';
import { firstValueFrom, isObservable } from 'rxjs';
import { IEntityFacade } from './facade';

@Entity({
  modelName: 'Test'
})
class Test {
  @Key id: number;
  name: string;
}

const makeTestModel = makeEntity(Test);

describe('buildFacade()', () => {
  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting(), {
      teardown: { destroyAfterEach: false }
    });
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            test: {
              entities: {},
              ids: []
            }
          }
        }),
        { provide: NGRX_AUTO_ENTITY_APP_STORE, useExisting: MockStore }
      ]
    }).compileComponents();
  });

  it('should return a new dynamic class', () => {
    const FacadeBaseClass = buildFacade({} as ISelectorMap<Test, any>, Test);
    expect(FacadeBaseClass.constructor).toBeDefined();

    expect(Object.getOwnPropertyNames(FacadeBaseClass.prototype)).toEqual([
      'constructor',
      'select',
      'selectByKey',
      'selectMany',
      'selectMore',
      'selectManyByKeys',
      'selectMoreByKeys',
      'deselect',
      'deselectMany',
      'deselectManyByKeys',
      'deselectAll',
      'edit',
      'editNew',
      'editByKey',
      'change',
      'endEdit',
      'load',
      'loadIfNecessary',
      'loadMany',
      'loadManyIfNecessary',
      'loadAll',
      'loadAllIfNecessary',
      'loadPage',
      'loadPageIfNecessary',
      'loadRange',
      'loadRangeIfNecessary',
      'create',
      'createMany',
      'update',
      'updateMany',
      'upsert',
      'upsertMany',
      'replace',
      'replaceMany',
      'delete',
      'deleteMany',
      'deleteByKey',
      'deleteManyByKeys',
      'clear'
    ]);
  });

  it('should have selection properties when creating new instances of facade class', () => {
    const store: MockStore = TestBed.inject(MockStore);
    const selectorMap = buildSelectorMap(state => state.test, Test);
    const FacadeBaseClass = buildFacade(selectorMap, Test);
    const facade = TestBed.runInInjectionContext(() => new FacadeBaseClass(Test, store));
    expect(facade).toBeDefined();

    expect(Object.getOwnPropertyNames(facade)).toEqual([
      'modelType',
      'store',
      'all$',
      'sorted$',
      'entities$',
      'ids$',
      'total$',
      'hasEntities$',
      'hasNoEntities$',
      'current$',
      'currentKey$',
      'currentSet$',
      'currentSetKeys$',
      'edited$',
      'isDirty$',
      'currentPage$',
      'currentRange$',
      'totalPageable$',
      'hasBeenLoaded$',
      'loadWasAttempted$',
      'isLoading$',
      'isSaving$',
      'isDeleting$',
      'loadedAt$',
      'savedAt$',
      'createdAt$',
      'updatedAt$',
      'replacedAt$',
      'deletedAt$',
      'all',
      'sorted',
      'entities',
      'ids',
      'total',
      'hasEntities',
      'hasNoEntities',
      'current',
      'currentKey',
      'currentSet',
      'currentSetKeys',
      'edited',
      'isDirty',
      'currentPage',
      'currentRange',
      'totalPageable',
      'hasBeenLoaded',
      'loadWasAttempted',
      'isLoading',
      'isSaving',
      'isDeleting',
      'loadedAt',
      'savedAt',
      'createdAt',
      'updatedAt',
      'replacedAt',
      'deletedAt'
    ]);

    expect(Object.getOwnPropertyNames(Object.getPrototypeOf(facade))).toEqual([
      'constructor',
      'select',
      'selectByKey',
      'selectMany',
      'selectMore',
      'selectManyByKeys',
      'selectMoreByKeys',
      'deselect',
      'deselectMany',
      'deselectManyByKeys',
      'deselectAll',
      'edit',
      'editNew',
      'editByKey',
      'change',
      'endEdit',
      'load',
      'loadIfNecessary',
      'loadMany',
      'loadManyIfNecessary',
      'loadAll',
      'loadAllIfNecessary',
      'loadPage',
      'loadPageIfNecessary',
      'loadRange',
      'loadRangeIfNecessary',
      'create',
      'createMany',
      'update',
      'updateMany',
      'upsert',
      'upsertMany',
      'replace',
      'replaceMany',
      'delete',
      'deleteMany',
      'deleteByKey',
      'deleteManyByKeys',
      'clear'
    ]);
  });

  it('should allow creating new instances of facade class with a modelType and store', () => {
    const store: MockStore = TestBed.inject(MockStore);
    const selectorMap = buildSelectorMap(state => state.test, Test);
    const FacadeBaseClass = buildFacade(selectorMap, Test);
    const facade = TestBed.runInInjectionContext(() => new FacadeBaseClass(Test, store));
    expect(facade).toBeDefined();
  });

  it('should allow creating new instances of facade class without arguments', () => {
    const selectorMap = buildSelectorMap(state => state.test, Test);
    const FacadeBaseClass = buildFacade(selectorMap, Test);
    const facade = TestBed.runInInjectionContext(() => new FacadeBaseClass());
    expect(facade).toBeDefined();
  });

  describe('selectors', () => {
    let facade: IEntityFacade<Test>;

    beforeEach(() => {
      const selectorMap = buildSelectorMap(state => state.test, Test);
      const FacadeBaseClass = buildFacade(selectorMap, Test);
      facade = TestBed.runInInjectionContext(() => new FacadeBaseClass());
      expect(facade).toBeDefined();
    });

    it.each([
      'all$',
      'sorted$',
      'entities$',
      'ids$',
      'total$',
      'hasEntities$',
      'hasNoEntities$',
      'current$',
      'currentKey$',
      'currentSet$',
      'currentSetKeys$',
      'edited$',
      'isDirty$',
      'currentPage$',
      'currentRange$',
      'totalPageable$',
      'hasBeenLoaded$',
      'loadWasAttempted$',
      'isLoading$',
      'isSaving$',
      'isDeleting$',
      'loadedAt$',
      'savedAt$',
      'createdAt$',
      'updatedAt$',
      'replacedAt$',
      'deletedAt$'
    ])('should have the observable selector property "%s"', selectorProp => {
      expect(facade[selectorProp]).toSatisfy(isObservable);
    });

    it.each([
      'all',
      'sorted',
      'entities',
      'ids',
      'total',
      'hasEntities',
      'hasNoEntities',
      'current',
      'currentKey',
      'currentSet',
      'currentSetKeys',
      'edited',
      'isDirty',
      'currentPage',
      'currentRange',
      'totalPageable',
      'hasBeenLoaded',
      'loadWasAttempted',
      'isLoading',
      'isSaving',
      'isDeleting',
      'loadedAt',
      'savedAt',
      'createdAt',
      'updatedAt',
      'replacedAt',
      'deletedAt'
    ])('should have the signal selector property "%s"', selectorProp => {
      expect(facade[selectorProp]).toSatisfy(isSignal);
    });

    it.each([
      ['all$', 'all'],
      ['sorted$', 'sorted'],
      ['entities$', 'entities'],
      ['ids$', 'ids'],
      ['total$', 'total'],
      ['hasEntities$', 'hasEntities'],
      ['hasNoEntities$', 'hasNoEntities'],
      ['current$', 'current'],
      ['currentKey$', 'currentKey'],
      ['currentSet$', 'currentSet'],
      ['currentSetKeys$', 'currentSetKeys'],
      ['edited$', 'edited'],
      ['isDirty$', 'isDirty'],
      ['currentPage$', 'currentPage'],
      ['currentRange$', 'currentRange'],
      ['totalPageable$', 'totalPageable'],
      ['hasBeenLoaded$', 'hasBeenLoaded'],
      ['loadWasAttempted$', 'loadWasAttempted'],
      ['isLoading$', 'isLoading'],
      ['isSaving$', 'isSaving'],
      ['isDeleting$', 'isDeleting'],
      ['loadedAt$', 'loadedAt'],
      ['savedAt$', 'savedAt'],
      ['createdAt$', 'createdAt'],
      ['updatedAt$', 'updatedAt'],
      ['replacedAt$', 'replacedAt'],
      ['deletedAt$', 'deletedAt']
    ])('should return the exact same value "%s" and "%s"', async (observable, signal) => {
      const store = TestBed.inject(MockStore);

      const entity1 = makeTestModel({ id: 1 });
      const entity2 = makeTestModel({ id: 2 });

      const now = Date.now();

      store.resetSelectors();
      store.setState({
        test: {
          entities: {
            1: entity1,
            2: entity2
          },
          ids: [1, 2],
          selections: {
            currentEntityKey: 1
          },
          edits: {
            editedEntity: {
              id: 1
            },
            isDirty: false
          },
          paging: {
            currentPage: {
              page: 1,
              size: 10
            },
            totalPageableCount: 2
          },
          tracking: {
            isLoading: false,
            isSaving: false,
            isDeleting: false,
            loadedAt: now,
            savedAt: now,
            createdAt: now,
            updatedAt: now,
            replacedAt: now,
            deletedAt: now
          }
        }
      });

      const a = await firstValueFrom(facade[observable]);
      const b = facade[signal]();
      expect(a).toBe(b);
    });
  });
});
