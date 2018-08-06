import { Injectable, Injector } from '@angular/core';
import { pascalCase } from 'change-case';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IPageInfo, IRangeInfo, Page, Range } from './models';
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

export interface IEntityPageRef<TModel> extends IEntityRef<TModel[]> {
  pageInfo: IPageInfo;
}

export interface IEntityRangeRef<TModel> extends IEntityRef<TModel[]> {
  rangeInfo: IRangeInfo;
}

export interface IEntityWithPageInfo<TModel> {
  entities: TModel[];
  pageInfo: IPageInfo;
}

export interface IEntityWithRangeInfo<TModel> {
  entities: TModel[];
  rangeInfo: IRangeInfo;
}

export interface IAutoEntityService<TModel> {
  load(entityInfo: IEntityInfo, keys: any, relationKeys?: any): Observable<TModel>;

  loadAll(entityInfo: IEntityInfo, relationKeys?: any): Observable<TModel[]>;

  loadPage(entityInfo: IEntityInfo, page: Page, relationKeys?: any): Observable<IEntityWithPageInfo<TModel>>;

  loadRange(entityInfo: IEntityInfo, range: Range, relationKeys?: any): Observable<IEntityWithRangeInfo<TModel>>;

  create(entityInfo: IEntityInfo, entity: TModel, relationKeys?: any): Observable<TModel>;

  update(entityInfo: IEntityInfo, entity: TModel, relationKeys?: any): Observable<TModel>;

  replace(entityInfo: IEntityInfo, entity: TModel, relationKeys?: any): Observable<TModel>;

  delete(entityInfo: IEntityInfo, entity: TModel, relationKeys?: any): Observable<TModel>;
}

/**
 * Looks up client-provided entity service class using Angular's injector and this package's naming
 * conventions.  Then calls client's service and provides success/failure handling.
 */
@Injectable()
export class NgrxAutoEntityService {
  constructor(private injector: Injector) {}

  load<TModel>(entityInfo: IEntityInfo, keys: any, relationKeys?: any): Observable<IEntityRef<TModel>> {
    try {
      const service = this.getService<TModel>(entityInfo);

      return service.load(entityInfo, keys, relationKeys).pipe(
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

  loadAll<TModel>(entityInfo: IEntityInfo, relationKeys?: any): Observable<IEntityRef<TModel[]>> {
    try {
      const service = this.getService<TModel>(entityInfo);
      return service.loadAll(entityInfo, relationKeys).pipe(
        map((entities: TModel[]) => ({
          info: entityInfo,
          entity: entities
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

  loadPage<TModel>(entityInfo: IEntityInfo, page: Page, relationKeys?: any): Observable<IEntityPageRef<TModel>> {
    try {
      const service = this.getService<TModel>(entityInfo);
      return service.loadPage(entityInfo, page, relationKeys).pipe(
        map((result: IEntityWithPageInfo<TModel>) => ({
          info: entityInfo,
          pageInfo: result.pageInfo,
          entity: result.entities
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

  loadRange<TModel>(entityInfo: IEntityInfo, range: Range, relationKeys?: any): Observable<IEntityRangeRef<TModel>> {
    try {
      const service = this.getService<TModel>(entityInfo);
      return service.loadRange(entityInfo, range, relationKeys).pipe(
        map((result: IEntityWithRangeInfo<TModel>) => ({
          info: entityInfo,
          rangeInfo: result.rangeInfo,
          entity: result.entities
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

  create<TModel>(entityInfo: IEntityInfo, entity: TModel, relationKeys?: any): Observable<IEntityRef<TModel>> {
    try {
      const service = this.getService<TModel>(entityInfo);

      return service.create(entityInfo, entity, relationKeys).pipe(
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

  update<TModel>(entityInfo: IEntityInfo, entity: TModel, relationKeys?: any): Observable<IEntityRef<TModel>> {
    try {
      const service = this.getService<TModel>(entityInfo);

      return service.update(entityInfo, entity, relationKeys).pipe(
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

  replace<TModel>(entityInfo: IEntityInfo, entity: TModel, relationKeys?: any): Observable<IEntityRef<TModel>> {
    try {
      const service = this.getService<TModel>(entityInfo);

      return service.replace(entityInfo, entity, relationKeys).pipe(
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

  delete<TModel>(entityInfo: IEntityInfo, entity: TModel, relationKeys?: any): Observable<IEntityRef<TModel>> {
    try {
      const service = this.getService<TModel>(entityInfo);

      return service.delete(entityInfo, entity, relationKeys).pipe(
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
