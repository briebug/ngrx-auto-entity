import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { IEntityDictionary } from '@briebug/ngrx-auto-entity';
import { ProductFacade } from 'facades/product.facade';
import { OrderStatus } from 'models/order.model';
import { Product } from 'models/product.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { toCurrencyString } from 'shared/libs/currency.lib';
import { OrderInfo } from 'src/app/+orders/models/order-info.model';
import { OrderManagerService } from 'src/app/+orders/services/order-manager.service';

const DEFAULT_COLUMNS: IOrdersPreviewTableColumns[] = ['id', 'customer', 'dateOfOrder', 'numberOfItems', 'total', 'status', 'userActions'];

const EDITABLE_STATUSES: OrderStatus[] = [OrderStatus.open, OrderStatus.pending];

@Component({
  selector: 'app-orders-preview-table',
  templateUrl: './orders-preview-table.component.html',
  styleUrls: ['./orders-preview-table.component.scss'],
  animations: [
    trigger('hiddenRowExpand', [
      state('collapsed', style({ height: '0px', 'padding-bottom': '0px', 'padding-top': '0px' })),
      state('expanded', style({ height: '*', 'padding-bottom': '30px', 'padding-top': '15px' })),
      transition('expanded => collapsed', animate('0.3s')),
      transition('collapsed => expanded', animate('0.3s'))
    ])
  ]
})
export class OrdersPreviewTableComponent implements OnInit, OnDestroy {
  @Input() orders$: Observable<OrderInfo[]>;
  @Input() columnsToDisplay: IOrdersPreviewTableColumns[] = DEFAULT_COLUMNS;

  productsById$: Observable<IEntityDictionary<Product>>;

  // Template state
  dataSource = new MatTableDataSource<OrderInfo>();
  selectedOrderId: number;
  orderIdInCloseAnimation: number;

  toCurrencyString = toCurrencyString;
  private unsubscribe$ = new Subject<void>();

  constructor(private productFacade: ProductFacade, private orderManagerService: OrderManagerService) {
    this.initFacadeData();
  }

  ngOnInit() {
    this.initDataSourceSubscription();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /* Handlers */
  handleEditClick(info: OrderInfo) {
    this.orderManagerService.openOrderFormDialog(info);
  }

  handleExpandClick(info: OrderInfo) {
    this.orderIdInCloseAnimation = this.selectedOrderId;
    this.selectedOrderId = this.isSelectedOrder(info) ? null : info.order.id;
    setTimeout(() => (this.orderIdInCloseAnimation = null), 300);
  }

  /* Public */
  isSelectedOrder(info: OrderInfo): boolean {
    return this.selectedOrderId === info.order.id;
  }

  isEditable(info: OrderInfo): boolean {
    return EDITABLE_STATUSES.includes(info.order.status);
  }

  /* Init */
  private initFacadeData() {
    this.productsById$ = this.productFacade.entities$;
  }

  private initDataSourceSubscription() {
    this.orders$.pipe(takeUntil(this.unsubscribe$)).subscribe((infos: OrderInfo[]) => {
      this.dataSource.data = infos;
    });
  }
}

export type IOrdersPreviewTableColumns = 'id' | 'customer' | 'dateOfOrder' | 'status' | 'numberOfItems' | 'total' | 'userActions';
