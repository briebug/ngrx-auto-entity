import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { pascalCase } from '../util/case';
import { IEntityInfo } from './actions';
import { IEntityTransformer } from './decorators/entity';
import { IPageInfo, IRangeInfo, Page, Range } from './models';
import { IAutoEntityService } from './service';
import { EntityIdentity } from './util';

export interface IEntityRef<TModel> {
  info: IEntityInfo;
  entity: TModel;
}

export interface IEntityIdentityRef {
  info: IEntityInfo;
  entityIdentity: EntityIdentity;
}

export interface IEntityIdentitiesRef {
  info: IEntityInfo;
  entityIdentities: EntityIdentity[];
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

  create?(entityInfo: IEntityInfo, entity: TModel, criteria?: any, originalEntity?: TModel): Observable<TModel>;

  createMany?(
    entityInfo: IEntityInfo,
    entities: TModel[],
    criteria?: any,
    originalEntities?: TModel[]
  ): Observable<TModel[]>;

  update?(entityInfo: IEntityInfo, entity: TModel, criteria?: any, originalEntity?: TModel): Observable<TModel>;

  updateMany?(
    entityInfo: IEntityInfo,
    entities: TModel[],
    criteria?: any,
    originalEntities?: TModel[]
  ): Observable<TModel[]>;

  replace?(entityInfo: IEntityInfo, entity: TModel, criteria?: any, originalEntity?: TModel): Observable<TModel>;

  replaceMany?(
    entityInfo: IEntityInfo,
    entities: TModel[],
    criteria?: any,
    originalEntities?: TModel[]
  ): Observable<TModel[]>;

  delete?(entityInfo: IEntityInfo, entity: TModel, criteria?: any, originalEntity?: TModel): Observable<TModel>;

  deleteMany?(
    entityInfo: IEntityInfo,
    entities: TModel[],
    criteria?: any,
    originalEntities?: TModel[]
  ): Observable<TModel[]>;

  deleteByKey?(entityInfo: IEntityInfo, key: EntityIdentity, criteria?: any): Observable<EntityIdentity>;

  deleteManyByKeys?(entityInfo: IEntityInfo, keys: EntityIdentity[], criteria?: any): Observable<EntityIdentity[]>;
}

export const notImplemented = (method: string, entityInfo: IEntityInfo): string =>
  `Entity service method "${method}" has not been implemented. (Entity: ${entityInfo.modelName})`;
export const notAFunction = (method: string, entityInfo: IEntityInfo): string =>
  `Entity service method "${method}" is not a function. (Entity: ${entityInfo.modelName})`;

export const logAndThrow = (method: string, err: any, entityInfo: IEntityInfo) => {
  console.error(`[NGRX-AE] ! Service error: ${method}(). (Entity: ${entityInfo.modelName})`);
  console.error(err);
  return throwError({ info: entityInfo, err });
};

export const logServiceLocateFailure = (entityInfo: IEntityInfo, serviceName: string): void =>
  console.error(
    `[NGRX-AE] ! Error: Unable to locate service "${serviceName}" using model name of "${entityInfo.modelName}"`
  );

export const logErrorDetails = (error: any): void => console.error(`[NGRX-AE] ! Error Details:`, error);

export const failResolution = (error: any, entityInfo: IEntityInfo): void => {
  const serviceName = `${pascalCase(entityInfo.modelName)}Service`;
  logServiceLocateFailure(entityInfo, serviceName);
  logErrorDetails(error);
  throw error;
};

export const resolveService = <TModel>(
  entityInfo: Readonly<IEntityInfo>,
  injector: Injector
): IAutoEntityService<TModel> => {
  return injector.get(entityInfo.modelType);
};

export const resolveServiceDeep = <TModel>(
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

export const getService = <TModel>(entityInfo: IEntityInfo, injector: Injector): IAutoEntityService<TModel> =>
  resolveServiceDeep(entityInfo, injector, [...NgrxAutoEntityService.INJECTORS]); // ts:disable

export const invokeService = <TModel, TModelObs, TResult>(
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

export const callService = <TModel, TModelObs, TResult>(
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

export const prepend = <T>(first: T, rest: ReadonlyArray<T>): ReadonlyArray<T> => [first, ...rest];

const FROM = 'fromServer';
const TO = 'toServer';

export const getTransforms = (transform: IEntityTransformer[], prop: string): Array<(value: any) => any> =>
  !!transform && !!transform.length ? transform.filter(tx => !!tx[prop]).map(tx => tx[prop]) : [value => value];

export const applyTransforms = (transforms: Array<(value: any) => any>) => (originalEntity: any): any =>
  transforms.reduce(
    (entity, transform) => {
      return transform(entity);
    },
    { ...originalEntity }
  );

export const transformFromServer = <TModel>(entityInfo: IEntityInfo) => (
  entityRef: IEntityRef<TModel>
): IEntityRef<TModel> => ({
  ...entityRef,
  entity: applyTransforms(getTransforms(entityInfo.transform, FROM))(entityRef.entity) as TModel
});

export const transformSetFromServer = <TModel>(entityInfo: IEntityInfo) => (
  entityRef: IEntityRef<TModel[]>
): IEntityRef<TModel[]> => {
  const transforms = getTransforms(entityInfo.transform, FROM);

  return {
    ...entityRef,
    entity: entityRef.entity.map(applyTransforms(transforms))
  };
};

export const transformPageFromServer = <TModel>(entityInfo: IEntityInfo) => (
  entityRef: IEntityPageRef<TModel>
): IEntityPageRef<TModel> => {
  const transforms = getTransforms(entityInfo.transform, FROM);

  return {
    ...entityRef,
    entity: entityRef.entity.map(applyTransforms(transforms))
  };
};

export const transformRangeFromServer = <TModel>(entityInfo: IEntityInfo) => (
  entityRef: IEntityRangeRef<TModel>
): IEntityRangeRef<TModel> => {
  const transforms = getTransforms(entityInfo.transform, FROM);

  return {
    ...entityRef,
    entity: entityRef.entity.map(applyTransforms(transforms))
  };
};

export const transformSingleFromServer = <TModel>(entityInfo: IEntityInfo) => (entity: any): TModel => {
  return applyTransforms(getTransforms(entityInfo.transform, FROM))(entity);
};

export const transformArrayFromServer = <TModel>(entityInfo: IEntityInfo) => (entities: TModel[]): TModel[] => {
  const transforms = getTransforms(entityInfo.transform, FROM);
  return entities.map(applyTransforms(transforms));
};

export const transformToServer = <TModel>(entityInfo: IEntityInfo) => (originalEntity: TModel): any =>
  applyTransforms(getTransforms(entityInfo.transform, TO))(originalEntity);

export const transformSetToServer = <TModel>(entityInfo: IEntityInfo) => (entities: TModel[]): any[] => {
  const transforms = getTransforms(entityInfo.transform, TO);

  return entities.map(applyTransforms(transforms));
};

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
    ).pipe(map(transformFromServer(entityInfo)));
  }

  loadAll<TModel>(entityInfo: IEntityInfo, criteria?: any): Observable<IEntityRef<TModel[]>> {
    return callService<TModel, TModel[], IEntityRef<TModel[]>>(
      'loadAll',
      entityInfo,
      this.injector,
      service => service.loadAll(entityInfo, criteria),
      entities => ({ info: entityInfo, entity: entities })
    ).pipe(map(transformSetFromServer(entityInfo)));
  }

  loadMany<TModel>(entityInfo: IEntityInfo, criteria?: any): Observable<IEntityRef<TModel[]>> {
    return callService<TModel, TModel[], IEntityRef<TModel[]>>(
      'loadMany',
      entityInfo,
      this.injector,
      service => service.loadMany(entityInfo, criteria),
      entities => ({ info: entityInfo, entity: entities })
    ).pipe(map(transformSetFromServer(entityInfo)));
  }

  loadPage<TModel>(entityInfo: IEntityInfo, page: Page, criteria?: any): Observable<IEntityPageRef<TModel>> {
    return callService<TModel, IEntityWithPageInfo<TModel>, IEntityPageRef<TModel>>(
      'loadPage',
      entityInfo,
      this.injector,
      service => service.loadPage(entityInfo, page, criteria),
      result => ({
        info: entityInfo,
        pageInfo: result.pageInfo,
        entity: result.entities
      })
    ).pipe(map(transformPageFromServer(entityInfo)));
  }

  loadRange<TModel>(entityInfo: IEntityInfo, range: Range, criteria?: any): Observable<IEntityRangeRef<TModel>> {
    return callService<TModel, IEntityWithRangeInfo<TModel>, IEntityRangeRef<TModel>>(
      'loadRange',
      entityInfo,
      this.injector,
      service => service.loadRange(entityInfo, range, criteria),
      result => ({
        info: entityInfo,
        rangeInfo: result.rangeInfo,
        entity: result.entities
      })
    ).pipe(map(transformRangeFromServer(entityInfo)));
  }

  create<TModel>(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<IEntityRef<TModel>> {
    const transformed = transformToServer(entityInfo)(entity);
    return callService<TModel, TModel, IEntityRef<TModel>>(
      'create',
      entityInfo,
      this.injector,
      service => service.create(entityInfo, transformed, criteria, entity),
      created => ({ info: entityInfo, entity: transformSingleFromServer(entityInfo)(created) as TModel })
    );
  }

  createMany<TModel>(entityInfo: IEntityInfo, entities: TModel[], criteria?: any): Observable<IEntityRef<TModel[]>> {
    const transformed = transformSetToServer(entityInfo)(entities);
    return callService<TModel, TModel[], IEntityRef<TModel[]>>(
      'createMany',
      entityInfo,
      this.injector,
      service => service.createMany(entityInfo, transformed, criteria, entities),
      created => ({ info: entityInfo, entity: transformArrayFromServer(entityInfo)(created) as TModel[] })
    );
  }

  update<TModel>(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<IEntityRef<TModel>> {
    const transformed = transformToServer(entityInfo)(entity);
    return callService<TModel, TModel, IEntityRef<TModel>>(
      'update',
      entityInfo,
      this.injector,
      service => service.update(entityInfo, transformed, criteria, entity),
      updated => ({ info: entityInfo, entity: transformSingleFromServer(entityInfo)(updated) as TModel })
    );
  }

  updateMany<TModel>(entityInfo: IEntityInfo, entities: TModel[], criteria?: any): Observable<IEntityRef<TModel[]>> {
    const transformed = transformSetToServer(entityInfo)(entities);
    return callService<TModel, TModel[], IEntityRef<TModel[]>>(
      'updateMany',
      entityInfo,
      this.injector,
      service => service.updateMany(entityInfo, transformed, criteria, entities),
      updatedEntities => ({
        info: entityInfo,
        entity: transformArrayFromServer(entityInfo)(updatedEntities) as TModel[]
      })
    );
  }

  replace<TModel>(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<IEntityRef<TModel>> {
    const transformed = transformToServer(entityInfo)(entity);
    return callService<TModel, TModel, IEntityRef<TModel>>(
      'replace',
      entityInfo,
      this.injector,
      service => service.replace(entityInfo, transformed, criteria, entity),
      replaced => ({ info: entityInfo, entity: transformSingleFromServer(entityInfo)(replaced) as TModel })
    );
  }

  replaceMany<TModel>(entityInfo: IEntityInfo, entities: TModel[], criteria?: any): Observable<IEntityRef<TModel[]>> {
    const transformed = transformSetToServer(entityInfo)(entities);
    return callService<TModel, TModel[], IEntityRef<TModel[]>>(
      'replaceMany',
      entityInfo,
      this.injector,
      service => service.replaceMany(entityInfo, transformed, criteria, entities),
      replaced => ({ info: entityInfo, entity: transformArrayFromServer(entityInfo)(replaced) as TModel[] })
    );
  }

  delete<TModel>(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<IEntityRef<TModel>> {
    const transformed = transformToServer(entityInfo)(entity);
    return callService<TModel, TModel, IEntityRef<TModel>>(
      'delete',
      entityInfo,
      this.injector,
      service => service.delete(entityInfo, transformed, criteria, entity),
      deleted => ({ info: entityInfo, entity: transformSingleFromServer(entityInfo)(deleted) as TModel })
    );
  }

  deleteMany<TModel>(entityInfo: IEntityInfo, entities: TModel[], criteria?: any): Observable<IEntityRef<TModel[]>> {
    const transformed = transformSetToServer(entityInfo)(entities);
    return callService<TModel, TModel[], IEntityRef<TModel[]>>(
      'deleteMany',
      entityInfo,
      this.injector,
      service => service.deleteMany(entityInfo, transformed, criteria, entities),
      deleted => ({ info: entityInfo, entity: transformArrayFromServer(entityInfo)(deleted) as TModel[] })
    );
  }

  deleteByKey<TModel>(entityInfo: IEntityInfo, key: EntityIdentity, criteria?: any): Observable<IEntityIdentityRef> {
    return callService<TModel, EntityIdentity, IEntityIdentityRef>(
      'deleteByKey',
      entityInfo,
      this.injector,
      service => service.deleteByKey(entityInfo, key, criteria),
      deletedKey => ({ info: entityInfo, entityIdentity: deletedKey })
    );
  }

  deleteManyByKey<TModel>(
    entityInfo: IEntityInfo,
    keys: EntityIdentity[],
    criteria?: any
  ): Observable<IEntityIdentitiesRef> {
    return callService<TModel, EntityIdentity[], IEntityIdentitiesRef>(
      'deleteManyByKeys',
      entityInfo,
      this.injector,
      service => service.deleteManyByKeys(entityInfo, keys, criteria),
      deletedKeys => ({ info: entityInfo, entityIdentities: deletedKeys })
    );
  }
}
