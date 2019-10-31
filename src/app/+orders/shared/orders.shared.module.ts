import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderFormDialogComponent } from 'src/app/+orders/shared/order-form-dialog/order-form-dialog.component';
import { OrderFormComponent } from 'src/app/+orders/shared/order-form/order-form.component';
import { OrdersPreviewTableComponent } from 'src/app/+orders/shared/orders-preview-table/orders-preview-table.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FlexLayoutModule],
  declarations: [OrderFormComponent, OrdersPreviewTableComponent, OrderFormDialogComponent],
  exports: [OrderFormComponent, OrdersPreviewTableComponent],
  entryComponents: [OrderFormDialogComponent]
})
export class OrdersSharedModule {}
