import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerFacade } from 'facades/customer.facade';
import { Customer } from 'models/customer.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top-customers',
  templateUrl: './top-customers.component.html',
  styleUrls: ['./top-customers.component.scss']
})
export class TopCustomersComponent implements OnInit {
  customers$: Observable<Customer[]>;

  constructor(private customerFacade: CustomerFacade) {}

  ngOnInit() {
    this.customerFacade.loadAll();
    this.customers$ = this.customerFacade.top(12);
  }
}
