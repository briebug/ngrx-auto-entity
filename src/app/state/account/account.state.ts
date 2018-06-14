import { IEntityState } from 'ngrx-auto-entity';

import { Account } from 'state/account/account.model';

export interface IAccountEntityState extends IEntityState<Account> {
  loading: boolean;
  selectedAccountId: number;
}
