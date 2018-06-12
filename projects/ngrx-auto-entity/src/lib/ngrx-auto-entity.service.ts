import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IEntityInfo } from './ngrx-auto-entity.actions';

export interface IEntityRef<TModel> {
  info: IEntityInfo;
  entity: TModel;
}

export interface IEntityError<TModel> {
  info: IEntityInfo;
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

  load<TModel>(EntityInfo: IEntityInfo, keys: any[]): Observable<IEntityRef<TModel>> {
    const urlBase = NgrxAutoEntityService.fetchTemplate.replace(':entity', EntityInfo.modelName);
    const fullUrl = keys.reduce((url, key, index) => url.replace(':key' + index, key), urlBase);

    return this.http.get<TModel>(fullUrl).pipe(
      map(entity => ({
        info: EntityInfo,
        entity
      })),
      catchError(err =>
        throwError({
          info: EntityInfo,
          err
        })
      )
    );
  }

  loadMany<TModel>(
    EntityInfo: IEntityInfo,
    page = 0,
    size = Number.MAX_SAFE_INTEGER
  ): Observable<IEntityRef<TModel[]>> {
    let url = NgrxAutoEntityService.fetchManyTemplate.replace(':entity', EntityInfo.modelName);
    url = url.replace(':page', page === 0 ? '' : page.toString());
    url = url.replace(':size', size === Number.MAX_SAFE_INTEGER ? '' : size.toString());

    return this.http.get<TModel[]>(url).pipe(
      map(entity => ({
        info: EntityInfo,
        entity
      })),
      catchError(err =>
        throwError({
          info: EntityInfo,
          err
        })
      )
    );
  }

  create<TModel>(EntityInfo: IEntityInfo, entity: TModel): Observable<IEntityRef<TModel>> {
    const url = NgrxAutoEntityService.urlTemplate.replace(':entity', EntityInfo.modelName);

    return this.http.post<TModel>(url, entity).pipe(
      map(savedEntity => ({
        info: EntityInfo,
        entity: savedEntity
      })),
      catchError(err =>
        throwError({
          info: EntityInfo,
          err
        })
      )
    );
  }

  update<TModel>(EntityInfo: IEntityInfo, entity: TModel): Observable<IEntityRef<TModel>> {
    const url = NgrxAutoEntityService.urlTemplate.replace(':entity', EntityInfo.modelName);

    return this.http.patch<TModel>(url, entity).pipe(
      map(savedEntity => ({
        info: EntityInfo,
        entity: savedEntity
      })),
      catchError(err =>
        throwError({
          info: EntityInfo,
          err
        })
      )
    );
  }

  replace<TModel>(EntityInfo: IEntityInfo, entity: TModel): Observable<IEntityRef<TModel>> {
    const url = NgrxAutoEntityService.urlTemplate.replace(':entity', EntityInfo.modelName);

    return this.http.put<TModel>(url, entity).pipe(
      map(savedEntity => ({
        info: EntityInfo,
        entity: savedEntity
      })),
      catchError(err =>
        throwError({
          info: EntityInfo,
          err
        })
      )
    );
  }

  delete<TModel>(EntityInfo: IEntityInfo, keys: any[]): Observable<IEntityRef<TModel>> {
    const urlBase = NgrxAutoEntityService.deleteTemplate.replace(':entity', EntityInfo.modelName);
    const fullUrl = keys.reduce((url, key, index) => url.replace(':key' + index, key), urlBase);

    return this.http.delete<TModel>(fullUrl).pipe(
      map(savedEntity => ({
        info: EntityInfo,
        entity: savedEntity
      })),
      catchError(err =>
        throwError({
          info: EntityInfo,
          err
        })
      )
    );
  }
}
