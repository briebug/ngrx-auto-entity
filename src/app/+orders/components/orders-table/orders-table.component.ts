import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource, Sort } from '@angular/material';
import { OrderStatus } from 'models/order.model';
import { OrderInfo } from 'models/orderInfo';
import { Subscription } from 'rxjs';

import * as moment from 'moment';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnChanges, OnDestroy, OnInit {
  @Input() orders: OrderInfo[];
  @Output() delete = new EventEmitter<OrderInfo>();
  @Output() edit = new EventEmitter<OrderInfo>();
  @Output() statusFilter = new EventEmitter<OrderStatus[]>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  orderStatus = new FormControl();
  orderStatusSub: Subscription;

  columnsToDisplay = ['id', 'customer', 'dateOfOrder', 'status', 'total', 'actions'];
  statusList = [OrderStatus.archived, OrderStatus.completed, OrderStatus.open, OrderStatus.pending];

  constructor() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.orders && simpleChanges.orders.currentValue) {
      this.dataSource.data = this.orders.slice();
    }
  }

  ngOnDestroy(): void {
    this.orderStatusSub.unsubscribe();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.orderStatusSub = this.orderStatus.valueChanges.subscribe(val => this.statusFilter.emit(val));
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  onSort(sort: Sort) {
    this.sortData(sort);
    this.paginator.firstPage();
  }

  sortData(sort: Sort) {
    const data = this.orders.slice();
    const compare = (a: number | string, b: number | string, isAsc: boolean) => {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    };
    const compareDates = (a, b, isAsc: boolean) => {
      console.log(moment(a).diff(moment(b)));
      return moment(a).diff(moment(b)) * (isAsc ? 1 : -1);
    };

    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'customer':
          return compare(a.customer, b.customer, isAsc);
        case 'dateOfOrder':
          return compareDates(a.dateOfOrder, b.dateOfOrder, isAsc);
        default:
          return 0;
      }
    });
  }
}
