import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './../material.module';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomersTableComponent } from './components/customers-table/customers-table.component';
import { CustomersComponent } from './containers/customers/customers.component';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  imports: [CommonModule, CustomersRoutingModule, MaterialModule],
  declarations: [CustomersComponent, CustomerListComponent, CustomersTableComponent]
})
export class CustomersModule {}
