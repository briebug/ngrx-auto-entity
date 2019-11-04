import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IOrderFormValue } from 'src/app/+orders/exports/order-form/order-form.component';
import { OrderInfo } from 'src/app/+orders/models/order-info.model';

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
    this.handleSaveClick = data.handleSaveClick || this.handleSaveClick;
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
