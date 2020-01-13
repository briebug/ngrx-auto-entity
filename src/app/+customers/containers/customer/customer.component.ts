import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';

import { CustomerFacade } from '../../../facades';
import { Customer } from '../../../models';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customer: Observable<Customer>;
  valid = false;

  private updatedCustomer: Customer;

  constructor(private activatedRoute: ActivatedRoute, private customerFacade: CustomerFacade) {}

  ngOnInit() {
    this.customer = this.activatedRoute.paramMap.pipe(
      filter(params => params.has('id')),
      map(params => +params.get('id')),
      tap(id => {
        this.customerFacade.selectByKey(id);
        this.hasCustomerWithIdInState(id)
          .pipe(first())
          .subscribe(exists => {
            if (!exists) {
              this.customerFacade.load(id);
            }
          });
      }),
      switchMap(() => this.customerFacade.current$)
    );
  }

  hasCustomerWithIdInState(id: number): Observable<boolean> {
    return this.customerFacade.ids$.pipe(map((ids: number[]) => ids.indexOf(id) > -1));
  }

  onCustomerChange(payload: { customer: Customer; valid: boolean }) {
    this.valid = payload.valid;
    if (this.valid) {
      this.updatedCustomer = payload.customer;
    }
  }

  onSave() {
    if (!this.valid) {
      return;
    }

    if (this.updatedCustomer.id == null) {
      this.customerFacade.create(this.updatedCustomer);
    } else {
      this.customerFacade.update(this.updatedCustomer);
    }
  }
}
