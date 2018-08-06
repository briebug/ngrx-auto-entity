import { Injectable, Injector } from '@angular/core';
import { pascalCase } from 'change-case';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IEntityInfo } from './actions';
import { IPageInfo, IRangeInfo, Page, Range } from './models';
import { IAutoEntityService } from './service';

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
  load?(entityInfo: IEntityInfo, keys: any, relationKeys?: any): Observable<TModel>;

  loadAll?(entityInfo: IEntityInfo, relationKeys?: any): Observable<TModel[]>;

  loadPage?(entityInfo: IEntityInfo, page: Page, relationKeys?: any): Observable<IEntityWithPageInfo<TModel>>;

  loadRange?(entityInfo: IEntityInfo, range: Range, relationKeys?: any): Observable<IEntityWithRangeInfo<TModel>>;

  create?(entityInfo: IEntityInfo, entity: TModel, relationKeys?: any): Observable<TModel>;

  update?(entityInfo: IEntityInfo, entity: TModel, relationKeys?: any): Observable<TModel>;

  replace?(entityInfo: IEntityInfo, entity: TModel, relationKeys?: any): Observable<TModel>;

  delete?(entityInfo: IEntityInfo, entity: TModel, relationKeys?: any): Observable<TModel>;
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

      if (!service.load) {
        return throwError({ info: entityInfo, message: 'Entity service "load" is not implemented' });
      }

      if (typeof service.load !== 'function') {
        return throwError({ info: entityInfo, message: 'Entity service "load" is not a function' });
      }

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

      if (!service.loadAll) {
        return throwError({ info: entityInfo, message: 'Entity service "loadAll" is not implemented' });
      }

      if (typeof service.loadAll !== 'function') {
        return throwError({ info: entityInfo, message: 'Entity service "loadAll" is not a function' });
      }

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

      if (!service.loadPage) {
        return throwError({ info: entityInfo, message: 'Entity service "loadPage" is not implemented' });
      }

      if (typeof service.loadPage !== 'function') {
        return throwError({ info: entityInfo, message: 'Entity service "loadPage" is not a function' });
      }

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

      if (!service.loadRange) {
        return throwError({ info: entityInfo, message: 'Entity service "loadRange" is not implemented' });
      }

      if (typeof service.loadRange !== 'function') {
        return throwError({ info: entityInfo, message: 'Entity service "loadRange" is not a function' });
      }

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

      if (!service.create) {
        return throwError({ info: entityInfo, message: 'Entity service "create" is not implemented' });
      }

      if (typeof service.update !== 'function') {
        return throwError({ info: entityInfo, message: 'Entity service "update" is not a function' });
      }

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

      if (!service.update) {
        return throwError({ info: entityInfo, message: 'Entity service "update" is not implemented' });
      }

      if (typeof service.update !== 'function') {
        return throwError({ info: entityInfo, message: 'Entity service "update" is not a function' });
      }

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

      if (!service.replace) {
        return throwError({ info: entityInfo, message: 'Entity service "replace" is not implemented' });
      }

      if (typeof service.replace !== 'function') {
        return throwError({ info: entityInfo, message: 'Entity service "replace" is not a function' });
      }

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

      if (!service.delete) {
        return throwError({ info: entityInfo, message: 'Entity service "delete" is not implemented' });
      }

      if (typeof service.delete !== 'function') {
        return throwError({ info: entityInfo, message: 'Entity service "delete" is not a function' });
      }

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
