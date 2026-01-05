import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  _provideAutoEntityState,
  _provideAutoEntityStore,
  _withoutCustomStore,
  withoutEntityEffects,
  withoutExtraEffects
} from './provider';

 
export interface NgRxAutoEntityModuleConfig {
  excludeEffects?: boolean;
}

@NgModule({})
export class NgRxAutoEntityRootModuleWithEffects {}

@NgModule({})
export class NgRxAutoEntityRootModuleNoEntityEffects {}

@NgModule({})
export class NgRxAutoEntityRootModuleNoEffects {}

@NgModule({})
export class NgRxAutoEntityFeatureModule {}

@NgModule({})
export class NgrxAutoEntityModule {
  /** @deprecated use {@link provideAutoEntityStore} */
  static forRoot(): ModuleWithProviders<NgRxAutoEntityRootModuleWithEffects> {
    return {
      ngModule: NgRxAutoEntityRootModuleWithEffects,
      providers: _provideAutoEntityStore([_withoutCustomStore()])
    };
  }

  /** @deprecated use {@link provideAutoEntityStore} passing in {@link withoutEntityEffects} */
  static forRootNoEntityEffects(): ModuleWithProviders<NgRxAutoEntityRootModuleNoEntityEffects> {
    return {
      ngModule: NgRxAutoEntityRootModuleNoEntityEffects,
      providers: _provideAutoEntityStore([withoutEntityEffects(), _withoutCustomStore()])
    };
  }

  /** @deprecated use {@link provideAutoEntityStore} passing in {@link withoutEntityEffects} and {@link withoutExtraEffects} */
  static forRootNoEffects(): ModuleWithProviders<NgRxAutoEntityRootModuleNoEffects> {
    return {
      ngModule: NgRxAutoEntityRootModuleNoEffects,
      providers: _provideAutoEntityStore([withoutEntityEffects(), withoutExtraEffects(), _withoutCustomStore()])
    };
  }

  /** @deprecated use {@link provideAutoEntityState} */
  static forFeature(): ModuleWithProviders<NgRxAutoEntityFeatureModule> {
    return {
      ngModule: NgRxAutoEntityFeatureModule,
      providers: _provideAutoEntityState()
    };
  }
}
