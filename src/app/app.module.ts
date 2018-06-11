import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgrxAutoEntityModule } from 'ngrx-auto-entity';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgrxAutoEntityModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
