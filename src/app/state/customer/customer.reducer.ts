import { Customer } from 'models/customer.model';
import { buildState } from 'ngrx-auto-entity';
import { ICustomerEntityState } from 'state/customer/customer.state';
import { CustomerAction, CustomerActionType } from './customer.actions';

const { initialState, selectors } = buildState(Customer);

export const {
  selectAll: selectAllCustomers,
  selectEntities: selectCustomerEntities,
  selectIds: selectCustomerIds,
  selectTotal: selectTotalCustomers
} = selectors;

export function customerReducer(
  state: ICustomerEntityState = initialState,
  action: CustomerAction
): ICustomerEntityState {
  switch (action.type) {
    case CustomerActionType.SelectCustomer:
      return {
        ...state,
        selectedCustomerId: action.customer.id
      };
    default: {
      return state;
    }
  }
}
