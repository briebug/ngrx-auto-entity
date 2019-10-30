import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { OrderInfo } from 'src/app/+orders/models/orderInfo.model';

const DEFAULT_COLUMNS: IOrdersPreviewTableColumns[] = ['customer', 'dateOfOrder', 'numberOfItems', 'total', 'status', 'userActions'];

@Component({
  selector: 'app-orders-preview-table',
  templateUrl: './orders-preview-table.component.html',
  styleUrls: ['./orders-preview-table.component.scss'],
  animations: [
    trigger('hiddenRowExpand', [
      state('collapsed', style({ height: '0px' })),
      state('expanded', style({ height: '50px' })),
      transition('expanded => collapsed', animate('0.3s')),
      transition('collapsed => expanded', animate('0.3s'))
    ])
  ]
})
export class OrdersPreviewTableComponent implements OnChanges {
  @Input() orders: OrderInfo[];
  @Input() columnsToDisplay: IOrdersPreviewTableColumns[] = DEFAULT_COLUMNS;

  dataSource = new MatTableDataSource();

  selectedOrder: OrderInfo;

  constructor() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.orders && simpleChanges.orders.currentValue) {
      this.dataSource.data = this.orders;
    }
  }

  handleEditClick(order: OrderInfo) {
    console.log('clicked', order);
    this.selectedOrder = order;
  }
}

export type IOrdersPreviewTableColumns =
  | keyof Pick<OrderInfo, 'customer' | 'dateOfOrder' | 'status' | 'numberOfItems' | 'total'>
  | 'userActions';
