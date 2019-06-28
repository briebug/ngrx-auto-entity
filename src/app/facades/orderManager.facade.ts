import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, noop, Observable } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';

import { CustomerFacade } from 'facades/customer.facade';
import { OrderFacade } from 'facades/order.facade';
import { OrderItemFacade } from 'facades/orderItem.facade';
import { Order, OrderStatus } from 'models/order.model';
import { OrderInfo } from 'models/orderInfo';
import { AppState } from 'state/app.state';

interface IOrderSearch {
  q: string;
  status: OrderStatus[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderManagerFacade {
  constructor(
    private store: Store<AppState>,
    private orderFacade: OrderFacade,
    private orderItemFacade: OrderItemFacade,
    private customerFacade: CustomerFacade
  ) {}

  orderInfo(selection: Observable<Order[]>) {
    return selection.pipe(
      withLatestFrom(this.customerFacade.all),
      map(([orders, customers]) =>
        orders
          .map(order => ({
            order,
            customer: customers.find(customer => customer.id === order.customerId)
          }))
          .map(
            co =>
              ({
                id: co.order.id,
                customer: co.customer ? co.customer.name : '<unknown>',
                dateOfOrder: co.order.dateOfOrder,
                status: co.order.status,
                total: co.order.total
              } as OrderInfo)
          )
      )
    );
  }

  recentOrderInfoByStatus(count?: number, ...status: OrderStatus[]): Observable<OrderInfo[]> {
    return this.orderInfo(this.orderFacade.ofStatus(...status)).pipe(
      map(orders => orders.sort((a, b) => b.dateOfOrder.localeCompare(a.dateOfOrder))),
      map(orders => (count ? orders.slice(0, count) : orders))
    );
  }
}
