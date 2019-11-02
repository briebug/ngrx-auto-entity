import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class EntityService implements IAutoEntityService<any> {
  constructor(protected http: HttpClient) {}

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
    console.log('deleting...', entity, entityInfo);
    return this.http
      .delete<any>(`${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s/${entity.id}`)
      .pipe(map(() => entity));
  }
}
