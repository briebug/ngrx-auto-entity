import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order } from 'models/order.model';
import { OrderItem } from 'models/orderItem.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'state/app.state';
import { OrderItemFacadeBase } from 'state/orderItem.state';

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
