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
import { combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import { filter, map, skip, switchMap, switchMapTo, take, tap, startWith } from 'rxjs/operators';
import { omitByKeys } from 'shared/libs/util.lib';
import { OrderInfo } from 'src/app/+orders/models/order-info.model';
import {
  IOrderFormDialogData,
  OrderFormDialogComponent
} from 'src/app/+orders/exports/order-form-dialog/order-form-dialog.component';
import { IOrderFormItem, IOrderFormValue } from 'src/app/+orders/exports/order-form/order-form.component';
import { AppState } from 'state/app.state';
import { Account } from 'models/account.model';
import { createAndFetch$ } from 'shared/libs/facade.lib';

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

  // Order form
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
    const newOrder$ = new ReplaySubject<Order>(1);
    const newAccount$ = !order.accountId
      ? createAndFetch$(this.accountFacade, AccountFacade.getNewPersonalTab(order.customerId))
      : of(null);

    // Order
    newAccount$.pipe(take(1)).subscribe((newAccount: Account | null) => {
      order.accountId = order.accountId || newAccount.id;
      if (order.id) {
        this.orderFacade.update(order);
        newOrder$.next(null);
      } else {
        createAndFetch$(this.orderFacade, order)
          .pipe(take(1))
          .subscribe(newOrder$);
      }
    });

    // Order items
    newOrder$.pipe(take(1)).subscribe((newOrder: Order | null) => {
      let orderItem: OrderItem;
      formValue.items.forEach((item: IOrderFormItem) => {
        if (item.id) {
          orderItem = { ...omitByKeys(item, ['toDelete']), orderId: formValue.id };
          if (item.toDelete) {
            this.orderItemFacade.delete({ ...orderItem });
          } else {
            this.orderItemFacade.update({ ...orderItem });
          }
        } else {
          orderItem = {
            ...omitByKeys(item, ['toDelete']),
            orderId: newOrder.id,
            id: `${newOrder.id}_${item.productId}`
          };
          this.orderItemFacade.create({ ...orderItem });
        }

        newOrder$.complete();
      });
    });
  }
}
