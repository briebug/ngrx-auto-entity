import { Injector, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { createReducer, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setInfo } from '../actions/util';
import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { NgrxAutoEntityModule } from '../module';
import { IEntityState } from '../util/entity-state';
import { IAutoEntityService } from './interface';
import { getInjectors } from './service-injection';
import { resolveService, resolveServiceDeep } from './service-resolution';

@Entity({
  modelName: 'Test'
})
class Test {
  @Key id: number;
  name: string;
}

@Entity({
  modelName: 'SubTest'
})
class SubTest {
  @Key id: number;
  name: string;
}

@Entity({
  modelName: 'AltTest'
})
class AltTest {
  @Key id: number;
  name: string;
}

@Entity({
  modelName: 'NonTest'
})
class NonTest {
  @Key id: number;
  name: string;
}

class TestEntityService implements IAutoEntityService<Test> {}

class SubTestEntityService implements IAutoEntityService<SubTest> {}

class AltTestEntityService implements IAutoEntityService<AltTest> {}

interface SubState {
  subTest: IEntityState<SubTest>;
}

const subReducerMap = {
  subTest: createReducer({})
};

interface AltState {
  altTest: IEntityState<AltTest>;
}

const altReducerMap = {
  altTest: createReducer({})
};

interface State {
  test: IEntityState<Test>;
}

const reducerMap = {
  test: createReducer({})
};

class Init {}

@NgModule({
  imports: [StoreModule.forFeature('sub', subReducerMap), NgrxAutoEntityModule.forFeature()],
  providers: [{ provide: SubTest, useClass: SubTestEntityService }]
})
export class SubModule {}

@NgModule({
  imports: [StoreModule.forFeature('alt', altReducerMap), NgrxAutoEntityModule.forFeature()],
  providers: [{ provide: AltTest, useClass: AltTestEntityService }]
})
export class AltModule {}

describe('Service Resolvers', () => {
  // eslint-disable-next-line prefer-const
  let actions$: Observable<any>;

  beforeEach(async () => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false }
});
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducerMap), EffectsModule.forRoot([]), NgrxAutoEntityModule.forRoot(), SubModule, AltModule],
      providers: [provideMockActions(() => actions$), { provide: Test, useClass: TestEntityService }, Init]
    }).compileComponents();
  });

  describe('resolveService()', () => {
    it('should resolve service for test entity', () => {
      const injector = TestBed.inject(Injector);
      const info = setInfo(Test);
      const service = resolveService(info, injector);
      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(TestEntityService);
    });

    it('should resolve service for sub test entity', () => {
      const injector = TestBed.inject(Injector);
      const info = setInfo(SubTest);
      const service = resolveService(info, injector);
      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(SubTestEntityService);
    });
  });

  describe('resolveServiceDeep()', () => {
    it('should resolve service for sub test entity', () => {
      // Must do something with module, otherwise it won't fully initialize, so no injectors!
      const test = TestBed.inject(Init);

      // Make sure we get the root injector, which will not have the sub test entity in scope:
      const injector = (TestBed.inject(Injector) as any)._parent;
      const info = setInfo(SubTest);
      const service = resolveServiceDeep(info, injector, [...getInjectors()]);

      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(SubTestEntityService);
    });

    it('should resolve service for alt test entity', () => {
      // Must do something with module, otherwise it won't fully initialize, so no injectors!
      const test = TestBed.inject(Init);

      // Make sure we get the root injector, which will not have the sub test entity in scope:
      const injector = (TestBed.inject(Injector) as any)._parent;
      const info = setInfo(AltTest);
      const service = resolveServiceDeep(info, injector, [...getInjectors()]);

      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(AltTestEntityService);
    });

    it('should fail to resolve service for non test entity', () => {
      // Must do something with module, otherwise it won't fully initialize, so no injectors!
      const test = TestBed.inject(Init);

      // Make sure we get the root injector, which will not have the sub test entity in scope:
      const injector = (TestBed.inject(Injector) as any)._parent;
      const info = setInfo(NonTest);
      try {
        resolveServiceDeep(info, injector, [...getInjectors()]);
        fail('Expected injection exception!');
      } catch (error) {
        expect(error.name).toBe('NullInjectorError');
      }
    });
  });
});
