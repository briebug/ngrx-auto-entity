import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAutoEntityService, IEntityInfo } from 'ngrx-auto-entity';
import { Observable, of } from 'rxjs';

import { Customer } from 'models/customer.model';
import { environment } from '../../environments/environment';

@Injectable()
export class CustomerService implements IAutoEntityService {
  private static readonly PATH = '/customers';
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.API_BASE_URL}${CustomerService.PATH}`;
  }

  load(entityInfo: IEntityInfo, keys: any[]): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}${this.nestedPath(keys)}`);
  }

  loadMany(entityInfo: IEntityInfo, page?: number, size?: number): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.url}`);
  }

  create(entityInfo: IEntityInfo, entity: any): Observable<Customer> {
    return this.http.post<Customer>(`${this.url}`, entity);
  }

  update(entityInfo: IEntityInfo, entity: any): Observable<Customer> {
    return this.http.patch<Customer>(`${this.url}`, entity);
  }

  replace(entityInfo: IEntityInfo, entity: any): Observable<Customer> {
    return this.http.put<Customer>(`${this.url}`, entity);
  }

  delete(entityInfo: IEntityInfo, keys: any[]): Observable<{}> {
    return this.http.delete(`${this.url}${this.nestedPath(keys)}`);
  }

  private nestedPath(keys: any[]): string {
    return `/${keys.join('/')}`;
  }
}
