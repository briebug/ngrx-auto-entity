import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { Account } from 'models/account.model';

export const { initialState, facade: AccountFacadeBase } = buildState(Account);

export function accountReducer(state = initialState): IEntityState<Account> {
  return state;
}
