import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Order } from 'models/order.model';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnChanges, OnInit {
  @Input() orders: Order[];
  @Output() delete = new EventEmitter<Order>();
  @Output() edit = new EventEmitter<Order>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  columnsToDisplay = ['id', 'customer', 'dateOfOrder', 'status', 'actions'];
  dataSource = new MatTableDataSource();

  constructor() {}

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.orders && simpleChanges.orders.currentValue) {
      this.dataSource.data = this.orders;
      console.log(this.orders)
    }
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}
