import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderFormComponent } from 'src/app/+orders/components/order-form/order-form.component';
import { OrdersPreviewTableComponent } from 'src/app/+orders/components/orders-preview-table/orders-preview-table.component';
import { OrdersComponent } from 'src/app/+orders/containers/orders/orders.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderComponent } from './components/order/order.component';
import { routes } from './orders.routing';

@NgModule({
  declarations: [OrdersComponent, OrderComponent, OrderFormComponent, OrdersPreviewTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // StoreModule.forFeature('orders', featureReducer),
    // NgrxAutoEntityModule.forFeature(),
    SharedModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [OrdersPreviewTableComponent]
  // providers: [{ provide: OrderItem, useClass: FeatureEntityService }]
})
export class OrdersModule {}
