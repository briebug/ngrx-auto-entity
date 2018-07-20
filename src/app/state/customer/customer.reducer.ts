import { createFeatureSelector, createSelector } from '@ngrx/store';
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

const selectCustomerFeature = createFeatureSelector<ICustomerEntityState>('customer');

export const selectSelectedCustomerId = createSelector(selectCustomerFeature, state => state.selectedCustomerId);

export const selectSelectedCustomer = createSelector(
  selectCustomerEntities,
  selectSelectedCustomerId,
  (entities, selectedCustomerId) => entities && entities[selectedCustomerId]
);

export function customerReducer(
  state: ICustomerEntityState = initialState,
  action: CustomerAction
): ICustomerEntityState {
  switch (action.type) {
    case CustomerActionType.SelectCustomer:
      return {
        ...state,
        selectedCustomerId: action.payload.id
      };
    default: {
      return state;
    }
  }
}
