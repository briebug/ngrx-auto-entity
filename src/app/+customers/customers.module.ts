import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';

import { MaterialModule } from './../material.module';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomersTableComponent } from './components/customers-table/customers-table.component';
import { CustomerComponent } from './containers/customer/customer.component';
import { CustomersComponent } from './containers/customers/customers.component';
import { routes } from './customers.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgrxAutoEntityModule.forFeature()
  ],
  declarations: [CustomerComponent, CustomerFormComponent, CustomersComponent, CustomersTableComponent]
})
export class CustomersModule {}
