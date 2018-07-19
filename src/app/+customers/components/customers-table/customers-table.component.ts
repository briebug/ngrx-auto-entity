import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Customer } from 'models/customer.model';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnChanges, OnInit {
  /** The table columns to display */
  columnsToDisplay = ['name', 'actions'];

  /** The array of customers */
  @Input() customers: Customer[];

  /** Table datasource */
  dataSource = new MatTableDataSource();

  /** Customer delete event */
  @Output() delete = new EventEmitter<Customer>();

  /** Customer edit event */
  @Output() edit = new EventEmitter<Customer>();

  /** The paginator */
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
