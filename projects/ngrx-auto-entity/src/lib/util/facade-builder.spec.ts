import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { buildFacade } from './facade-builder';
import { makeEntity } from './make-entity';
import { ISelectorMap } from './selector-map';
import { buildSelectorMap } from './selector-map-builder';

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
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
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
        })
      ]
    }).compileComponents();
  });

  it('should return a new dynamic class', () => {
    const FacadeBaseClass = buildFacade({} as ISelectorMap<Test, any>);
    expect(FacadeBaseClass.constructor).toBeDefined();

    expect(Object.getOwnPropertyNames(FacadeBaseClass.prototype)).toEqual([
      'constructor',
      'customSorted$',
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
    const FacadeBaseClass = buildFacade(selectorMap);
    const facade = new FacadeBaseClass(Test, store);
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
      'deletedAt$'
    ]);

    expect(Object.getOwnPropertyNames(Object.getPrototypeOf(facade))).toEqual([
      'constructor',
      'customSorted$',
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
});
