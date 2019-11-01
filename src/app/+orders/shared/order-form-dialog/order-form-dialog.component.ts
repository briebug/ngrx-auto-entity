import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderInfo } from 'src/app/+orders/models/order-info.model';
import { IOrderFormValue } from 'src/app/+orders/shared/order-form/order-form.component';

@Component({
  selector: 'app-order-form-dialog',
  templateUrl: './order-form-dialog.component.html',
  styleUrls: ['./order-form-dialog.component.scss']
})
export class OrderFormDialogComponent implements OnInit {
  handleSaveClick = (...args) => {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IOrderFormDialogData,
    public dialogRef: MatDialogRef<OrderFormDialogComponent>
  ) {
    this.handleSaveClick = data.handleSaveClick;
  }

  ngOnInit() {}

  handleCancelClick() {
    this.dialogRef.close();
  }
}

export interface IOrderFormDialogData {
  orderInfo: OrderInfo;
  handleSaveClick: (formValue: IOrderFormValue, dialogRef: MatDialogRef<OrderFormDialogComponent>) => void;
}
