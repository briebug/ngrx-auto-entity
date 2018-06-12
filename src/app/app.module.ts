import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgrxAutoEntityModule } from 'ngrx-auto-entity';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StateModule } from './state/state.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgrxAutoEntityModule, AppRoutingModule, StateModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
