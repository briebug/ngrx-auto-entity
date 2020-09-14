import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Account } from '../models/account.model';
import { AccountFacadeBase } from './account.state';
import { AppState } from './app.state';

@Injectable({
  providedIn: 'root'
})
export class AccountFacade extends AccountFacadeBase {
  constructor(private store: Store<AppState>) {
    super(Account, store);
  }
}
