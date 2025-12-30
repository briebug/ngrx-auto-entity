import { makeEnvironmentProviders } from '@angular/core';
import { provideEntityService } from '@briebug/ngrx-auto-entity';
import { EntityService } from '@briebug/ngrx-auto-entity-service';
import { Product } from '../../models/product.model';
import { ProductFacade } from './product.facade';

export function provideProductState() {
  return makeEnvironmentProviders([ProductFacade, provideEntityService(Product, EntityService)]);
}
