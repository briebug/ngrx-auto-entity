import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from 'src/app/+orders/containers/orders/orders.component';
import { OrderFormComponent } from 'src/app/+orders/shared/order-form/order-form.component';
import { OrdersPreviewTableComponent } from 'src/app/+orders/shared/orders-preview-table/orders-preview-table.component';
import { OrdersSharedModule } from 'src/app/+orders/shared/orders.shared.module';
import { MaterialModule } from 'src/app/material.module';
import { OrderComponent } from './components/order/order.component';

@NgModule({
  declarations: [OrdersComponent, OrderComponent, OrderFormComponent, OrdersPreviewTableComponent],
  imports: [
    CommonModule,
    OrdersSharedModule,
    // RouterModule.forChild(routes),
    // StoreModule.forFeature('orders', featureReducer),
    // NgrxAutoEntityModule.forFeature(),
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [OrdersPreviewTableComponent]
  // providers: [{ provide: OrderItem, useClass: FeatureEntityService }]
})
export class OrdersModule {}
