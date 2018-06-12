import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgrxAutoEntityModule } from 'ngrx-auto-entity';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgrxAutoEntityModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
