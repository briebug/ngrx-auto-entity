import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { OrderInfo } from 'src/app/+orders/models/orderInfo.model';

const DEFAULT_COLUMNS: IOrdersPreviewTableColumns[] = [
  'customer',
  'dateOfOrder',
  'numberOfItems',
  'total',
  'status',
  'userActions'
];

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

  @Output() editOrderClick = new EventEmitter<OrderInfo>();

  dataSource = new MatTableDataSource();

  constructor() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.orders && simpleChanges.orders.currentValue) {
      this.dataSource.data = this.orders;
    }
  }

  /* Handlers */
  handleEditClick(info: OrderInfo) {
    console.log('clicked', info);
    this.editOrderClick.emit(info);
  }

  /* Public */
  toCurrencyString(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }
}

export type IOrdersPreviewTableColumns =
  | 'customer'
  | 'dateOfOrder'
  | 'status'
  | 'numberOfItems'
  | 'total'
  | 'userActions';
