import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Customer } from './models/customer.model';
import { EntityService } from './services/entity.service';
import { StateModule } from './state/state.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, StateModule],
  providers: [{ provide: Customer, useClass: EntityService }],
  bootstrap: [AppComponent]
})
export class AppModule {}
