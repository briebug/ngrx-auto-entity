import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Customer } from 'models/customer.model';
import { NgrxAutoEntityModule } from 'ngrx-auto-entity';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerService } from './services/customer.service';
import { StateModule } from './state/state.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, NgrxAutoEntityModule, AppRoutingModule, StateModule.forRoot()],
  providers: [{ provide: Customer, useClass: CustomerService }],
  bootstrap: [AppComponent]
})
export class AppModule {}
