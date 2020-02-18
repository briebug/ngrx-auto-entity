import { Injector } from '@angular/core';
import { IEntityInfo } from '../actions/entity-info';
import { IAutoEntityService } from './interface';
import { resolveServiceDeep } from './service-resolution';

let INJECTORS: NonNullable<ReadonlyArray<Injector>> = [];

export const getService = <TModel>(entityInfo: IEntityInfo, injector: Injector): IAutoEntityService<TModel> =>
  resolveServiceDeep(entityInfo, injector, [...INJECTORS]);

export const prepend = <T>(first: T, rest: ReadonlyArray<T>): ReadonlyArray<T> => Object.freeze([first, ...rest]);

export const addInjector = (injector: Injector): void => {
  INJECTORS = prepend(injector, INJECTORS);
};
