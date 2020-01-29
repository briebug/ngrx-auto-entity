import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityIdentity, IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class EntityService implements IAutoEntityService<any> {
  constructor(private http: HttpClient) {}

  load(entityInfo: IEntityInfo, keys: any): Observable<any> {
    return this.http.get<any>(`${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s/${keys}`);
  }

  loadAll(entityInfo: IEntityInfo): Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s`);
  }

  create(entityInfo: IEntityInfo, entity: any): Observable<any> {
    return this.http.post<any>(`${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s`, entity);
  }

  update(entityInfo: IEntityInfo, entity: any): Observable<any> {
    return this.http.patch<any>(
      `${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s/${entity.id}`,
      entity
    );
  }

  updateMany(entityInfo: IEntityInfo, entities: any[], criteria?: any): Observable<any[]> {
    return entities.length ? forkJoin(entities.map(e => this.update(entityInfo, e))) : of([]);
  }

  replace(entityInfo: IEntityInfo, entity: any): Observable<any> {
    return this.http.put<any>(`${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s`, entity);
  }

  delete(entityInfo: IEntityInfo, entity: any): Observable<any> {
    return this.http
      .delete<any>(`${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s/${entity.id}`)
      .pipe(map(() => entity));
  }

  deleteByKey(entityInfo: IEntityInfo, entityKey: string | number, criteria?: any): Observable<EntityIdentity> {
    return this.http
      .delete<any>(`${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s/${entityKey}`)
      .pipe(map(() => entityKey));
  }

  deleteManyByKeys(
    entityInfo: IEntityInfo,
    entityKeys: EntityIdentity[],
    criteria?: any
  ): Observable<EntityIdentity[]> {
    const deleteRequests = entityKeys.map(key => this.deleteByKey(entityInfo, key, criteria));
    return forkJoin(deleteRequests);
  }
}
