import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { Customer } from '../models/customer.model';

export const { initialState, facade: CustomerFacadeBase } = buildState(Customer, {
  customProperty: 'hello'
});

export interface ICustomerState extends IEntityState<Customer> {
  customProperty: string;
}

export function customerReducer(state = initialState): ICustomerState {
  return state;
}
