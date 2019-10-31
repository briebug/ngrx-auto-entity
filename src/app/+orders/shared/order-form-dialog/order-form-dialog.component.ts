import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { OrderInfo } from 'src/app/+orders/models/order-info.model';

@Component({
  selector: 'app-order-form-dialog',
  templateUrl: './order-form-dialog.component.html',
  styleUrls: ['./order-form-dialog.component.scss']
})
export class OrderFormDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IOrderFormDialogData) {}

  ngOnInit() {}
}

export interface IOrderFormDialogData {
  orderInfo: OrderInfo;
}
