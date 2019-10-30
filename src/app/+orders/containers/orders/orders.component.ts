import { Component, OnInit } from '@angular/core';
import { CustomerFacade } from 'facades/customer.facade';
import { OrderFacade } from 'facades/order.facade';
import { OrderManagerService } from 'src/app/+orders/services/orderManager.service';
import { OrderStatus } from 'models/order.model';
import { OrderInfo } from 'src/app/+orders/models/orderInfo.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOrdersPreviewTableColumns } from 'src/app/+orders/components/orders-preview-table/orders-preview-table.component';
import { OrderItemFacade } from 'facades/orderItem.facade';
import { ProductFacade } from 'facades/product.facade';

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

  columnsToDisplay: IOrdersPreviewTableColumns[] = ['customer', 'dateOfOrder', 'status', 'userActions'];

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

  ngOnInit() {}

  private initOrders$() {
    this.orders$ = this.orderManager.recentOrderInfoByStatus$(this.statusFilter$.asObservable());
  }
}
