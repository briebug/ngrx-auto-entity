import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Product } from '../../../models';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnChanges, OnInit, OnDestroy {
  @Input() products: Product[];
  @Input() set selectedProducts(val: Product[]) {
    this.selection.clear();
    this.selection.select(...val);
  }
  @Output() delete = new EventEmitter<Product>();
  @Output() edit = new EventEmitter<Product>();
  @Output() select = new EventEmitter<Product[]>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  columnsToDisplay = ['id', 'name', 'details', 'price', 'dateAdded', 'actions'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);
  private destroy$ = new Subject<void>();

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
    this.setupSelectionOutput();
  }

  private setupSelectionOutput() {
    this.selection.changed
      .pipe(
        map(changedEvent => changedEvent.source.selected),
        takeUntil(this.destroy$)
      )
      .subscribe(selected => this.select.emit(selected));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
