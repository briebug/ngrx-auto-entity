import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { Customer } from '../../../models';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnChanges, OnInit {
  @Input() customers: Customer[];
  @Output() delete = new EventEmitter<Customer>();
  @Output() edit = new EventEmitter<Customer>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  columnsToDisplay = ['name', 'isActive', 'actions'];
  dataSource = new MatTableDataSource();

  constructor() {}

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.customers && simpleChanges.customers.currentValue) {
      this.dataSource.data = this.customers;
    }
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}
