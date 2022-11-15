import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NGRX_AUTO_ENTITY_APP_STORE } from '@briebug/ngrx-auto-entity';
import { Store } from '@ngrx/store';

import { AppComponent } from './app.component';
import { Account } from './models/account.model';
import { Customer } from './models/customer.model';
import { FeatureModule } from './state/feature/feature.module';
import { StateModule } from './state/state.module';
import { EntityService, NgrxAutoEntityServiceModule } from '@briebug/ngrx-auto-entity-service';
import { environment } from '../environments/environment';

export function provideAppStore(store: Store<any>) {
  return store;
}

@Injectable()
export class ConfigService {
  url = Promise.resolve(environment.API_BASE_URL);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgrxAutoEntityServiceModule.forRoot((configService: ConfigService) => ({ urlPrefix: (...args) => configService.url }), [ConfigService]),
    StateModule.forRoot(),
    FeatureModule
  ],
  providers: [
    ConfigService,
    { provide: Customer, useClass: EntityService },
    { provide: Account, useClass: EntityService },
    { provide: NGRX_AUTO_ENTITY_APP_STORE, useFactory: provideAppStore, deps: [Store] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
