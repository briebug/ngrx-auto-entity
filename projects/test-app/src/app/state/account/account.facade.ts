import { Injectable } from '@angular/core';
import { AccountFacadeBase, allAccountsForCurrentCustomer } from './account.state';

@Injectable()
export class AccountFacade extends AccountFacadeBase {
  readonly currentForCurrentCustomer = this.store.selectSignal(allAccountsForCurrentCustomer);
}
