import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NGRX_AUTO_ENTITY_APP_STORE } from '@briebug/ngrx-auto-entity';
import { Store } from '@ngrx/store';

import { AppComponent } from './app.component';
import { Account } from './models/account.model';
import { Customer } from './models/customer.model';
import { EntityService } from './services/entity.service';
import { StateModule } from './state/state.module';

export function provideAppStore(store: Store<any>) {
  return store;
}

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, BrowserModule, HttpClientModule, StateModule],
  providers: [
    { provide: Customer, useClass: EntityService },
    { provide: Account, useClass: EntityService },
    { provide: NGRX_AUTO_ENTITY_APP_STORE, useFactory: provideAppStore, deps: [Store] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
