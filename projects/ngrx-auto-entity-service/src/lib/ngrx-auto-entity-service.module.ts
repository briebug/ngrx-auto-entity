import { ModuleWithProviders, NgModule } from '@angular/core';
import { AutoEntityServiceConfig } from './config';
import { _provideAutoEntityService } from './ngrx-auto-entity-service.provider';

@NgModule({})
export class NgrxAutoEntityServiceModule {
  static forRoot(config: AutoEntityServiceConfig): ModuleWithProviders<NgrxAutoEntityServiceModule>;
  static forRoot(config: () => AutoEntityServiceConfig): ModuleWithProviders<NgrxAutoEntityServiceModule>;
  /** @deprecated use `inject` to provide dependencies */
  static forRoot(config: (...deps: any[]) => AutoEntityServiceConfig, deps: any[]): ModuleWithProviders<NgrxAutoEntityServiceModule>;
  static forRoot(
    config: AutoEntityServiceConfig | (() => AutoEntityServiceConfig),
    deps?: any[]
  ): ModuleWithProviders<NgrxAutoEntityServiceModule> {
    return {
      ngModule: NgrxAutoEntityServiceModule,
      providers: _provideAutoEntityService(config, deps)
    };
  }
}
