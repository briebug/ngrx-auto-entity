import { Routes } from '@angular/router';
import { OrdersComponent } from 'src/app/+orders/containers/orders/orders.component';
import { OrderComponent } from './components/order/order.component';

export const routes: Routes = [
  {
    path: '',
    component: OrdersComponent
  },
  {
    path: ':id',
    component: OrderComponent
  }
];
