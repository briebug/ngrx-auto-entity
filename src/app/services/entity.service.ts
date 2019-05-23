import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { Customer } from 'models/customer.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class EntityService implements IAutoEntityService<any> {
  constructor(private http: HttpClient) {}

  load(entityInfo: IEntityInfo, keys: any): Observable<Customer> {
    return this.http.get<Customer>(`${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s/${keys}`);
  }

  loadAll(entityInfo: IEntityInfo): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s`);
  }

  create(entityInfo: IEntityInfo, entity: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s`, entity);
  }

  update(entityInfo: IEntityInfo, entity: Customer): Observable<Customer> {
    return this.http.patch<Customer>(
      `${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s/${entity.id}`,
      entity
    );
  }

  replace(entityInfo: IEntityInfo, entity: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s`, entity);
  }

  delete(entityInfo: IEntityInfo, entity: Customer): Observable<Customer> {
    return this.http
      .delete<Customer>(`${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s/${entity.id}`)
      .pipe(map(() => entity));
  }
}
