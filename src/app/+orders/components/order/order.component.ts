import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItemFacade } from '../../../facades/order-item.facade';
import { OrderItem } from '../../../models/orderItem.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  all$: Observable<OrderItem[]>;

  constructor(public orderItems: OrderItemFacade) {
    orderItems.loadAll();
  }

  ngOnInit() {
    this.all$ = this.orderItems.all();
  }
}
