import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EntityService } from './entity.service';
import {
  AUTO_ENTITY_CONFIG,
  AutoEntityServiceConfig,
  DynamicAutoEntityServiceConfig,
} from './config';

const createConfigProvider = (config: AutoEntityServiceConfig | DynamicAutoEntityServiceConfig, deps?: any[]): Provider =>
  typeof config === 'function'
    ? {
      provide: AUTO_ENTITY_CONFIG,
      useFactory: config,
      deps,
    }
    : {provide: AUTO_ENTITY_CONFIG, useValue: config};

@NgModule({
  imports: [HttpClientModule],
  providers: [EntityService],
})
export class NgrxAutoEntityServiceModule {
  static forRoot(config: DynamicAutoEntityServiceConfig, deps?: any[]): ModuleWithProviders<NgrxAutoEntityServiceModule>;
  static forRoot(config: AutoEntityServiceConfig): ModuleWithProviders<NgrxAutoEntityServiceModule>;
  static forRoot(
    config: AutoEntityServiceConfig | DynamicAutoEntityServiceConfig,
    deps?: any[],
  ): ModuleWithProviders<NgrxAutoEntityServiceModule> {
    return {
      ngModule: NgrxAutoEntityServiceModule,
      providers: [createConfigProvider(config, deps)],
    };
  }
}
