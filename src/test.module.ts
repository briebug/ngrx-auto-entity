import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from 'core/core.module';
import { StateModule } from 'state/state.module';
import { AppRoutingModule } from './app/app-routing.module';
import { MaterialModule } from './app/material.module';

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
