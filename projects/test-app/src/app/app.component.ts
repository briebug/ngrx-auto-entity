import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AccountFacade } from './state/account';
import { CustomerFacade } from './state/customer';
import { CustomerTableComponent } from './customers/customer-table.component';
import { AccountTableComponent } from './accounts/account-table';
import { EditCustomerComponent } from './customers/edit-customer.component';

@Component({
  /* eslint-disable-next-line @angular-eslint/prefer-standalone */
  standalone: false,
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CustomerTableComponent, AccountTableComponent, ReactiveFormsModule, EditCustomerComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  protected readonly customers = inject(CustomerFacade);
  protected readonly accounts = inject(AccountFacade);

  constructor() {
    this.customers.loadManyIfNecessary();
  }
}
