import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Product } from 'models/product.model';

@Component({
  selector: 'app-products-basic-table',
  templateUrl: './products-basic-table.component.html',
  styleUrls: ['./products-basic-table.component.scss']
})
export class ProductsBasicTableComponent implements OnChanges {
  @Input() products: Product[];

  columnsToDisplay = ['name', 'price', 'dateAdded'];
  dataSource = new MatTableDataSource();

  constructor() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.products && simpleChanges.products.currentValue) {
      this.dataSource.data = this.products;
    }
  }
}
