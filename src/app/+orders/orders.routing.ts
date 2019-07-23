import { Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';

export const routes: Routes = [
  {
    path: ':id',
    component: OrderComponent
  }
];
