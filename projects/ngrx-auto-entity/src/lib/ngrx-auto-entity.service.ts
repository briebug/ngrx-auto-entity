import { Injectable, Injector } from '@angular/core';
import { pascalCase } from 'change-case';
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

export interface IAutoEntityService<TModel> {
  load(entityInfo: IEntityInfo, keys: any[]): Observable<TModel>;
  loadMany(entityInfo: IEntityInfo, page?: number, size?: number): Observable<TModel[]>;
  create(entityInfo: IEntityInfo, entity: TModel): Observable<TModel>;
  update(entityInfo: IEntityInfo, entity: TModel): Observable<TModel>;
  replace(entityInfo: IEntityInfo, entity: TModel): Observable<TModel>;
  delete(entityInfo: IEntityInfo, entity: TModel): Observable<TModel>;
}

/**
 * Looks up client-provided entity service class using Angular's injector and this package's naming
 * conventions.  Then calls client's service and provides success/failure handling.
 */
@Injectable()
export class NgrxAutoEntityService {
  constructor(private injector: Injector) {}

  load<TModel>(entityInfo: IEntityInfo, keys: any): Observable<IEntityRef<TModel>> {
    try {
      const service = this.getService<TModel>(entityInfo);

      return service.load(entityInfo, keys).pipe(
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

  loadMany<TModel>(
    entityInfo: IEntityInfo,
    page = 0,
    size = Number.MAX_SAFE_INTEGER
  ): Observable<IEntityRef<TModel[]>> {
    try {
      const service = this.getService<TModel>(entityInfo);

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
      const service = this.getService<TModel>(entityInfo);

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
      const service = this.getService<TModel>(entityInfo);

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
      const service = this.getService<TModel>(entityInfo);

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

  delete<TModel>(entityInfo: IEntityInfo, entity: any): Observable<IEntityRef<TModel>> {
    try {
      const service = this.getService<TModel>(entityInfo);

      return service.delete(entityInfo, entity).pipe(
        map(deletedEntity => ({
          info: entityInfo,
          entity: deletedEntity
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

  protected getService<TModel>(entityInfo: IEntityInfo): IAutoEntityService<TModel> {
    try {
      const service = this.injector.get(entityInfo.modelType);
      return service;
    } catch (err) {
      const serviceName = `${pascalCase(entityInfo.modelName)}Service`;
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
