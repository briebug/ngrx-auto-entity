import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EntityService } from './entity.service';
import { AUTO_ENTITY_CONFIG, AutoEntityServiceConfig } from './config';

@NgModule({
  imports: [HttpClientModule],
  providers: [EntityService]
})
export class NgrxAutoEntityServiceModule {
  static forRoot(config: AutoEntityServiceConfig): ModuleWithProviders<NgrxAutoEntityServiceModule> {
    return {
      ngModule: NgrxAutoEntityServiceModule,
      providers: [{ provide: AUTO_ENTITY_CONFIG, useValue: config }]
    };
  }
}
