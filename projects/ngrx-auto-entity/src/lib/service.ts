import { Injectable, Injector } from '@angular/core';
import { pascalCase } from 'change-case';
import { prepend } from 'ramda';
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
  message?: string;
  err?: any;
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
  load?(entityInfo: IEntityInfo, keys: any, criteria?: any): Observable<TModel>;

  loadMany?(entityInfo: IEntityInfo, criteria?: any): Observable<TModel[]>;

  loadAll?(entityInfo: IEntityInfo, criteria?: any): Observable<TModel[]>;

  loadPage?(entityInfo: IEntityInfo, page: Page, criteria?: any): Observable<IEntityWithPageInfo<TModel>>;

  loadRange?(entityInfo: IEntityInfo, range: Range, criteria?: any): Observable<IEntityWithRangeInfo<TModel>>;

  create?(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<TModel>;

  createMany?(entityInfo: IEntityInfo, entities: TModel[], criteria?: any): Observable<TModel[]>;

  update?(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<TModel>;

  updateMany?(entityInfo: IEntityInfo, entities: TModel[], criteria?: any): Observable<TModel[]>;

  replace?(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<TModel>;

  replaceMany?(entityInfo: IEntityInfo, entities: TModel[], criteria?: any): Observable<TModel[]>;

  delete?(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<TModel>;

  deleteMany?(entityInfo: IEntityInfo, entities: TModel[], criteria?: any): Observable<TModel[]>;
}

const notImplemented = (method: string, entityInfo: IEntityInfo): string =>
  `Entity service method "${method}" has not been implemented. (Entity: ${entityInfo.modelName})`;
const notAFunction = (method: string, entityInfo: IEntityInfo): string =>
  `Entity service method "${method}" is not a function. (Entity: ${entityInfo.modelName})`;

const logAndThrow = (method: string, err: any, entityInfo: IEntityInfo) => {
  console.error(`[NGRX-AE] ! Service error: ${method}(). (Entity: ${entityInfo.modelName})`);
  console.error(err);
  return throwError({ info: entityInfo, err });
};

const getService = <TModel>(entityInfo: IEntityInfo, injector: Injector): IAutoEntityService<TModel> =>
  resolveServiceDeep(entityInfo, injector, [...NgrxAutoEntityService.INJECTORS]);

export const logServiceLocateFailure = (entityInfo: IEntityInfo, serviceName: string): void =>
  console.error(
    `[NGRX-AE] ! Error: Unable to locate service "${serviceName}" using model name of "${entityInfo.modelName}"`
  );

export const logErrorDetails = (error: any): void => console.error(`[NGRX-AE] ! Error Details:`, error);

const failResolution = (error: any, entityInfo: IEntityInfo): void => {
  const serviceName = `${pascalCase(entityInfo.modelName)}Service`;
  logServiceLocateFailure(entityInfo, serviceName);
  logErrorDetails(error);
  throw error;
};

const resolveService = <TModel>(entityInfo: Readonly<IEntityInfo>, injector: Injector): IAutoEntityService<TModel> => {
  return injector.get(entityInfo.modelType);
};

const resolveServiceDeep = <TModel>(
  entityInfo: Readonly<IEntityInfo>,
  injector: Injector,
  remaining: Injector[]
): IAutoEntityService<TModel> => {
  try {
    return resolveService(entityInfo, injector);
  } catch (err) {
    if (remaining.length) {
      const [first, ...rest] = remaining;
      return resolveServiceDeep(entityInfo, first, rest);
    } else {
      failResolution(err, entityInfo);
    }
  }
};

const invokeService = <TModel, TModelObs, TResult>(
  method: string,
  entityInfo: IEntityInfo,
  invoke: (service: IAutoEntityService<TModel>) => Observable<TModelObs>,
  toResult: (entity: TModelObs) => TResult,
  service: IAutoEntityService<TModel>
) =>
  !service[method]
    ? throwError({ info: entityInfo, message: notImplemented(method, entityInfo) })
    : typeof service[method] !== 'function'
    ? throwError({ info: entityInfo, message: notAFunction(method, entityInfo) })
    : invoke(service).pipe(
        map(toResult),
        catchError(err => throwError({ info: entityInfo, err }))
      );

const callService = <TModel, TModelObs, TResult>(
  method: string,
  entityInfo: IEntityInfo,
  injector: Injector,
  invoke: (service: IAutoEntityService<TModel>) => Observable<TModelObs>,
  toResult: (entity: TModelObs) => TResult
): Observable<TResult> => {
  try {
    const service = getService(entityInfo, injector);
    return invokeService(method, entityInfo, invoke, toResult, service);
  } catch (err) {
    logAndThrow(method, err, entityInfo);
  }
};

// export const prepend = <T>(first: T, rest: ReadonlyArray<T>): ReadonlyArray<T> => [first, ...rest];

/**
 * Looks up client-provided entity service class using Angular's injector and this package's naming
 * conventions.  Then calls client's service and provides success/failure handling.
 */
@Injectable()
export class NgrxAutoEntityService {
  static INJECTORS: NonNullable<ReadonlyArray<Injector>> = [];

  static addInjector(injector: Injector): void {
    NgrxAutoEntityService.INJECTORS = prepend(injector, NgrxAutoEntityService.INJECTORS);
  }

  constructor(private injector: Injector) {}

  load<TModel>(entityInfo: IEntityInfo, keys: any, criteria?: any): Observable<IEntityRef<TModel>> {
    return callService<TModel, TModel, IEntityRef<TModel>>(
      'load',
      entityInfo,
      this.injector,
      service => service.load(entityInfo, keys, criteria),
      entity => ({ info: entityInfo, entity })
    );
  }

  loadAll<TModel>(entityInfo: IEntityInfo, criteria?: any): Observable<IEntityRef<TModel[]>> {
    return callService<TModel, TModel[], IEntityRef<TModel[]>>(
      'loadAll',
      entityInfo,
      this.injector,
      service => service.loadAll(entityInfo, criteria),
      entities => ({ info: entityInfo, entity: entities })
    );
  }

  loadMany<TModel>(entityInfo: IEntityInfo, criteria?: any): Observable<IEntityRef<TModel[]>> {
    return callService<TModel, TModel[], IEntityRef<TModel[]>>(
      'loadMany',
      entityInfo,
      this.injector,
      service => service.loadMany(entityInfo, criteria),
      entities => ({ info: entityInfo, entity: entities })
    );
  }

  loadPage<TModel>(entityInfo: IEntityInfo, page: Page, criteria?: any): Observable<IEntityPageRef<TModel>> {
    return callService<TModel, IEntityWithPageInfo<TModel>, IEntityPageRef<TModel>>(
      'loadPage',
      entityInfo,
      this.injector,
      service => service.loadPage(entityInfo, criteria),
      result => ({
        info: entityInfo,
        pageInfo: result.pageInfo,
        entity: result.entities
      })
    );
  }

  loadRange<TModel>(entityInfo: IEntityInfo, range: Range, criteria?: any): Observable<IEntityRangeRef<TModel>> {
    return callService<TModel, IEntityWithRangeInfo<TModel>, IEntityRangeRef<TModel>>(
      'loadRange',
      entityInfo,
      this.injector,
      service => service.loadRange(entityInfo, criteria),
      result => ({
        info: entityInfo,
        rangeInfo: result.rangeInfo,
        entity: result.entities
      })
    );
  }

  create<TModel>(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<IEntityRef<TModel>> {
    return callService<TModel, TModel, IEntityRef<TModel>>(
      'create',
      entityInfo,
      this.injector,
      service => service.create(entityInfo, entity, criteria),
      created => ({ info: entityInfo, entity: created })
    );
  }

  createMany<TModel>(entityInfo: IEntityInfo, entities: TModel[], criteria?: any): Observable<IEntityRef<TModel[]>> {
    return callService<TModel, TModel[], IEntityRef<TModel[]>>(
      'createMany',
      entityInfo,
      this.injector,
      service => service.createMany(entityInfo, entities, criteria),
      created => ({ info: entityInfo, entity: created })
    );
  }

  update<TModel>(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<IEntityRef<TModel>> {
    return callService<TModel, TModel, IEntityRef<TModel>>(
      'update',
      entityInfo,
      this.injector,
      service => service.update(entityInfo, entity, criteria),
      updated => ({ info: entityInfo, entity: updated })
    );
  }

  updateMany<TModel>(entityInfo: IEntityInfo, entities: TModel[], criteria?: any): Observable<IEntityRef<TModel[]>> {
    return callService<TModel, TModel[], IEntityRef<TModel[]>>(
      'updateMany',
      entityInfo,
      this.injector,
      service => service.updateMany(entityInfo, entities, criteria),
      updatedEntities => ({ info: entityInfo, entity: updatedEntities })
    );
  }

  replace<TModel>(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<IEntityRef<TModel>> {
    return callService<TModel, TModel, IEntityRef<TModel>>(
      'replace',
      entityInfo,
      this.injector,
      service => service.replace(entityInfo, entity, criteria),
      replaced => ({ info: entityInfo, entity: replaced })
    );
  }

  replaceMany<TModel>(entityInfo: IEntityInfo, entities: TModel[], criteria?: any): Observable<IEntityRef<TModel[]>> {
    return callService<TModel, TModel[], IEntityRef<TModel[]>>(
      'replaceMany',
      entityInfo,
      this.injector,
      service => service.replaceMany(entityInfo, entities, criteria),
      replaced => ({ info: entityInfo, entity: replaced })
    );
  }

  delete<TModel>(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<IEntityRef<TModel>> {
    return callService<TModel, TModel, IEntityRef<TModel>>(
      'delete',
      entityInfo,
      this.injector,
      service => service.delete(entityInfo, entity, criteria),
      deleted => ({ info: entityInfo, entity: deleted })
    );
  }

  deleteMany<TModel>(entityInfo: IEntityInfo, entities: TModel[], criteria?: any): Observable<IEntityRef<TModel[]>> {
    return callService<TModel, TModel[], IEntityRef<TModel[]>>(
      'deleteMany',
      entityInfo,
      this.injector,
      service => service.deleteMany(entityInfo, entities, criteria),
      deleted => ({ info: entityInfo, entity: deleted })
    );
  }
}
