import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { OrderInfo } from 'models/orderInfo';

@Component({
  selector: 'app-orders-preview-table',
  templateUrl: './orders-preview-table.component.html',
  styleUrls: ['./orders-preview-table.component.scss']
})
export class OrdersPreviewTableComponent implements OnInit {
  @Input() orders: OrderInfo[];

  columnsToDisplay = ['customer', 'dateOfOrder', 'status'];
  dataSource = new MatTableDataSource();

  constructor() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.orders && simpleChanges.orders.currentValue) {
      this.dataSource.data = this.orders;
    }
  }

  ngOnInit() {
  }
}
