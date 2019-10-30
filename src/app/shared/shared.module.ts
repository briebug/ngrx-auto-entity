import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { OrdersPreviewTableComponent } from 'src/app/shared/components/orders-preview-table/orders-preview-table.component';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [OrdersPreviewTableComponent],
  exports: [OrdersPreviewTableComponent]
})
export class SharedModule {}
