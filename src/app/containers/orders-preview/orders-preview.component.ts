import { Component } from '@angular/core';
import { CustomerFacade } from 'facades/customer.facade';
import { OrderFacade } from 'facades/order.facade';
import { OrderItemFacade } from 'facades/order-item.facade';
import { OrderStatus } from 'models/order.model';
import { BehaviorSubject } from 'rxjs';
import { OrderManagerService } from 'src/app/+orders/services/order-manager.service';

const DEFAULT_STATUS = [OrderStatus.open, OrderStatus.completed];

@Component({
  selector: 'app-orders-preview',
  templateUrl: './orders-preview.component.html',
  styleUrls: ['./orders-preview.component.scss']
})
export class OrdersPreviewComponent {
  status$ = new BehaviorSubject(DEFAULT_STATUS);

  constructor(
    public orderManager: OrderManagerService,
    orderFacade: OrderFacade,
    orderItemFacade: OrderItemFacade,
    customerFacade: CustomerFacade
  ) {
    orderFacade.loadAll();
    orderItemFacade.loadAll();
    customerFacade.loadAll();
  }

  setStatus(status: OrderStatus[]) {
    this.status$.next(status || DEFAULT_STATUS);
  }
}
