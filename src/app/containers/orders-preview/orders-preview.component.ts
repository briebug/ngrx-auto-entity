import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderInfo } from 'models/orderInfo';
import { OrderManagerFacade } from 'facades/orderManager.facade';
import { OrderFacade } from 'facades/order.facade';
import { CustomerFacade } from 'facades/customer.facade';
import { OrderStatus } from 'models/order.model';

@Component({
  selector: 'app-orders-preview',
  templateUrl: './orders-preview.component.html',
  styleUrls: ['./orders-preview.component.scss']
})
export class OrdersPreviewComponent implements OnInit {
  orders$: Observable<OrderInfo[]>;

  constructor(
    private orderManager: OrderManagerFacade,
    private orderFacade: OrderFacade,
    private customerFacade: CustomerFacade) { }

  ngOnInit() {
    this.orderFacade.loadAll();
    this.customerFacade.loadAll();

    this.orders$ = this.orderManager.recentOrderInfoByStatus(
      5, ...[OrderStatus.open, OrderStatus.completed]
    );
  }

  setStatus(...status: OrderStatus[]) {
    this.orders$ = this.orderManager.recentOrderInfoByStatus(5, ...status);
  }
}
