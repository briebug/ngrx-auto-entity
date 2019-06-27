import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { OrderFacade } from 'facades/order.facade';
import { Order } from 'models/order.model';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order: Observable<Order>;
  valid = false;

  private updatedOrder: Order;

  constructor(private activatedRoute: ActivatedRoute, private orderFacade: OrderFacade) {}

  ngOnInit() {
    this.order = this.activatedRoute.paramMap.pipe(
      filter(params => params.has('id')),
      map(params => +params.get('id')),
      tap(id => {
        this.orderFacade.selectByKey(id);
        this.hasOrderWithIdInState(id)
          .pipe(first())
          .subscribe(exists => {
            if (!exists) {
              this.orderFacade.load(id);
            }
          });
      }),
      switchMap(() => this.orderFacade.current)
    );
  }

  hasOrderWithIdInState(id: number): Observable<boolean> {
    return this.orderFacade.ids.pipe(map((ids: number[]) => ids.indexOf(id) > -1));
  }

  onOrderChange(payload: { order: Order; valid: boolean }) {
    this.valid = payload.valid;
    if (this.valid) {
      this.updatedOrder = payload.order;
    }
  }

  onSave() {
    if (!this.valid) {
      return;
    }

    if (this.updatedOrder.id == null) {
      this.orderFacade.create(this.updatedOrder);
    } else {
      this.orderFacade.update(this.updatedOrder);
    }
  }

  private loadOrderById(id: number) {
    this.hasOrderWithIdInState(id).pipe(first());
  }
}
