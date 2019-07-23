import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { EffectSources } from '@ngrx/effects';
import { META_REDUCERS } from '@ngrx/store';

import { EntityEffects, ExtraEffects } from './effects.default';
import { EntityOperators } from './operators';
import { autoEntityMetaReducer } from './reducer';
import { NgrxAutoEntityService } from './service';

export function getNgRxAutoEntityMetaReducer() {
  return autoEntityMetaReducer;
}

// tslint:disable-next-line:interface-name
export interface NgRxAutoEntityModuleConfig {
  excludeEffects?: boolean;
}

@NgModule({
  providers: [
    EntityOperators,
    EntityEffects,
    ExtraEffects,
    { provide: META_REDUCERS, useFactory: getNgRxAutoEntityMetaReducer, multi: true }
  ]
})
export class NgRxAutoEntityRootModuleWithEffects {
  constructor(
    private effectSources: EffectSources,
    entityEffects: EntityEffects,
    extraEffects: ExtraEffects,
    injector: Injector
  ) {
    // NOTE: The following trick learned from @ngrx/data!

    // Warning: this alternative approach relies on an undocumented API
    // to add effect directly rather than through `forFeature()`.
    // The danger is that EffectsModule.forFeature evolves and we no longer perform a crucial step.
    this.addEffects(entityEffects);
    this.addEffects(extraEffects);
  }

  /**
   * Add another class instance that contains @Effect methods.
   * @param effectSourceInstance a class instance that implements effects.
   * Warning: undocumented @ngrx/effects API
   */
  addEffects(effectSourceInstance: any) {
    this.effectSources.addEffects(effectSourceInstance);
  }
}

@NgModule({
  providers: [
    EntityOperators,
    ExtraEffects,
    { provide: META_REDUCERS, useFactory: getNgRxAutoEntityMetaReducer, multi: true }
  ]
})
export class NgRxAutoEntityRootModuleNoEntityEffects {
  constructor(private effectSources: EffectSources, extraEffects: ExtraEffects, injector: Injector) {
    // NOTE: The following trick learned from @ngrx/data!

    // Warning: this alternative approach relies on an undocumented API
    // to add effect directly rather than through `forFeature()`.
    // The danger is that EffectsModule.forFeature evolves and we no longer perform a crucial step.
    this.addEffects(extraEffects);
  }

  /**
   * Add another class instance that contains @Effect methods.
   * @param effectSourceInstance a class instance that implements effects.
   * Warning: undocumented @ngrx/effects API
   */
  addEffects(effectSourceInstance: any) {
    this.effectSources.addEffects(effectSourceInstance);
  }
}

@NgModule({
  providers: [
    EntityOperators,
    ExtraEffects,
    { provide: META_REDUCERS, useFactory: getNgRxAutoEntityMetaReducer, multi: true }
  ]
})
export class NgRxAutoEntityRootModuleNoEffects {}

let INJECTOR_DEPTH = 0;

@NgModule({})
export class NgRxAutoEntityFeatureModule {
  constructor(injector: Injector) {
    // Update the core NgRxAutoEntityService INJECTORS to include the current injector
    // This creates a list of injectors that should eventually encompass the entire application
    // as lazy loaded modules are subsequently created, to be evaluated in reverse order
    INJECTOR_DEPTH = INJECTOR_DEPTH + 1;
    NgrxAutoEntityService.addInjector(
      Injector.create({
        providers: [],
        parent: injector,
        name: 'Injector' + INJECTOR_DEPTH
      })
    );
  }
}

@NgModule({})
export class NgrxAutoEntityModule {
  static forRoot(): ModuleWithProviders<NgRxAutoEntityRootModuleWithEffects> {
    return {
      ngModule: NgRxAutoEntityRootModuleWithEffects,
      providers: [NgrxAutoEntityService]
    };
  }

  static forRootNoEntityEffects(): ModuleWithProviders<NgRxAutoEntityRootModuleNoEntityEffects> {
    return {
      ngModule: NgRxAutoEntityRootModuleNoEntityEffects,
      providers: [NgrxAutoEntityService]
    };
  }

  static forRootNoEffects(): ModuleWithProviders<NgRxAutoEntityRootModuleNoEffects> {
    return {
      ngModule: NgRxAutoEntityRootModuleNoEffects,
      providers: [NgrxAutoEntityService]
    };
  }

  static forFeature(): ModuleWithProviders<NgRxAutoEntityFeatureModule> {
    return {
      ngModule: NgRxAutoEntityFeatureModule,
      providers: [NgrxAutoEntityService]
    };
  }
}
