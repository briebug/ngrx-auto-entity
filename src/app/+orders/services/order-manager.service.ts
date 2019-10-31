import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { CustomerFacade } from 'facades/customer.facade';
import { OrderItemFacade } from 'facades/order-item.facade';
import { OrderFacade } from 'facades/order.facade';
import { ProductFacade } from 'facades/product.facade';
import { OrderItem } from 'models/order-item.model';
import { OrderStatus } from 'models/order.model';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OrderInfo } from 'src/app/+orders/models/order-info.model';
import { IOrderFormDialogData, OrderFormDialogComponent } from 'src/app/+orders/shared/order-form-dialog/order-form-dialog.component';
import { AppState } from 'state/app.state';

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
        return count ? orders.slice(0, count) : orders;
      })
    );
  }

  openEditOrderFormDialog(info: OrderInfo): MatDialogRef<OrderFormDialogComponent> {
    const data: IOrderFormDialogData = { orderInfo: info };
    return this.dialogService.open(OrderFormDialogComponent, { data });
  }
}
