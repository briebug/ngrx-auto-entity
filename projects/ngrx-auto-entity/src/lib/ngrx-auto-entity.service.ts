import { Injectable, InjectionToken, Injector } from '@angular/core';
import * as changeCase from 'change-case';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IEntityInfo } from './ngrx-auto-entity.actions';
import { IAutoEntityService } from './ngrx-auto-entity.service';

export interface IEntityRef<TModel> {
  info: IEntityInfo;
  entity: TModel;
}

export interface IEntityError<TModel> {
  info: IEntityInfo;
  err: any;
}

export interface IAutoEntityService {
  load(entityInfo: IEntityInfo, keys: any[]): Observable<any>;
  loadMany(entityInfo: IEntityInfo, page?: number, size?: number): Observable<any[]>;
  create(entityInfo: IEntityInfo, entity: any): Observable<any>;
  update(entityInfo: IEntityInfo, entity: any): Observable<any>;
  replace(entityInfo: IEntityInfo, entity: any): Observable<any>;
  delete(entityInfo: IEntityInfo, keys: any[]): Observable<any>;
}

@Injectable()
export class NgrxAutoEntityService {
  constructor(private injector: Injector) {}

  load<TModel>(entityInfo: IEntityInfo, keys: any): Observable<IEntityRef<TModel>> {
    try {
      const service = this.getService(entityInfo);

      return service.load(entityInfo, keys).pipe(
        map(entity => {
          return {
            info: entityInfo,
            entity
          };
        }),
        catchError(err => {
          return throwError({
            info: entityInfo,
            err
          });
        })
      );
    } catch (err) {
      return throwError({
        info: entityInfo,
        err
      });
    }
  }

  loadMany<TModel>(
    entityInfo: IEntityInfo,
    page = 0,
    size = Number.MAX_SAFE_INTEGER
  ): Observable<IEntityRef<TModel[]>> {
    try {
      const service = this.getService(entityInfo);

      return service.loadMany(entityInfo, page, size).pipe(
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
    } catch (err) {
      return throwError({
        info: entityInfo,
        err
      });
    }
  }

  create<TModel>(entityInfo: IEntityInfo, entity: TModel): Observable<IEntityRef<TModel>> {
    try {
      const service = this.getService(entityInfo);

      return service.create(entityInfo, entity).pipe(
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
    } catch (err) {
      return throwError({
        info: entityInfo,
        err
      });
    }
  }

  update<TModel>(entityInfo: IEntityInfo, entity: TModel): Observable<IEntityRef<TModel>> {
    try {
      const service = this.getService(entityInfo);

      return service.update(entityInfo, entity).pipe(
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
    } catch (err) {
      return throwError({
        info: entityInfo,
        err
      });
    }
  }

  replace<TModel>(entityInfo: IEntityInfo, entity: TModel): Observable<IEntityRef<TModel>> {
    try {
      const service = this.getService(entityInfo);

      return service.replace(entityInfo, entity).pipe(
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
    } catch (err) {
      return throwError({
        info: entityInfo,
        err
      });
    }
  }

  delete<TModel>(entityInfo: IEntityInfo, keys: any): Observable<IEntityRef<TModel>> {
    try {
      const service = this.getService(entityInfo);

      return service.delete(entityInfo, keys).pipe(
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
    } catch (err) {
      return throwError({
        info: entityInfo,
        err
      });
    }
  }

  protected getService(entityInfo: IEntityInfo): IAutoEntityService {
    try {
      const service = this.injector.get(entityInfo.modelType);
      return service;
    } catch (err) {
      const serviceName = `${changeCase.pascalCase(entityInfo.modelName)}Service`;
      console.error(
        `NgRxAutoEntityService Error: Unable to locate service ${serviceName} using model name of ${
          entityInfo.modelName
        }`
      );
      console.error(`NgRxAutoEntityService Error Details:`, err);
      throw err;
    }
  }
}
