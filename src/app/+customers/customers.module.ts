import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material.module';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomersTableComponent } from './components/customers-table/customers-table.component';
import { CustomerComponent } from './containers/customer/customer.component';
import { CustomersComponent } from './containers/customers/customers.component';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  imports: [CommonModule, CustomersRoutingModule, FlexLayoutModule, FormsModule, MaterialModule, ReactiveFormsModule],
  declarations: [CustomerComponent, CustomerFormComponent, CustomersComponent, CustomersTableComponent]
})
export class CustomersModule {}
