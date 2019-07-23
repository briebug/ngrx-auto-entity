import { Component, OnInit, ViewChild } from '@angular/core';

import { OrderStatus } from 'models/order.model';
import { OrdersPreviewComponent } from '../orders-preview/orders-preview.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('ordersPreview', { static: false }) ordersPreview: OrdersPreviewComponent;

  constructor() {}

  ngOnInit() {}

  showPending() {
    this.ordersPreview.setStatus([OrderStatus.pending]);
  }

  showCurrent() {
    this.ordersPreview.setStatus([OrderStatus.open, OrderStatus.completed]);
  }

  showArchived() {
    this.ordersPreview.setStatus([OrderStatus.archived]);
  }
}
