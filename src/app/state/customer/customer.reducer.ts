import { createSelector } from '@ngrx/store';
import { Customer } from 'models/customer.model';
import { buildState, EntityActionTypes } from 'ngrx-auto-entity';
import { ICustomerEntityState } from 'state/customer/customer.state';
import { CustomerActions, CustomerActionType, SelectCustomer } from './customer.actions';

const { initialState, selectors, entityState } = buildState(Customer);

export const {
  selectAll: selectAllCustomers,
  selectEntities: selectCustomerEntities,
  selectIds: selectCustomerIds,
  selectTotal: selectTotalCustomers
} = selectors;

export const selectSelectedCustomerId = createSelector(entityState, state => state.selectedCustomerId);

export const selectSelectedCustomer = createSelector(
  selectCustomerEntities,
  selectSelectedCustomerId,
  (entities, selectedCustomerId) => entities && entities[selectedCustomerId]
);

export const selectCustomerIsLoading = createSelector(entityState, state => state.loading);

export function customerReducer(
  state: ICustomerEntityState = initialState,
  action: CustomerActions
): ICustomerEntityState {
  switch (action.type) {
    case CustomerActionType.SelectCustomer:
      const a = action;
      return {
        ...state,
        selectedCustomerId: (action as SelectCustomer).payload.id
      };
    case EntityActionTypes.Update:
      return {
        ...state,
        loading: true
      };
    case EntityActionTypes.UpdateSuccess:
      return {
        ...state,
        loading: false
      };
    default: {
      return state;
    }
  }
}
