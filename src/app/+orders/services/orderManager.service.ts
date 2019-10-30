import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomerFacade } from 'facades/customer.facade';
import { OrderFacade } from 'facades/order.facade';
import { OrderItemFacade } from 'facades/orderItem.facade';
import { ProductFacade } from 'facades/product.facade';
import { OrderStatus } from 'models/order.model';
import { OrderItem } from 'models/orderItem.model';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OrderInfo } from 'src/app/+orders/models/orderInfo.model';
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
    private productFacade: ProductFacade
  ) {}

  orderInfoByStatus$(status$: Observable<OrderStatus[]>): Observable<OrderInfo[]> {
    return status$.pipe(
      switchMap(status =>
        combineLatest([
          this.orderFacade.ofStatus(status),
          this.customerFacade.entities$,
          this.orderItemFacade.all$,
          this.productFacade.entities$
          // of([]),
          // of({})
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
                    customerName: customerOrder.customer ? customerOrder.customer.name : '<unknown>',
                    dateOfOrder: customerOrder.order.dateOfOrder,
                    numberOfItems: customerOrder.items.length,
                    total: customerOrder.items.reduce((total: number, item: OrderItem) => {
                      return productsById[item.productId] ? total + +productsById[item.productId].price : total;
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
        orders.sort((a, b) => b.dateOfOrder.localeCompare(a.dateOfOrder));
        return count ? orders.slice(0, count) : orders;
      })
    );
  }
}
