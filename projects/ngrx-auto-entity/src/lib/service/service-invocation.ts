import { Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IEntityInfo } from '../actions/entity-info';
import { logAndThrow, notAFunction, notImplemented } from './error-handling';
import { IAutoEntityService } from './interface';
import { getService } from './service-injection';

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
  method: keyof IAutoEntityService<TModel>,
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
