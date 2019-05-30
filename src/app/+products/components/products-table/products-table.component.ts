import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Product } from 'models/product.model';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnChanges, OnInit {
  @Input() products: Product[];
  @Output() delete = new EventEmitter<Product>();
  @Output() edit = new EventEmitter<Product>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  columnsToDisplay = ['name', 'details', 'price', 'actions'];
  dataSource = new MatTableDataSource();

  constructor() {}

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.products && simpleChanges.products.currentValue) {
      this.dataSource.data = this.products;
    }
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}
