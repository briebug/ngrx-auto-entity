import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { EntityIdentity, getKeyFromModel, IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { first, from, Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { buildUrl, resolveRetryCriteria } from './entity.service.utils';
import { AUTO_ENTITY_CONFIG, AutoEntityServiceConfig } from './config';
import { EntityCriteria } from './critera.model';

@Injectable()
export class EntityService implements IAutoEntityService<any> {
  constructor(
    private readonly http: HttpClient,
    @Inject(AUTO_ENTITY_CONFIG)
    private readonly config: AutoEntityServiceConfig
  ) {}

  protected getUrlPrefix(operation: string, info: IEntityInfo, criteria?: EntityCriteria): Observable<string> {
    return typeof this.config.urlPrefix === 'string' ? of(this.config.urlPrefix) : from(this.config.urlPrefix(operation, info, criteria));
  }

  protected buildUrl(operation: string, info: IEntityInfo, criteria?: EntityCriteria, key?: string | number) {
    return this.getUrlPrefix(operation, info, criteria).pipe(
      first(),
      map(prefix => buildUrl(prefix, info, criteria, key))
    );
  }

  load(entityInfo: IEntityInfo, key: any, criteria?: EntityCriteria): Observable<any> {
    return this.buildUrl('load', entityInfo, criteria, key).pipe(
      switchMap(url => resolveRetryCriteria(this.http.get<any>(url), criteria?.retry, this.config.defaultRetry))
    );
  }

  loadMany(entityInfo: IEntityInfo, criteria?: EntityCriteria): Observable<any[]> {
    return this.buildUrl('loadMany', entityInfo, criteria).pipe(
      switchMap(url => resolveRetryCriteria(this.http.get<any[]>(url), criteria?.retry, this.config.defaultRetry))
    );
  }

  loadAll(entityInfo: IEntityInfo, criteria?: EntityCriteria): Observable<any[]> {
    return this.buildUrl('loadAll', entityInfo, criteria).pipe(
      switchMap(url => resolveRetryCriteria(this.http.get<any[]>(url), criteria?.retry, this.config.defaultRetry))
    );
  }

  create(entityInfo: IEntityInfo, entity: any, criteria?: EntityCriteria, originalEntity?: any): Observable<any> {
    return this.buildUrl('create', entityInfo, criteria).pipe(switchMap(url => this.http.post<any>(url, entity)));
  }

  createMany(entityInfo: IEntityInfo, entities: any[], criteria?: any, originalEntities?: any[]): Observable<any[]> {
    return this.buildUrl('createMany', entityInfo, criteria).pipe(switchMap(url => this.http.post<any>(url, entities)));
  }

  update(entityInfo: IEntityInfo, entity: any, criteria?: EntityCriteria, originalEntity?: any): Observable<any> {
    return this.buildUrl('update', entityInfo, criteria, getKeyFromModel(entityInfo.modelType, entity)).pipe(
      switchMap(url => this.http.patch<any>(url, entity))
    );
  }

  updateMany(entityInfo: IEntityInfo, entities: any[], criteria?: any, originalEntities?: any[]): Observable<any[]> {
    return this.buildUrl('updateMany', entityInfo, criteria).pipe(switchMap(url => this.http.patch<any>(url, entities)));
  }

  replace(entityInfo: IEntityInfo, entity: any, criteria?: EntityCriteria, originalEntity?: any): Observable<any> {
    return this.buildUrl('replace', entityInfo, criteria, getKeyFromModel(entityInfo.modelType, entity)).pipe(
      switchMap(url => this.http.put<any>(url, entity))
    );
  }

  replaceMany(entityInfo: IEntityInfo, entities: any[], criteria?: any, originalEntities?: any[]): Observable<any[]> {
    return this.buildUrl('replaceMany', entityInfo, criteria).pipe(switchMap(url => this.http.put<any>(url, entities)));
  }

  delete(entityInfo: IEntityInfo, entity: any, criteria?: EntityCriteria, originalEntity?: any): Observable<any> {
    return this.buildUrl('delete', entityInfo, criteria, getKeyFromModel(entityInfo.modelType, entity)).pipe(
      switchMap(url =>
        this.http.delete<any>(url, {
          body: entity
        })
      ),
      map(() => entity)
    );
  }

  deleteMany(entityInfo: IEntityInfo, entities: any[], criteria?: any, originalEntities?: any[]): Observable<any[]> {
    return this.buildUrl('deleteMany', entityInfo, criteria).pipe(
      switchMap(url => this.http.delete<any>(url, { body: entities })),
      map(() => entities)
    );
  }

  deleteByKey(entityInfo: IEntityInfo, key: EntityIdentity, criteria?: EntityCriteria): Observable<EntityIdentity> {
    return this.buildUrl('deleteByKey', entityInfo, criteria, key).pipe(switchMap(url => this.http.delete<any>(url).pipe(map(() => key))));
  }

  deleteManyByKeys(entityInfo: IEntityInfo, keys: EntityIdentity[], criteria?: any): Observable<any[]> {
    // TODO: Is this the best way to handle this case?
    //  This seems like a somewhat odd REST API pattern.
    return this.buildUrl('deleteManyByKeys', entityInfo, criteria).pipe(
      switchMap(url => this.http.delete<any>(url, { body: { keys } })),
      map(() => keys)
    );
  }
}
