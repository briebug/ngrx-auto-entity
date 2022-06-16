import { Injector } from '@angular/core';
import { IEntityInfo } from '../actions/entity-info';
import { logErrorDetails, logServiceLocateFailure } from './error-handling';
import { IAutoEntityService } from './interface';

export const failResolution = (error: any, entityInfo: IEntityInfo): void => {
  logServiceLocateFailure(entityInfo);
  logErrorDetails(error);
  throw error;
};

export const resolveService = <TModel>(entityInfo: Readonly<IEntityInfo>, injector: Injector): IAutoEntityService<TModel> => {
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
