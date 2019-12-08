import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersComponent } from 'src/app/+orders/containers/orders/orders.component';
import { OrdersExportsModule } from 'src/app/+orders/exports/orders.exports.module';
import { ordersRoutes } from 'src/app/+orders/orders.routing';

@NgModule({
  declarations: [OrdersComponent],
  imports: [CommonModule, OrdersExportsModule, RouterModule.forChild(ordersRoutes)]
})
export class OrdersModule {}
