import { Injectable, InjectionToken, Injector } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of, pipe } from 'rxjs';
import { filter, map, mergeMap, take, tap } from 'rxjs/operators';
import { pipe as fpipe } from '../../util/func';
import { IEntityInfo } from '../actions/entity-info';
import { Load, LoadIfNecessary } from '../actions/load-actions';
import { LoadAll, LoadAllIfNecessary } from '../actions/load-all-actions';
import { LoadMany, LoadManyIfNecessary } from '../actions/load-many-actions';
import { LoadPage, LoadPageIfNecessary } from '../actions/load-page-actions';
import { LoadRange, LoadRangeIfNecessary } from '../actions/load-range-actions';
import { entityStateName } from '../decorators/entity-util';
import { Page, Range } from '../models';
import { EntityIdentity } from '../types/entity-identity';
import { IEntityState } from '../util/entity-state';

export const NGRX_AUTO_ENTITY_APP_STORE = new InjectionToken('@briebug/ngrx-auto-entity App Store');

const getEntityState = (info: IEntityInfo) => (state: any): IEntityState<any> =>
  state[entityStateName(info.modelName)] as IEntityState<any>;
const getLoadedAt = (state: IEntityState<any>): number => state.loadedAt;
const getIsLoading = (state: IEntityState<any>): boolean => state.isLoading;
const getCurrentPage = (state: IEntityState<any>): Page => state.currentPage;
const getCurrentRange = (state: IEntityState<any>): Range => state.currentRange;
const getEntityIds = (state: IEntityState<any>): EntityIdentity[] => state.ids;
const mapToHasEntities = (ids?: EntityIdentity[]): boolean => !!ids && !!ids.length;

const entityLoadedAt = (info: IEntityInfo) => fpipe(getEntityState(info), getLoadedAt);
const entityIsLoading = (info: IEntityInfo) => fpipe(getEntityState(info), getIsLoading);
const entityCurrentPage = (info: IEntityInfo) => fpipe(getEntityState(info), getCurrentPage);
const entityCurrentRange = (info: IEntityInfo) => fpipe(getEntityState(info), getCurrentRange);
const entityIds = (info: IEntityInfo) => fpipe(getEntityState(info), getEntityIds);
const hasEntitiesLoaded = (info: IEntityInfo) => fpipe(getEntityState(info), getEntityIds, mapToHasEntities);

const addSeconds = (date: Date, seconds: number): Date => (date.setSeconds(date.getSeconds() + seconds), date);
const nowAfterExpiry = (expiry: Date): boolean => expiry < new Date();
const isSubsequentRange = (a: any, b: any) =>
  (a.start || a.first || a.skip + a.take) > (b.end || b.last || b.skip + b.take);

const warnIfMissingStore = () =>
  console.warn(
    '[NGRX-AE] Warning! The NGRX_AUTO_ENTITY_APP_STORE provider has not been configured! *IfNecessary actions require accessing your store in order to function properly!'
  );

const warnMissingStore = () => pipe(tap(([, store]) => (!store ? warnMissingStore() : null)));

const getAppStore = <TAction>(injector: Injector) =>
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

@Injectable()
export class EntityIfNecessaryOperators {
  constructor(private injector: Injector) {}

  loadIfNecessary<TModel>() {
    return (source: Observable<LoadIfNecessary<TModel>>) =>
      source.pipe(
        getAppStore<LoadIfNecessary<TModel>>(this.injector),
        mergeMap(({ action: { info, keys, maxAge, criteria, correlationId }, store }) =>
          combineLatest([
            store.pipe(
              select(entityLoadedAt(info)),
              take(1)
            ),
            store.pipe(
              select(entityIsLoading(info)),
              take(1)
            ),
            store.pipe(
              select(hasEntitiesLoaded(info)),
              take(1)
            ),
            of(info.defaultMaxAge),
            store.pipe(
              select(entityIds(info)),
              take(1)
            )
          ]).pipe(
            map(([loadedAt, isLoading, hasEntities, defaultMaxAge, ids]) => ({
              loadedAt,
              isLoading,
              hasEntities,
              defaultMaxAge,
              missing: !loadedAt || !hasEntities || (!!ids && ids.indexOf(keys) === -1),
              checkAge: !!defaultMaxAge || !!maxAge
            })),
            filter(
              ({ isLoading, missing, checkAge, loadedAt, defaultMaxAge }) =>
                !isLoading &&
                (missing ||
                  (checkAge ? nowAfterExpiry(addSeconds(new Date(loadedAt), maxAge || defaultMaxAge)) : missing))
            ),
            map(() => new Load(info.modelType, keys, criteria, correlationId))
          )
        )
      );
  }

  loadAllIfNecessary<TModel>() {
    return (source: Observable<LoadAllIfNecessary<TModel>>) =>
      source.pipe(
        getAppStore<LoadAllIfNecessary<TModel>>(this.injector),
        mergeMap(({ action: { info, maxAge, criteria, correlationId }, store }) =>
          combineLatest([
            store.pipe(
              select(entityLoadedAt(info)),
              take(1)
            ),
            store.pipe(
              select(entityIsLoading(info)),
              take(1)
            ),
            store.pipe(
              select(hasEntitiesLoaded(info)),
              take(1)
            ),
            of(info.defaultMaxAge)
          ]).pipe(
            map(([loadedAt, isLoading, hasEntities, defaultMaxAge]) => ({
              loadedAt,
              isLoading,
              hasEntities,
              defaultMaxAge,
              missing: !loadedAt || !hasEntities,
              checkAge: !!defaultMaxAge || !!maxAge
            })),
            filter(
              ({ isLoading, missing, checkAge, loadedAt, defaultMaxAge }) =>
                !isLoading &&
                (missing ||
                  (checkAge
                    ? nowAfterExpiry(addSeconds(new Date(loadedAt as number), maxAge || defaultMaxAge))
                    : missing))
            ),
            map(() => new LoadAll(info.modelType, criteria, correlationId))
          )
        )
      );
  }

  loadManyIfNecessary<TModel>() {
    return (source: Observable<LoadManyIfNecessary<TModel>>) =>
      source.pipe(
        getAppStore<LoadManyIfNecessary<TModel>>(this.injector),
        mergeMap(({ action: { info, maxAge, criteria, correlationId }, store }) =>
          combineLatest([
            store.pipe(
              select(entityLoadedAt(info)),
              take(1)
            ),
            store.pipe(
              select(entityIsLoading(info)),
              take(1)
            ),
            store.pipe(
              select(hasEntitiesLoaded(info)),
              take(1)
            ),
            of(info.defaultMaxAge)
          ]).pipe(
            map(([loadedAt, isLoading, hasEntities, defaultMaxAge]) => ({
              loadedAt,
              isLoading,
              hasEntities,
              defaultMaxAge,
              missing: !loadedAt || !hasEntities,
              checkAge: !!defaultMaxAge || !!maxAge
            })),
            filter(
              ({ isLoading, missing, checkAge, loadedAt, defaultMaxAge }) =>
                !isLoading &&
                (missing ||
                  (checkAge ? nowAfterExpiry(addSeconds(new Date(loadedAt), maxAge || defaultMaxAge)) : missing))
            ),
            map(() => new LoadMany(info.modelType, criteria, correlationId))
          )
        )
      );
  }

  loadPageIfNecessary<TModel>() {
    return (source: Observable<LoadPageIfNecessary<TModel>>) =>
      source.pipe(
        getAppStore<LoadPageIfNecessary<TModel>>(this.injector),
        mergeMap(({ action: { info, page, maxAge, criteria, correlationId }, store }) =>
          combineLatest([
            store.pipe(
              select(entityLoadedAt(info)),
              take(1)
            ),
            store.pipe(
              select(entityIsLoading(info)),
              take(1)
            ),
            store.pipe(
              select(hasEntitiesLoaded(info)),
              take(1)
            ),
            of(info.defaultMaxAge),
            store.pipe(
              select(entityCurrentPage(info)),
              take(1)
            )
          ]).pipe(
            map(([loadedAt, isLoading, hasEntities, defaultMaxAge, currentPage]) => ({
              loadedAt,
              isLoading,
              hasEntities,
              defaultMaxAge,
              missing: !loadedAt || !hasEntities,
              samePage: page.page === currentPage.page,
              checkAge: !!defaultMaxAge || !!maxAge
            })),
            filter(
              ({ isLoading, missing, samePage, checkAge, loadedAt, defaultMaxAge }) =>
                !isLoading &&
                (missing ||
                  !samePage ||
                  (checkAge ? nowAfterExpiry(addSeconds(new Date(loadedAt), maxAge || defaultMaxAge)) : missing))
            ),
            map(() => new LoadPage(info.modelType, page, criteria, correlationId))
          )
        )
      );
  }

  loadRangeIfNecessary<TModel>() {
    return (source: Observable<LoadRangeIfNecessary<TModel>>) =>
      source.pipe(
        getAppStore<LoadRangeIfNecessary<TModel>>(this.injector),
        mergeMap(({ action: { info, range, maxAge, criteria, correlationId }, store }) =>
          combineLatest([
            store.pipe(
              select(entityLoadedAt(info)),
              take(1)
            ),
            store.pipe(
              select(entityIsLoading(info)),
              take(1)
            ),
            store.pipe(
              select(hasEntitiesLoaded(info)),
              take(1)
            ),
            of(info.defaultMaxAge),
            store.pipe(select(entityCurrentRange(info), take(1)))
          ]).pipe(
            map(([loadedAt, isLoading, hasEntities, defaultMaxAge, currentRange]) => ({
              loadedAt,
              isLoading,
              hasEntities,
              defaultMaxAge,
              missing: !loadedAt || !hasEntities,
              nonFollowingRange: !isSubsequentRange(range, currentRange),
              checkAge: !!defaultMaxAge || !!maxAge
            })),
            filter(
              ({ isLoading, missing, nonFollowingRange, checkAge, loadedAt, defaultMaxAge }) =>
                !isLoading &&
                (missing ||
                  !nonFollowingRange ||
                  (checkAge ? nowAfterExpiry(addSeconds(new Date(loadedAt), maxAge || defaultMaxAge)) : missing))
            ),
            map(() => new LoadRange(info.modelType, range, criteria, correlationId))
          )
        )
      );
  }
}
