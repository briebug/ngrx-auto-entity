import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  _provideAutoEntityState,
  _provideAutoEntityStore,
  _withoutCustomStore,
  withoutEntityEffects,
  withoutExtraEffects
} from './provider';

// eslint-disable-next-line @typescript-eslint/naming-convention
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
  static forRoot(): ModuleWithProviders<NgRxAutoEntityRootModuleWithEffects> {
    return {
      ngModule: NgRxAutoEntityRootModuleWithEffects,
      providers: _provideAutoEntityStore([_withoutCustomStore()])
    };
  }

  static forRootNoEntityEffects(): ModuleWithProviders<NgRxAutoEntityRootModuleNoEntityEffects> {
    return {
      ngModule: NgRxAutoEntityRootModuleNoEntityEffects,
      providers: _provideAutoEntityStore([withoutEntityEffects(), _withoutCustomStore()])
    };
  }

  static forRootNoEffects(): ModuleWithProviders<NgRxAutoEntityRootModuleNoEffects> {
    return {
      ngModule: NgRxAutoEntityRootModuleNoEffects,
      providers: _provideAutoEntityStore([withoutEntityEffects(), withoutExtraEffects(), _withoutCustomStore()])
    };
  }

  static forFeature(): ModuleWithProviders<NgRxAutoEntityFeatureModule> {
    return {
      ngModule: NgRxAutoEntityFeatureModule,
      providers: _provideAutoEntityState()
    };
  }
}
