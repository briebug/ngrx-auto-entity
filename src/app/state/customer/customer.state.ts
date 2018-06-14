import { IEntityState } from 'ngrx-auto-entity';

import { Customer } from 'state/customer/customer.model';

export interface ICustomerEntityState extends IEntityState<Customer> {
  loading: boolean;
  selectedCustomerId: number;
}
