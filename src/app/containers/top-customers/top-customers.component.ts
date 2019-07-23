import { Component } from '@angular/core';
import { CustomerFacade } from 'facades/customer.facade';

@Component({
  selector: 'app-top-customers',
  templateUrl: './top-customers.component.html',
  styleUrls: ['./top-customers.component.scss']
})
export class TopCustomersComponent {
  constructor(public customers: CustomerFacade) {
    customers.loadAll();
  }
}
