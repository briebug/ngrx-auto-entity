import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CustomerFacade } from '../../../facades';
import { Customer } from '../../../models';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers$: Observable<Customer[]>;

  constructor(private router: Router, private customerFacade: CustomerFacade) {}

  ngOnInit() {
    this.customerFacade.loadAll();
    this.customers$ = this.customerFacade.all$;
  }

  onDelete(customer: Customer) {
    this.customerFacade.delete(customer);
  }

  onEdit(customer: Customer) {
    this.customerFacade.select(customer);
    this.router.navigate(['customers', customer.id]);
  }
}
