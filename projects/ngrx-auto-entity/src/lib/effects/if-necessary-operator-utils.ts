import { InjectionToken, Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, pipe } from 'rxjs';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { compose as fpipe } from '../../util/func';
import { IEntityInfo } from '../actions/entity-info';
import { entityStateName } from '../decorators/entity-util';
import { Page, Range } from '../models';
import { EntityIdentity } from '../types/entity-identity';
import { IEntityState } from '../util/entity-state';
import { FEATURE_AFFINITY } from '../util/util-tokens';

export const NGRX_AUTO_ENTITY_APP_STORE = new InjectionToken('@briebug/ngrx-auto-entity App Store');

export const getEntityState =
  (info: IEntityInfo) =>
  (state: any): IEntityState<any> =>
    (info.modelType[FEATURE_AFFINITY]
      ? state[info.modelType[FEATURE_AFFINITY]][entityStateName(info.modelName)]
      : state[entityStateName(info.modelName)]) as IEntityState<any>;
export const getLoadedAt = (state: IEntityState<any>): number | undefined => state?.tracking?.loadedAt ?? undefined;
export const getIsLoading = (state: IEntityState<any>): boolean => !!state.tracking?.isLoading;
export const getCurrentPage = (state: IEntityState<any>): Page | undefined => state.paging?.currentPage ?? undefined;
export const getCurrentRange = (state: IEntityState<any>): Range | undefined => state.paging?.currentRange ?? undefined;
export const getEntityIds = (state: IEntityState<any>): EntityIdentity[] => state?.ids ?? [];
export const mapToHasEntities = (ids?: EntityIdentity[]): boolean => !!ids && !!ids.length;

export const entityLoadedAt = (info: IEntityInfo) => fpipe(getEntityState(info), getLoadedAt);
export const entityIsLoading = (info: IEntityInfo) => fpipe(getEntityState(info), getIsLoading);
export const entityCurrentPage = (info: IEntityInfo) => fpipe(getEntityState(info), getCurrentPage);
export const entityCurrentRange = (info: IEntityInfo) => fpipe(getEntityState(info), getCurrentRange);
export const entityIds = (info: IEntityInfo) => fpipe(getEntityState(info), getEntityIds);
export const hasEntitiesLoaded = (info: IEntityInfo) => fpipe(getEntityState(info), getEntityIds, mapToHasEntities);
export const addSeconds = (date: Date, seconds: number): Date =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds() + seconds,
    date.getMilliseconds()
  );
export const nowAfterExpiry = (expiry: Date): boolean => expiry < new Date();
export const isSubsequentRange = (a: any, b: any) => (a.start || a.first || a.skip + a.take) > (b.end || b.last || b.skip + b.take);

export const warnIfMissingStore: (() => void) & { lastWarnTime?: number } = () =>
  !warnIfMissingStore.lastWarnTime || Math.abs(new Date(warnIfMissingStore.lastWarnTime).valueOf() - new Date(Date.now()).valueOf()) > 15000
    ? (console.warn(
        // eslint-disable-next-line max-len
        '[NGRX-AE] Warning! The NGRX_AUTO_ENTITY_APP_STORE provider has not been configured! *IfNecessary actions require accessing your store in order to function properly!'
      ),
      (warnIfMissingStore.lastWarnTime = Date.now()),
      void 0)
    : void 0;

const warnMissingStore = () => pipe(tap(([, store]) => (!store ? warnIfMissingStore() : null)));

export const getAppStore = <TAction>(injector: Injector) =>
  pipe(
    mergeMap((action: TAction) => {
      try {
        const store = injector.get(NGRX_AUTO_ENTITY_APP_STORE);
        return of({ action, store } as { action: TAction; store: Store<any> });
      } catch {
        warnIfMissingStore();
        return of({ action, store: undefined } as { action: TAction; store: Store<any> });
      }
    }),
    filter(({ store }) => !!store)
  );
