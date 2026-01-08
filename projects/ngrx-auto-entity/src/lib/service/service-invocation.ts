import { Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IEntityInfo } from '../actions/entity-info';
import { logAndThrow, notAFunction, notImplemented } from './error-handling';
import { IAutoEntityService } from './interface';
import { getService } from './service-injection';

export const invokeService = <TModel, TModelObs, TResult, TMethod extends keyof IAutoEntityService<TModel>>(
  method: TMethod,
  entityInfo: IEntityInfo<TModel>,
  invoke: (service: Pick<Required<IAutoEntityService<TModel>>, TMethod>) => Observable<TModelObs>,
  toResult: (entity: TModelObs) => TResult,
  service: IAutoEntityService<TModel>
) =>
  !service[method]
    ? throwError({ info: entityInfo, message: notImplemented(method, entityInfo) })
    : typeof service[method] !== 'function'
    ? throwError({ info: entityInfo, message: notAFunction(method, entityInfo) })
    : // TODO: remove cast
      invoke(service as Pick<Required<IAutoEntityService<TModel>>, TMethod>).pipe(
        map(toResult),
        catchError(err => throwError({ info: entityInfo, err }))
      );

export const callService = <TModel, TModelObs, TResult, TMethod extends keyof IAutoEntityService<TModel>>(
  method: TMethod,
  entityInfo: IEntityInfo<TModel>,
  injector: Injector,
  invoke: (service: Pick<Required<IAutoEntityService<TModel>>, TMethod>) => Observable<TModelObs>,
  toResult: (entity: TModelObs) => TResult
): Observable<TResult> => {
  try {
    const service = getService<TModel>(entityInfo, injector);
    return invokeService(method, entityInfo, invoke, toResult, service);
  } catch (err) {
    return logAndThrow(method, err, entityInfo);
  }
};
