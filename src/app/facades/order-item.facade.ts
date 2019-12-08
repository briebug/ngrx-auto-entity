import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order } from 'models/order.model';
import { tap } from 'rxjs/operators';
import { AppState } from 'state/app.state';
import { OrderItem } from '../models/order-item.model';
import { OrderItemFacadeBase } from '../state/order-item.state';


@Injectable({
  providedIn: 'root'
})
export class OrderItemFacade extends OrderItemFacadeBase {
  constructor(store: Store<AppState>) {
    super(OrderItem, store);
  }

  loadForOrder(order: Order) {
    return this.loadAll({ orderId: order.id });
  }

  unload() {
    this.clear();
  }
}
