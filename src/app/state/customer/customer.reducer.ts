import { Action } from '@ngrx/store';
import { buildState } from 'ngrx-auto-entity';

import { Customer } from '@state/customer/customer.model';
import { ICustomerEntityState } from './../app.interfaces';

const { initialState, selectors } = buildState(Customer);

export const {
  selectAll: selectAllCustomers,
  selectEntities: selectCustomerEntities,
  selectIds: selectCustomerIds,
  selectTotal: selectTotalCustomers
} = selectors;

export function customerReducer(state: ICustomerEntityState = initialState, action: Action): ICustomerEntityState {
  switch (action.type) {
    // case foo: {
    //   return bar;
    // }
    default: {
      return state;
    }
  }
}
