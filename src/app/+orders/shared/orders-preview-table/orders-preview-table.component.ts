import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { OrderItem } from 'models/orderItem.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrderInfo } from 'src/app/+orders/models/order-info.model';
import { IOrderFormItem, IOrderFormValue } from 'src/app/+orders/shared/order-form/order-form.component';
import { IEntityDictionary } from '@briebug/ngrx-auto-entity';
import { Product } from 'models/product.model';
import { ProductFacade } from 'facades/product.facade';

const DEFAULT_COLUMNS: IOrdersPreviewTableColumns[] = [
  'id',
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
      state('collapsed', style({ height: '0px', 'padding-bottom': '0px', 'padding-top': '0px' })),
      state('expanded', style({ height: '*', 'padding-bottom': '30px', 'padding-top': '30px' })),
      transition('expanded => collapsed', animate('0.3s')),
      transition('collapsed => expanded', animate('0.3s'))
    ])
  ]
})
export class OrdersPreviewTableComponent implements OnInit, OnDestroy {
  @Input() orders$: Observable<OrderInfo[]>;
  @Input() columnsToDisplay: IOrdersPreviewTableColumns[] = DEFAULT_COLUMNS;

  productsById$: Observable<IEntityDictionary<Product>>;

  dataSource = new MatTableDataSource<OrderInfo>();

  // Template state
  selectedOrderId: number;
  orderIdInCloseAnimation: number;

  unsubscribe$ = new Subject<void>();

  constructor(private productFacade: ProductFacade) {
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
  handleExpandClick(info: OrderInfo) {
    this.orderIdInCloseAnimation = this.selectedOrderId;
    this.selectedOrderId = this.isSelectedOrder(info) ? null : info.order.id;
    setTimeout(() => (this.orderIdInCloseAnimation = null), 400);
  }

  /* Public */
  toCurrencyString(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }

  toOrderFormValue(info: OrderInfo): IOrderFormValue {
    return {
      ...info.order,
      items: info.items.map(
        (item: OrderItem): IOrderFormItem => {
          return { productId: item.productId, quantity: item.quantity };
        }
      )
    };
  }

  isSelectedOrder(info: OrderInfo): boolean {
    return this.selectedOrderId === info.order.id;
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

export type IOrdersPreviewTableColumns =
  | 'id'
  | 'customer'
  | 'dateOfOrder'
  | 'status'
  | 'numberOfItems'
  | 'total'
  | 'userActions';
