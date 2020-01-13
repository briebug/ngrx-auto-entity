import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app/app-routing.module';
import { CoreModule } from './app/core/core.module';
import { MaterialModule } from './app/material.module';
import { StateModule } from './app/state/state.module';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule.forRoot(),
    HttpClientModule,
    StateModule.forRoot(),
    MaterialModule
  ]
})
export class TestModule {}
