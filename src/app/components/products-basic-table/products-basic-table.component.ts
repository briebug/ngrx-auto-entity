import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'models/product.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-products-basic-table',
  templateUrl: './products-basic-table.component.html',
  styleUrls: ['./products-basic-table.component.scss']
})
export class ProductsBasicTableComponent implements OnInit, OnChanges {
  @Input() products: Product[];

  columnsToDisplay = ['name', 'price', 'dateAdded'];
  dataSource = new MatTableDataSource();

  constructor() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.products && simpleChanges.products.currentValue) {
      this.dataSource.data = this.products;
    }
  }

  ngOnInit() {
  }
}
