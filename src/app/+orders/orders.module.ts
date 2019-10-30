import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { OrderFormComponent } from 'src/app/+orders/components/order-form/order-form.component';
import { OrdersComponent } from 'src/app/+orders/containers/orders/orders.component';
import { MaterialModule } from 'src/app/material.module';
import { OrdersPreviewTableComponent } from 'src/app/shared/components/orders-preview-table/orders-preview-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderComponent } from './components/order/order.component';
import { routes } from './orders.routing';

@NgModule({
  declarations: [OrdersComponent, OrderComponent, OrderFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // StoreModule.forFeature('orders', featureReducer),
    // NgrxAutoEntityModule.forFeature(),
    SharedModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: []
  // providers: [{ provide: OrderItem, useClass: FeatureEntityService }]
})
export class OrdersModule {}
