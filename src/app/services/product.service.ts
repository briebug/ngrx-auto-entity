import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { Product } from 'models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class EntityService implements IAutoEntityService<any> {
  constructor(private http: HttpClient) {}

  load(entityInfo: IEntityInfo, keys: any): Observable<Product> {
    return this.http.get<Product>(`${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s/${keys}`);
  }

  loadAll(entityInfo: IEntityInfo): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s`);
  }

  create(entityInfo: IEntityInfo, entity: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s`, entity);
  }

  update(entityInfo: IEntityInfo, entity: Product): Observable<Product> {
    return this.http.patch<Product>(
      `${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s/${entity.id}`,
      entity
    );
  }

  replace(entityInfo: IEntityInfo, entity: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s`, entity);
  }

  delete(entityInfo: IEntityInfo, entity: Product): Observable<Product> {
    return this.http
      .delete<Product>(`${environment.API_BASE_URL}/${entityInfo.modelName.toLowerCase()}s/${entity.id}`)
      .pipe(map(() => entity));
  }
}
