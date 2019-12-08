import { Component, OnInit } from '@angular/core';
import { AccountFacade } from 'facades/account.facade';
import { CustomerFacade } from 'facades/customer.facade';
import { OrderItemFacade } from 'facades/order-item.facade';
import { OrderFacade } from 'facades/order.facade';
import { ProductFacade } from 'facades/product.facade';
import { OrderStatus } from 'models/order.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderInfo } from 'src/app/+orders/models/order-info.model';
import { OrderManagerService } from 'src/app/+orders/services/order-manager.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  statusFilter$: BehaviorSubject<OrderStatus[]> = new BehaviorSubject<OrderStatus[]>([
    OrderStatus.archived,
    OrderStatus.completed,
    OrderStatus.open,
    OrderStatus.pending
  ]);
  orders$: Observable<OrderInfo[]>;

  constructor(
    private orderManager: OrderManagerService,
    orderFacade: OrderFacade,
    customerFacade: CustomerFacade,
    orderItemFacade: OrderItemFacade,
    productFacade: ProductFacade,
    accountFacade: AccountFacade
  ) {
    // TODO: Put inside a resolver and add a check to see if entities have been loaded recently? (mostly the latter)
    orderFacade.loadAll();
    customerFacade.loadAll();
    orderItemFacade.loadAll();
    productFacade.loadAll();
    accountFacade.loadAll();

    this.initOrders$();
  }

  ngOnInit() {}

  private initOrders$() {
    this.orders$ = this.orderManager.recentOrderInfoByStatus$(this.statusFilter$.asObservable());
  }
}
