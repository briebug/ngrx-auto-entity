import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CustomerFacade } from 'facades/customer.facade';
import { OrderFacade } from 'facades/order.facade';
import { OrderManagerFacade } from 'facades/orderManager.facade';
import { Order, OrderStatus } from 'models/order.model';
import { OrderInfo } from 'models/orderInfo';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders$: Observable<OrderInfo[]>;

  constructor(
    private router: Router,
    private orderFacade: OrderFacade,
    private orderManager: OrderManagerFacade,
    private customerFacade: CustomerFacade
  ) {}

  ngOnInit() {
    this.customerFacade.loadAll();
    this.orderFacade.loadAll();
    this.orders$ = this.orderManager.recentOrderInfoByStatus(5, ...[OrderStatus.open, OrderStatus.completed]);
  }

  onDelete(order: Order) {
    this.orderFacade.delete(order);
  }

  onEdit(order: Order) {
    this.orderFacade.select(order);
    this.router.navigate(['orders', order.id]);
  }
}
