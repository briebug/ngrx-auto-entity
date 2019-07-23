import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Order } from 'models/order.model';
import { AppState } from 'state/app.state';
import { OrderItem } from '../models/orderItem.model';
import { OrderItemFacadeBase } from '../state/orderItem.state';
import { FeatureState } from '../state/feature.state';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderItemFacade extends OrderItemFacadeBase {
  constructor(store: Store<FeatureState>) {
    super(OrderItem, store);
  }

  all() {
    return this.all$.pipe(
      tap(items => console.log(items))
    );
  }

  loadForOrder(order: Order) {
    return this.loadAll({ orderId: order.id });
  }

  unload() {
    this.clear();
  }
}
