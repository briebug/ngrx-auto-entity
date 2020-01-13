import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Order, OrderStatus } from '../models';
import { AppState } from '../state/app.state';
import { OrderFacadeBase } from '../state/order.state';

@Injectable({
  providedIn: 'root'
})
export class OrderFacade extends OrderFacadeBase {
  constructor(store: Store<AppState>) {
    super(Order, store);
  }

  ofStatus(status: OrderStatus[]): Observable<Order[]> {
    return this.all$.pipe(map(orders => orders.filter(order => status.includes(order.status))));
  }

  recentOfStatus(count: number, status: OrderStatus[]): Observable<Order[]> {
    return this.ofStatus(status).pipe(
      map(order => {
        order.sort((a, b) => b.dateOfOrder.localeCompare(a.dateOfOrder));
        return order;
      }),
      map(order => order.slice(0, count))
    );
  }

  recentPending(count: number): Observable<Order[]> {
    return this.recentOfStatus(count, [OrderStatus.pending]);
  }

  recentActive(count: number): Observable<Order[]> {
    return this.recentOfStatus(count, [OrderStatus.open, OrderStatus.completed]);
  }

  recentArchived(count: number): Observable<Order[]> {
    return this.recentOfStatus(count, [OrderStatus.archived]);
  }
}
