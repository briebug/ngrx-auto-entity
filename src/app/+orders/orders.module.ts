import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { OrderComponent } from './containers/order/order.component';
import { OrdersComponent } from './containers/orders/orders.component';
import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
  imports: [CommonModule, OrdersRoutingModule, FlexLayoutModule, FormsModule, MaterialModule, ReactiveFormsModule],
  declarations: [OrderComponent, OrdersComponent, OrderFormComponent, OrdersTableComponent]
})
export class OrdersModule {}
