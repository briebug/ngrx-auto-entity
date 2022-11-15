import { Injector, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { EffectsModule } from '@ngrx/effects';
import { createReducer, StoreModule } from '@ngrx/store';
import { setInfo } from '../actions/util';
import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { NgrxAutoEntityModule } from '../module';
import { IEntityState } from '../util/entity-state';
import { IAutoEntityService } from './interface';
import { addInjector, getInjectors, getService, resetInjectors } from './service-injection';

describe('addInjector()', () => {
  afterEach(() => resetInjectors());
  it('should add an injector to the injectors', () => {
    addInjector({} as Injector);
    const injectors = getInjectors();
    expect(injectors).toEqual([{}]);
  });
});

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

describe('Service Injection', () => {
  beforeEach(async () => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
      teardown: { destroyAfterEach: false }
    });
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducerMap), EffectsModule.forRoot([]), NgrxAutoEntityModule.forRoot(), SubModule, AltModule],
      providers: [{ provide: Test, useClass: TestEntityService }, Init]
    }).compileComponents();
  });

  describe('getService()', () => {
    it('should resolve test entity service', () => {
      TestBed.inject(Init);

      const injector = (TestBed.inject(Injector) as any)._parent;
      const info = setInfo(Test);
      const service = getService(info, injector);

      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(TestEntityService);
    });

    it('should resolve sub test entity service', () => {
      TestBed.inject(Init);

      const injector = (TestBed.inject(Injector) as any)._parent;
      const info = setInfo(SubTest);
      const service = getService(info, injector);

      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(SubTestEntityService);
    });

    it('should resolve alt test entity service', () => {
      TestBed.inject(Init);

      const injector = (TestBed.inject(Injector) as any)._parent;
      const info = setInfo(AltTest);
      const service = getService(info, injector);

      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(AltTestEntityService);
    });
  });
});
