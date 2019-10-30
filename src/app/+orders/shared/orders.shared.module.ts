import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderFormComponent } from 'src/app/+orders/shared/order-form/order-form.component';
import { OrdersPreviewTableComponent } from 'src/app/+orders/shared/orders-preview-table/orders-preview-table.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [OrderFormComponent, OrdersPreviewTableComponent],
  exports: [OrderFormComponent, OrdersPreviewTableComponent]
})
export class OrdersSharedModule {}
