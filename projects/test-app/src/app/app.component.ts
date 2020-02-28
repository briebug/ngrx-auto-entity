import { Component } from '@angular/core';
import { distinctUntilChanged, first, map } from 'rxjs/operators';
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

    setInterval(() => {
      const id1 = 1; // Math.round(Math.random() * 100 + Math.random() * 20);
      accounts.all$
        .pipe(
          map(accts => accts.find(account => account.id === id1)),
          first()
        )
        .subscribe(account =>
          accounts.replace({
            ...account,
            amount: Math.random() * 1000
          })
        );

      const id2 = 10; // Math.round(Math.random() * 100 + Math.random() * 20);
      accounts.all$
        .pipe(
          map(accts => accts.find(account => account.id === id2)),
          first()
        )
        .subscribe(account =>
          accounts.replace({
            ...account,
            amount: Math.random() * 1000
          })
        );

      const id3 = 100; // Math.round(Math.random() * 100 + Math.random() * 20);
      accounts.all$
        .pipe(
          map(accts => accts.find(account => account.id === id3)),
          first()
        )
        .subscribe(account =>
          accounts.replace({
            ...account,
            amount: Math.random() * 1000
          })
        );

      const id4 = Math.round(Math.random() * 100 + Math.random() * 20);
      accounts.all$
        .pipe(
          map(accts => accts.find(account => account.id === id4)),
          first()
        )
        .subscribe(account =>
          accounts.replace({
            ...account,
            amount: Math.random() * 1000
          })
        );
    }, 250);
  }
}
