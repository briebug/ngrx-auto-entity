import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IAutoEntityService,
  IEntityInfo,
  IEntityWithPageInfo,
  IEntityWithRangeInfo,
  Page,
  Range
} from '@briebug/ngrx-auto-entity';
import { Customer } from 'models/customer.model';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class CustomerService implements IAutoEntityService<Customer> {
  static readonly PATH = '/customers';
  readonly url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.API_BASE_URL}${CustomerService.PATH}`;
  }

  load(entityInfo: IEntityInfo, keys: any): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}/${keys}`);
  }

  loadAll(entityInfo: IEntityInfo): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.url}`);
  }

  loadPage(entityInfo: IEntityInfo, page: Page, criteria?: any): Observable<IEntityWithPageInfo<Customer>> {
    return throwError({ message: 'Not implemented' });
  }

  loadRange(entityInfo: IEntityInfo, range: Range, criteria?: any): Observable<IEntityWithRangeInfo<Customer>> {
    return throwError({ message: 'Not implemented' });
  }

  create(entityInfo: IEntityInfo, entity: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.url}`, entity);
  }

  update(entityInfo: IEntityInfo, entity: Customer): Observable<Customer> {
    return this.http.patch<Customer>(`${this.url}/${entity.id}`, entity);
  }

  replace(entityInfo: IEntityInfo, entity: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.url}`, entity);
  }

  delete(entityInfo: IEntityInfo, entity: Customer): Observable<Customer> {
    return this.http.delete<Customer>(`${this.url}/${entity.id}`).pipe(map(() => entity));
  }
}
