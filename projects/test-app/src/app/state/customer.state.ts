import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Customer } from '../models/customer.model';

export interface ICustomerState extends IEntityState<Customer> {
  recentlyLoadedIds: number[];
}

export const {
  initialState,
  facade: CustomerFacadeBase,
  actions: { loadManySuccess: loadManyCustomersSuccess }
} = buildState(Customer, {
  recentlyLoadedIds: []
} as ICustomerState);

const onSuccess = on(
  loadManyCustomersSuccess,
  (state: ICustomerState, { entities }): ICustomerState => ({
    ...state,
    recentlyLoadedIds: entities.map(entity => entity.id)
  })
);

const reduce = createReducer(initialState, onSuccess);

export function customerReducer(state = initialState, action: Action): ICustomerState {
  return reduce(state, action);
}
