import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { AccountFacade } from 'facades/account.facade';
import { CustomerFacade } from 'facades/customer.facade';
import { OrderItemFacade } from 'facades/order-item.facade';
import { OrderFacade } from 'facades/order.facade';
import { ProductFacade } from 'facades/product.facade';
import { OrderItem } from 'models/order-item.model';
import { Order, OrderStatus } from 'models/order.model';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { omitByKeys } from 'shared/libs/util.lib';
import {
  IOrderFormDialogData,
  OrderFormDialogComponent
} from 'src/app/+orders/exports/order-form-dialog/order-form-dialog.component';
import { IOrderFormItem, IOrderFormValue } from 'src/app/+orders/exports/order-form/order-form.component';
import { OrderInfo } from 'src/app/+orders/models/order-info.model';
import { AppState } from 'state/app.state';
import { upsertFullOrder } from 'state/order.state';

@Injectable({
  providedIn: 'root'
})
export class OrderManagerService {
  constructor(
    private store: Store<AppState>,
    private orderFacade: OrderFacade,
    private customerFacade: CustomerFacade,
    private orderItemFacade: OrderItemFacade,
    private productFacade: ProductFacade,
    private accountFacade: AccountFacade,
    private dialogService: MatDialog
  ) {}

  /* Order Info */
  orderInfoByStatus$(status$: Observable<OrderStatus[]>): Observable<OrderInfo[]> {
    return status$.pipe(
      switchMap(status =>
        combineLatest([
          this.orderFacade.ofStatus(status),
          this.customerFacade.entities$,
          this.orderItemFacade.all$,
          this.productFacade.entities$
        ]).pipe(
          map(([orders, customersById, orderItems, productsById]) => {
            // TODO: Sort out all this stuff for better readability
            return orders
              .map(order => ({
                order,
                customer: customersById[order.customerId],
                items: orderItems.filter((item: OrderItem) => item.orderId === order.id)
              }))
              .map(
                (customerOrder): OrderInfo => {
                  return {
                    order: customerOrder.order,
                    items: customerOrder.items,
                    customerName: customerOrder.customer ? customerOrder.customer.name : '<unknown>',
                    dateLocaleString: new Date(customerOrder.order.dateOfOrder).toLocaleString(),
                    total: customerOrder.items.reduce((total: number, item: OrderItem) => {
                      return productsById[item.productId]
                        ? total + +productsById[item.productId].price * item.quantity
                        : total;
                    }, 0)
                  };
                }
              );
          })
        )
      )
    );
  }

  recentOrderInfoByStatus$(status$: Observable<OrderStatus[]>, count?: number): Observable<OrderInfo[]> {
    return this.orderInfoByStatus$(status$).pipe(
      map(orders => {
        orders.sort((a, b) => b.order.dateOfOrder.localeCompare(a.order.dateOfOrder));
        return count ? orders.slice(0, count) : [...orders];
      })
    );
  }

  /* Order Form */
  openOrderFormDialog(info?: OrderInfo): MatDialogRef<OrderFormDialogComponent> {
    const data: IOrderFormDialogData = {
      orderInfo: info,
      handleSaveClick: (value: IOrderFormValue, dialogRef: MatDialogRef<OrderFormDialogComponent>) => {
        this.saveOrderFormToDatabase(value);
        dialogRef.close();
      }
    };
    return this.dialogService.open(OrderFormDialogComponent, { data, disableClose: true });
  }

  saveOrderFormToDatabase(formValue: IOrderFormValue) {
    const order: Order = {
      ...omitByKeys(formValue, ['items']),
      dateOfOrder: formValue.dateOfOrder || new Date().toISOString(),
      status: formValue.status || OrderStatus.pending // Should this be open instead of pending?
    };

    // Full Order Upsert
    this.store.dispatch(
      upsertFullOrder({
        order,
        orderItems: formValue.items
          .filter(item => !item.toDelete)
          .map((item: IOrderFormItem) => {
            return { ...omitByKeys(item, ['toDelete']) };
          })
      })
    );

    // Order Item Delete
    let orderItem: OrderItem;
    formValue.items
      .filter(item => item.toDelete)
      .forEach((item: IOrderFormItem) => {
        orderItem = { ...omitByKeys(item, ['toDelete']), orderId: order.id };
        this.orderItemFacade.delete({ ...orderItem });
      });
  }
}
