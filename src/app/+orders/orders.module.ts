import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersComponent } from 'src/app/+orders/containers/orders/orders.component';
import { ordersRoutes } from 'src/app/+orders/orders.routing';
import { OrdersSharedModule } from 'src/app/+orders/shared/orders.shared.module';
import { OrderComponent } from './components/order/order.component';

@NgModule({
  declarations: [OrdersComponent, OrderComponent],
  imports: [CommonModule, OrdersSharedModule, RouterModule.forChild(ordersRoutes)]
})
export class OrdersModule {}
