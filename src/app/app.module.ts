import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { Customer } from 'models/customer.model';
import { Product } from 'models/product.model';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './containers/home/home.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material.module';
import { EntityService } from './services/entity.service';
import { EntityService as ProductService } from './services/product.service';
import { StateModule } from './state/state.module';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule.forRoot(),
    HttpClientModule,
    NgrxAutoEntityModule,
    StateModule.forRoot(),
    MaterialModule
  ],
  providers: [{ provide: Customer, useClass: EntityService }, { provide: Product, useClass: ProductService }],
  bootstrap: [AppComponent]
})
export class AppModule {}
