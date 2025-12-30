import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideEntityService } from '@briebug/ngrx-auto-entity';
import { EntityService } from '@briebug/ngrx-auto-entity-service';
import { Customer } from '../../models/customer.model';
import { CustomerFacade } from './customer.facade';

export function provideCustomerState(): EnvironmentProviders {
  return makeEnvironmentProviders([CustomerFacade, provideEntityService(Customer, EntityService)]);
}
