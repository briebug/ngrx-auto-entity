import { Component } from '@angular/core';
import { distinctUntilChanged, first } from 'rxjs/operators';
import { AccountFacade } from './state/account.facade';
import { CustomerFacade } from './state/customer.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public customers: CustomerFacade, public accounts: AccountFacade) {
    accounts.loadAll();
    customers.loadAll();
    setTimeout(() => customers.clear(), 3000);

    setTimeout(() => {
      accounts.current$
        .pipe(
          first(current => !!current),
          distinctUntilChanged()
        )
        .subscribe(current => accounts.update(current));
      accounts.selectByKey(1);
    }, 3000);
  }
}
