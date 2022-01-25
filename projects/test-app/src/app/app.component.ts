import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { allCustomers, customerEditedById, customerEditEnded, manyCustomersLoadingIfNecessary } from './state/feature/customer.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  all$ = this.store.select(allCustomers);

  constructor(private store: Store) {
    // accounts.loadAll();
    // customers.loadMany();

    this.store.dispatch(manyCustomersLoadingIfNecessary());

    setTimeout(() => this.store.dispatch(manyCustomersLoadingIfNecessary()), 2000);

    // setTimeout(() => customers.clear(), 3000);
    //
    // setTimeout(() => {
    //   accounts.current$
    //     .pipe(
    //       first(current => !!current),
    //       distinctUntilChanged()
    //     )
    //     .subscribe(current => accounts.update(current));
    //   accounts.selectByKey(1);
    // }, 3000);
    //
    // setInterval(() => {
    //   const id1 = 1; // Math.round(Math.random() * 100 + Math.random() * 20);
    //   accounts.all$
    //     .pipe(
    //       map(accts => accts.find(account => account.id === id1)),
    //       first()
    //     )
    //     .subscribe(account =>
    //       accounts.replace({
    //         ...account,
    //         amount: Math.random() * 1000
    //       })
    //     );
    //
    //   const id2 = 10; // Math.round(Math.random() * 100 + Math.random() * 20);
    //   accounts.all$
    //     .pipe(
    //       map(accts => accts.find(account => account.id === id2)),
    //       first()
    //     )
    //     .subscribe(account =>
    //       accounts.replace({
    //         ...account,
    //         amount: Math.random() * 1000
    //       })
    //     );
    //
    //   const id3 = 100; // Math.round(Math.random() * 100 + Math.random() * 20);
    //   accounts.all$
    //     .pipe(
    //       map(accts => accts.find(account => account.id === id3)),
    //       first()
    //     )
    //     .subscribe(account =>
    //       accounts.replace({
    //         ...account,
    //         amount: Math.random() * 1000
    //       })
    //     );
    //
    //   const id4 = Math.round(Math.random() * 100 + Math.random() * 20);
    //   accounts.all$
    //     .pipe(
    //       map(accts => accts.find(account => account.id === id4)),
    //       first()
    //     )
    //     .subscribe(account =>
    //       accounts.replace({
    //         ...account,
    //         amount: Math.random() * 1000
    //       })
    //     );
    // }, 250);
  }

  editByKey(id: number) {
    this.store.dispatch(customerEditedById({ key: id }));
  }

  endEdit() {
    this.store.dispatch(customerEditEnded());
  }
}
