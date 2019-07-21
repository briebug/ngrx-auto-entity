import { Routes } from '@angular/router';
import { CustomerComponent } from './containers/customer/customer.component';
import { CustomersComponent } from './containers/customers/customers.component';

export const routes: Routes = [
  {
    path: '',
    component: CustomersComponent
  },
  {
    path: 'add',
    component: CustomerComponent
  },
  {
    path: ':id',
    component: CustomerComponent
  }
];
