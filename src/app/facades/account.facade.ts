import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Account } from 'models/account.model';
import { Observable } from 'rxjs';
import { filter, map, skip, switchMapTo, take, tap } from 'rxjs/operators';
import { AccountFacadeBase } from 'state/account.state';
import { AppState } from 'state/app.state';

@Injectable({
  providedIn: 'root'
})
export class AccountFacade extends AccountFacadeBase {
  constructor(store: Store<AppState>) {
    super(Account, store);
  }

  static getNewPersonalTab(customerId: number): Account {
    return {
      accountNumber: null,
      amount: null,
      customerId,
      name: 'Personal Tab',
      id: undefined
    };
  }

  get allByCustomerId$(): Observable<Record<number, Account[]>> {
    return this.all$.pipe(
      map((accounts: Account[]) => {
        return accounts.reduce((acc: Record<number, Account[]>, account: Account) => {
          acc[account.customerId] = acc[account.customerId] ? [...acc[account.customerId], account] : [];
          return acc;
        }, {});
      })
    );
  }
}
