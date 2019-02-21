import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { Customer } from 'models/customer.model';

const { initialState, selectors } = buildState(Customer);

export const {
  selectAll: allCustomers,
  selectEntities: customerEntities,
  selectIds: customerIds,
  selectTotal: totalCustomers,
  selectIsLoading: customersLoading,
  selectCurrentEntity: currentCustomer
} = selectors;

export function customerReducer(state = initialState): IEntityState<Customer> {
  return state;
}
