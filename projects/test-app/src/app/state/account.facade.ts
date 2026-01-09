import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Account } from '../models/account.model';
import { AccountFacadeBase } from './account.state';
import { AppState } from './app.state';

@Injectable({
  providedIn: 'root'
})
export class AccountFacade extends AccountFacadeBase {
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(store: Store<AppState>) {
    super(Account, store);
  }
}
