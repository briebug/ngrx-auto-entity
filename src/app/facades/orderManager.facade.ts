import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'state/app.state';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { OrderFacadeBase } from 'state/order.state';
import { Order, OrderStatus } from 'models/order.model';
import { OrderItemFacade } from 'facades/orderItem.facade';
import { OrderFacade } from 'facades/order.facade';
import { CustomerFacade } from 'facades/customer.facade';
import { OrderInfo } from 'models/orderInfo';

@Injectable({
  providedIn: 'root'
})
export class OrderManagerFacade  {
  constructor(
    private store: Store<AppState>,
    private orderFacade: OrderFacade,
    private orderItemFacade: OrderItemFacade,
    private customerFacade: CustomerFacade) {
  }

  orderInfoByStatus(...status: OrderStatus[]): Observable<OrderInfo[]> {
    return this.orderFacade.ofStatus(...status).pipe(
      withLatestFrom(this.customerFacade.all),
      map(([orders, customers]) =>
        orders.map(order => ({
          order,
          customer: customers.find(customer => customer.id === order.customerId)
        })).map(co => ({
          id: co.order.id,
          customer: co.customer ? co.customer.name : '<unknown>',
          dateOfOrder: co.order.dateOfOrder,
          status: co.order.status
        } as OrderInfo))
      )
    )
  }

  recentOrderInfoByStatus(count: number, ...status: OrderStatus[]): Observable<OrderInfo[]> {
    return this.orderInfoByStatus(...status).pipe(
      map(orders => {
        orders.sort((a,b) => b.dateOfOrder.localeCompare(a.dateOfOrder));
        return orders.slice(0, count);
      })
    )
  }
}
