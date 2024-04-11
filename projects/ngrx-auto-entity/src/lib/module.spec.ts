import { TestBed } from '@angular/core/testing';
import { META_REDUCERS, MetaReducer, Store, StoreModule } from '@ngrx/store';
import { EffectsModule, EffectSources } from '@ngrx/effects';

import { EntityEffects } from './effects/effects-all';
import { ExtraEffects } from './effects/effects-extra';
import { EntityIfNecessaryOperators } from './effects/if-necessary-operators';
import { EntityOperators } from './effects/operators';
import { autoEntityMetaReducer } from './reducer/meta-reducer';
import {
  NgRxAutoEntityFeatureModule,
  NgrxAutoEntityModule,
  NgRxAutoEntityRootModuleNoEffects,
  NgRxAutoEntityRootModuleNoEntityEffects,
  NgRxAutoEntityRootModuleWithEffects
} from './module';
import { NEVER } from 'rxjs';
import { NgrxAutoEntityService } from './service/service';
import { NGRX_AUTO_ENTITY_APP_STORE } from './effects/if-necessary-operator-utils';

let effectSources: EffectSources;
let entityService: NgrxAutoEntityService | null;
let entityOps: EntityOperators | null;
let entityIfNecessaryOps: EntityIfNecessaryOperators | null;
let entityEffects: EntityEffects | null;
let extraEffects: ExtraEffects | null;
let metaReducers: MetaReducer[] | null;
let appStore: Store | null;

beforeEach(() => {
  effectSources = null;
  entityService = null;
  entityOps = null;
  entityIfNecessaryOps = null;
  entityEffects = null;
  extraEffects = null;
  metaReducers = null;
  appStore = null;
});

function resolveDependencies() {
  effectSources = TestBed.inject(EffectSources);
  entityService = TestBed.inject(NgrxAutoEntityService, null, { optional: true });
  entityOps = TestBed.inject(EntityOperators, null, { optional: true });
  entityIfNecessaryOps = TestBed.inject(EntityIfNecessaryOperators, null, { optional: true });
  entityEffects = TestBed.inject(EntityEffects, null, { optional: true });
  extraEffects = TestBed.inject(ExtraEffects, null, { optional: true });
  metaReducers = TestBed.inject(META_REDUCERS, null, { optional: true });
  appStore = TestBed.inject(NGRX_AUTO_ENTITY_APP_STORE, null, { optional: true }) as Store;
}

const mockEffectSourcesProvider = {
  useValue: {
    addEffects: jest.fn(),
    toActions: jest.fn().mockReturnValue(NEVER)
  }
};

describe('Module: NgRxAutoEntityRootModuleWithEffects', () => {
  it('should provide the correct dependencies', () => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), NgrxAutoEntityModule.forRoot()]
    }).overrideProvider(EffectSources, mockEffectSourcesProvider);

    resolveDependencies();

    expect(entityService).toBeDefined();
    expect(entityOps).toBeDefined();
    expect(entityIfNecessaryOps).toBeDefined();
    expect(entityEffects).toBeDefined();
    expect(extraEffects).toBeDefined();
    expect(appStore).toBeNull();

    expect(metaReducers).toContain(autoEntityMetaReducer);

    expect(effectSources.addEffects).toHaveBeenCalledWith(entityEffects);
    expect(effectSources.addEffects).toHaveBeenCalledWith(extraEffects);
  });
});

describe('Module: NgRxAutoEntityRootModuleNoEntityEffects', () => {
  it('should provide the correct dependencies', () => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), NgrxAutoEntityModule.forRootNoEntityEffects()]
    }).overrideProvider(EffectSources, mockEffectSourcesProvider);

    resolveDependencies();

    expect(entityService).toBeDefined();
    expect(entityOps).toBeDefined();
    expect(entityIfNecessaryOps).toBeDefined();
    expect(entityEffects).toBeNull();
    expect(extraEffects).toBeDefined();
    expect(appStore).toBeNull();

    expect(metaReducers).toContain(autoEntityMetaReducer);

    expect(effectSources.addEffects).not.toHaveBeenCalledWith(entityEffects);
    expect(effectSources.addEffects).toHaveBeenCalledWith(extraEffects);
  });
});

describe('Module: NgRxAutoEntityRootModuleNoEffects', () => {
  it('should provide the correct dependencies', () => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), NgrxAutoEntityModule.forRootNoEffects()]
    }).overrideProvider(EffectSources, mockEffectSourcesProvider);

    const effectSources = TestBed.inject(EffectSources);

    resolveDependencies();

    expect(entityService).toBeDefined();
    expect(entityOps).toBeDefined();
    expect(entityIfNecessaryOps).toBeDefined();
    expect(entityEffects).toBeNull();
    expect(extraEffects).toBeNull();
    expect(appStore).toBeNull();

    expect(metaReducers).toContain(autoEntityMetaReducer);

    expect(effectSources.addEffects).not.toHaveBeenCalledWith(entityEffects);
    expect(effectSources.addEffects).not.toHaveBeenCalledWith(extraEffects);
  });
});

describe('Module: NgRxAutoEntityFeatureModule', () => {
  it('should provide the correct dependencies', () => {
    TestBed.configureTestingModule({
      imports: [NgrxAutoEntityModule.forFeature()]
    });
  });
});

describe('Module: NgrxAutoEntityModule', () => {
  describe('Method: forRoot', () => {
    it('should return the NgRxAutoEntityRootModuleWithEffects module with providers', () => {
      const module = NgrxAutoEntityModule.forRoot();
      expect(module).toEqual({
        ngModule: NgRxAutoEntityRootModuleWithEffects,
        providers: expect.any(Array)
      });
    });
  });

  describe('Method: forRootNoEntityEffects', () => {
    it('should return the NgRxAutoEntityRootModuleNoEntityEffects module with providers', () => {
      const module = NgrxAutoEntityModule.forRootNoEntityEffects();
      expect(module).toEqual({
        ngModule: NgRxAutoEntityRootModuleNoEntityEffects,
        providers: expect.any(Array)
      });
    });
  });

  describe('Method: forRootNoEffects', () => {
    it('should return the NgRxAutoEntityRootModuleNoEffects module with providers', () => {
      const module = NgrxAutoEntityModule.forRootNoEffects();
      expect(module).toEqual({
        ngModule: NgRxAutoEntityRootModuleNoEffects,
        providers: expect.any(Array)
      });
    });
  });

  describe('Method: forFeature', () => {
    it('should return the NgRxAutoEntityFeatureModule module with providers', () => {
      const module = NgrxAutoEntityModule.forFeature();
      expect(module).toEqual({
        ngModule: NgRxAutoEntityFeatureModule,
        providers: expect.any(Array)
      });
    });
  });
});
