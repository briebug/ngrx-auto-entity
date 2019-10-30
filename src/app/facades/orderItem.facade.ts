import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order } from 'models/order.model';
import { tap } from 'rxjs/operators';
import { OrderItem } from '../models/orderItem.model';
import { FeatureState } from '../+orders/state/feature.state';
import { OrderItemFacadeBase } from '../state/orderItem.state';


@Injectable({
  providedIn: 'root'
})
export class OrderItemFacade extends OrderItemFacadeBase {
  constructor(store: Store<FeatureState>) {
    super(OrderItem, store);
  }

  all() {
    return this.all$.pipe(tap(items => console.log(items)));
  }

  loadForOrder(order: Order) {
    return this.loadAll({ orderId: order.id });
  }

  unload() {
    this.clear();
  }
}
