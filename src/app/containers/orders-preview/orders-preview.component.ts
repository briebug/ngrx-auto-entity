import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CustomerFacade } from 'facades/customer.facade';
import { OrderFacade } from 'facades/order.facade';
import { OrderManagerService } from 'src/app/+orders/services/orderManager.service';
import { OrderStatus } from 'models/order.model';

const DEFAULT_STATUS = [OrderStatus.open, OrderStatus.completed];

@Component({
  selector: 'app-orders-preview',
  templateUrl: './orders-preview.component.html',
  styleUrls: ['./orders-preview.component.scss']
})
export class OrdersPreviewComponent {
  status$ = new BehaviorSubject(DEFAULT_STATUS);

  constructor(public orderManager: OrderManagerService, orderFacade: OrderFacade, customerFacade: CustomerFacade) {
    orderFacade.loadAll();
    customerFacade.loadAll();
  }

  setStatus(status: OrderStatus[]) {
    this.status$.next(status || DEFAULT_STATUS);
  }
}
