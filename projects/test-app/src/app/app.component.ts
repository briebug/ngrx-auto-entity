import { Component } from '@angular/core';
import { CustomerFacade } from './state/customer.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-app';

  constructor(public customers: CustomerFacade) {
    customers.loadAll();
    setTimeout(() => customers.clear(), 3000);
  }
}
