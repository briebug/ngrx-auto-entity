import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { createReducer, on } from '@ngrx/store';
import { Customer } from '../../models/customer.model';

export const CUSTOMER_STATE_NAME = 'customer';

export interface ICustomerState extends IEntityState<Customer> {
  recentlyLoadedIds: number[];
}

export const {
  initialState,
  facade: CustomerFacadeBase,
  selectors: { selectAllSorted: allCustomers, selectCurrentEntityKey: currentCustomerId },
  actions: {
    loadMany: manyCustomersLoading,
    loadManyIfNecessary: manyCustomersLoadingIfNecessary,
    loadManySuccess: manyCustomersLoadedSuccessfully,
    editByKey: customerEditedById,
    endEdit: customerEditEnded
  }
} = buildState(Customer, {
  recentlyLoadedIds: []
} as ICustomerState);

export const trackRecentlyLoadedIds = (state: ICustomerState, { entities }): ICustomerState => ({
  ...state,
  recentlyLoadedIds: entities.map(entity => entity.id)
});

export const customerReducer = createReducer(initialState, on(manyCustomersLoadedSuccessfully, trackRecentlyLoadedIds));
