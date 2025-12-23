/*
 * Public API Surface of NGRX Auto Entity Service
 */

export { NgrxAutoEntityServiceModule } from './lib/ngrx-auto-entity-service.module';
export { provideAutoEntityService } from './lib/ngrx-auto-entity-service.provider';
export { EntityService } from './lib/entity.service';
export type { AutoEntityServiceConfig, APIPrefixResolver } from './lib/config';
export type { EntityCriteria, RetryCriteria, QueryCriteria } from './lib/critera.model';
