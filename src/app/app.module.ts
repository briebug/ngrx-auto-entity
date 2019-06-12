import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';

import { Customer } from 'models/customer.model';
import { Product } from 'models/product.model';

import { CoreModule } from 'core/core.module';
import { StateModule } from 'state/state.module';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { HomeComponent } from './containers/home/home.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { TopCustomersComponent } from './containers/top-customers/top-customers.component';
import { EntityService } from './services/entity.service';
import { RecentProductsComponent } from './containers/recent-products/recent-products.component';
import { ProductsBasicTableComponent } from './components/products-basic-table/products-basic-table.component';
import { OrdersPreviewTableComponent } from './components/orders-preview-table/orders-preview-table.component';
import { OrdersPreviewComponent } from './containers/orders-preview/orders-preview.component';
import { OrderItem } from 'models/orderItem.model';
import { Order } from 'models/order.model';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, HomeComponent, NotFoundComponent, CustomersListComponent, TopCustomersComponent, RecentProductsComponent, ProductsBasicTableComponent, OrdersPreviewTableComponent, OrdersPreviewComponent],
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
  providers: [
    { provide: Customer, useClass: EntityService },
    { provide: Product, useClass: EntityService },
    { provide: Order, useClass: EntityService },
    { provide: OrderItem, useClass: EntityService }
  ]
})
export class AppModule {}
