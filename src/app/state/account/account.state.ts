import { IEntityState } from '@briebug/ngrx-auto-entity';

import { Account } from 'models/account.model';

export interface IAccountEntityState extends IEntityState<Account> {
  loading: boolean;
  selectedAccountId: number;
}
