import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { createSelector, createReducer } from '@ngrx/store';
import { Account } from '../../models/account.model';
import { currentCustomerId } from '../customer';

export const ACCOUNT_STATE_NAME = 'account';

export type IAccountState = IEntityState<Account>

export const {
  initialState,
  facade: AccountFacadeBase,
  selectors: { selectAllSorted: allAccounts },
  actions: {
    loadMany: manyAccountsLoading,
    loadManySuccess: manyAccountsLoadedSuccessfully,
    editByKey: accountEditedById,
    endEdit: accountEditEnded
  }
} = buildState(Account);

export const allAccountsForCurrentCustomer = createSelector(allAccounts, currentCustomerId, (accounts, customerId) =>
  accounts.filter(account => account.customerId === customerId)
);

export const accountReducer = createReducer(initialState);
