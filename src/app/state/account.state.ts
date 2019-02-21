import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { Account } from 'models/account.model';

const { initialState, selectors } = buildState(Account);

export const {
  selectAll: selectAllAccounts,
  selectEntities: selectAccountEntities,
  selectIds: selectAccountIds,
  selectTotal: selectTotalAccounts
} = selectors;

export function accountReducer(state = initialState): IEntityState<Account> {
  return state;
}
