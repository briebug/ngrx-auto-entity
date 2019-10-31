import { Component, OnInit } from '@angular/core';
import { CustomerFacade } from 'facades/customer.facade';
import { OrderFacade } from 'facades/order.facade';
import { OrderItemFacade } from 'facades/order-item.facade';
import { ProductFacade } from 'facades/product.facade';
import { OrderStatus } from 'models/order.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderInfo } from 'src/app/+orders/models/order-info.model';
import { OrderManagerService } from 'src/app/+orders/services/order-manager.service';
import { IOrdersPreviewTableColumns } from 'src/app/+orders/shared/orders-preview-table/orders-preview-table.component';

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
    productFacade: ProductFacade
  ) {
    orderFacade.loadAll();
    customerFacade.loadAll();
    orderItemFacade.loadAll();
    productFacade.loadAll();

    this.initOrders$();
  }

  ngOnInit() {
    console.log('orders init');
    this.orders$.subscribe(v => console.log('orders', v));
  }

  private initOrders$() {
    this.orders$ = this.orderManager.recentOrderInfoByStatus$(this.statusFilter$.asObservable());
  }
}
