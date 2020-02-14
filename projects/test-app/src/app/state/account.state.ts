import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { Action } from '@ngrx/store';
import { Account } from '../models/account.model';

export const { initialState, facade: AccountFacadeBase } = buildState(Account);

export function accountReducer(state = initialState, action: Action): IEntityState<Account> {
  return state;
}
