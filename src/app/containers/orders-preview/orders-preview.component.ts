import { Component } from '@angular/core';
import { AccountFacade } from 'facades/account.facade';
import { CustomerFacade } from 'facades/customer.facade';
import { OrderItemFacade } from 'facades/order-item.facade';
import { OrderFacade } from 'facades/order.facade';
import { ProductFacade } from 'facades/product.facade';
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
    customerFacade: CustomerFacade,
    productFacade: ProductFacade,
    accountFacade: AccountFacade
  ) {
    // TODO: Put inside a resolver and add a check to see if entities have been loaded recently? (mostly the latter)
    // Customers and Products are being loaded twice at the moment due to the Orders Preview being part of the homepage
    // (along with the Customers Preview and Product Catalog)
    orderFacade.loadAll();
    orderItemFacade.loadAll();
    customerFacade.loadAll();
    productFacade.loadAll();
    accountFacade.loadAll();
  }

  setStatus(status: OrderStatus[]) {
    this.status$.next(status || DEFAULT_STATUS);
  }
}
