import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { EntityInfo } from './ngrx-auto-entity.actions';

export interface EntityRef<TModel> {
  info: EntityInfo;
  entity: TModel;
}

export interface EntityError<TModel> {
  info: EntityInfo;
  err: any;
}

@Injectable()
export class NgrxAutoEntityService {
  static urlTemplate = '/api/v1/:entity';
  static fetchTemplate = `${NgrxAutoEntityService.urlTemplate}/:key0`;
  static fetchManyTemplate = `${NgrxAutoEntityService.urlTemplate}?:page&:size`;
  static deleteTemplate = `${NgrxAutoEntityService.urlTemplate}/:key0`;

  constructor(private http: HttpClient) {
    // TODO: Figure out how to make url templates configurable...
  }

  load<TModel>(entityInfo: EntityInfo, keys: any[]): Observable<EntityRef<TModel>> {
    const urlBase = NgrxAutoEntityService.fetchTemplate.replace(':entity', entityInfo.modelName);
    const fullUrl = keys.reduce((url, key, index) => url.replace(':key' + index, key), urlBase);

    return this.http.get<TModel>(fullUrl).pipe(
      map(entity => ({
        info: entityInfo,
        entity
      })),
      catchError(err =>
        throwError({
          info: entityInfo,
          err
        })
      )
    );
  }

  loadMany<TModel>(entityInfo: EntityInfo, page = 0, size = Number.MAX_SAFE_INTEGER): Observable<EntityRef<TModel[]>> {
    let url = NgrxAutoEntityService.fetchManyTemplate.replace(':entity', entityInfo.modelName);
    url = url.replace(':page', page === 0 ? '' : page.toString());
    url = url.replace(':size', size === Number.MAX_SAFE_INTEGER ? '' : size.toString());

    return this.http.get<TModel[]>(url).pipe(
      map(entity => ({
        info: entityInfo,
        entity
      })),
      catchError(err =>
        throwError({
          info: entityInfo,
          err
        })
      )
    );
  }

  create<TModel>(entityInfo: EntityInfo, entity: TModel): Observable<EntityRef<TModel>> {
    const url = NgrxAutoEntityService.urlTemplate.replace(':entity', entityInfo.modelName);

    return this.http.post<TModel>(url, entity).pipe(
      map(savedEntity => ({
        info: entityInfo,
        entity: savedEntity
      })),
      catchError(err =>
        throwError({
          info: entityInfo,
          err
        })
      )
    );
  }

  update<TModel>(entityInfo: EntityInfo, entity: TModel): Observable<EntityRef<TModel>> {
    const url = NgrxAutoEntityService.urlTemplate.replace(':entity', entityInfo.modelName);

    return this.http.patch<TModel>(url, entity).pipe(
      map(savedEntity => ({
        info: entityInfo,
        entity: savedEntity
      })),
      catchError(err =>
        throwError({
          info: entityInfo,
          err
        })
      )
    );
  }

  replace<TModel>(entityInfo: EntityInfo, entity: TModel): Observable<EntityRef<TModel>> {
    const url = NgrxAutoEntityService.urlTemplate.replace(':entity', entityInfo.modelName);

    return this.http.put<TModel>(url, entity).pipe(
      map(savedEntity => ({
        info: entityInfo,
        entity: savedEntity
      })),
      catchError(err =>
        throwError({
          info: entityInfo,
          err
        })
      )
    );
  }

  delete<TModel>(entityInfo: EntityInfo, keys: any[]): Observable<EntityRef<TModel>> {
    const urlBase = NgrxAutoEntityService.deleteTemplate.replace(':entity', entityInfo.modelName);
    const fullUrl = keys.reduce((url, key, index) => url.replace(':key' + index, key), urlBase);

    return this.http.delete<TModel>(fullUrl).pipe(
      map(savedEntity => ({
        info: entityInfo,
        entity: savedEntity
      })),
      catchError(err =>
        throwError({
          info: entityInfo,
          err
        })
      )
    );
  }
}
