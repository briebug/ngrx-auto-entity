import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomersComponent } from './containers/customers/customers.component';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  imports: [CommonModule, CustomersRoutingModule],
  declarations: [CustomersComponent, CustomerListComponent]
})
export class CustomersModule {}
