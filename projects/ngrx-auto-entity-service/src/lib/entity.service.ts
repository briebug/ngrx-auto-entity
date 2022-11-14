import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { EntityIdentity, getKeyFromModel, IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { buildUrl, resolveRetryCriteria } from './entity.service.utils';
import { AUTO_ENTITY_CONFIG, AutoEntityServiceConfig } from './config';
import { EntityCriteria } from './critera.model';

@Injectable()
export class EntityService implements IAutoEntityService<any> {
  constructor(
    private readonly http: HttpClient,
    @Inject(AUTO_ENTITY_CONFIG)
    private readonly config: AutoEntityServiceConfig,
  ) {}

  load(entityInfo: IEntityInfo, key: any, criteria?: EntityCriteria): Observable<any> {
    const url = buildUrl(this.config.host, entityInfo, criteria, key);
    return resolveRetryCriteria(this.http.get<any>(url), criteria?.retry, this.config.defaultRetry);
  }

  loadMany(entityInfo: IEntityInfo, criteria?: EntityCriteria): Observable<any[]> {
    const url = buildUrl(this.config.host, entityInfo, criteria);
    return resolveRetryCriteria(this.http.get<any[]>(url), criteria?.retry, this.config.defaultRetry);
  }

  loadAll(entityInfo: IEntityInfo, criteria?: EntityCriteria): Observable<any[]> {
    const url = buildUrl(this.config.host, entityInfo, criteria);
    return resolveRetryCriteria(this.http.get<any[]>(url), criteria?.retry, this.config.defaultRetry);
  }

  create(entityInfo: IEntityInfo, entity: any, criteria?: EntityCriteria, originalEntity?: any): Observable<any> {
    const url = buildUrl(this.config.host, entityInfo, criteria);
    return this.http.post<any>(url, entity);
  }

  update(entityInfo: IEntityInfo, entity: any, criteria?: EntityCriteria, originalEntity?: any): Observable<any> {
    const url = buildUrl(this.config.host, entityInfo, criteria, getKeyFromModel(entityInfo.modelType, entity));
    return this.http.patch<any>(url, entity);
  }

  replace(entityInfo: IEntityInfo, entity: any, criteria?: EntityCriteria, originalEntity?: any): Observable<any> {
    const url = buildUrl(this.config.host, entityInfo, criteria, getKeyFromModel(entityInfo.modelType, entity));
    return this.http.put<any>(url, entity);
  }

  delete(entityInfo: IEntityInfo, entity: any, criteria?: EntityCriteria, originalEntity?: any): Observable<any> {
    const url = buildUrl(this.config.host, entityInfo, criteria, getKeyFromModel(entityInfo.modelType, entity));
    return this.http.delete<any>(url, entity).pipe(map(() => entity));
  }

  deleteByKey(entityInfo: IEntityInfo, key: EntityIdentity, criteria?: EntityCriteria): Observable<EntityIdentity> {
    const url = buildUrl(this.config.host, entityInfo, criteria, key);
    return this.http.delete<any>(url).pipe(map(() => key));
  }
}
