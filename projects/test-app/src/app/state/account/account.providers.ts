import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideEntityService } from '@briebug/ngrx-auto-entity';
import { Account } from '../../models/account.model';
import { MyEntityService } from '../../services/my-entity.service';
import { AccountFacade } from './account.facade';

export function provideAccountState(): EnvironmentProviders {
  return makeEnvironmentProviders([AccountFacade, provideEntityService(Account, MyEntityService)]);
}
