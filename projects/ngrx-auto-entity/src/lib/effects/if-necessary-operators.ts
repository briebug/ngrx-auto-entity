import { Injectable, Injector } from '@angular/core';
import { select } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, mergeMap, take } from 'rxjs/operators';
import { Load, LoadIfNecessary } from '../actions/load-actions';
import { LoadAll, LoadAllIfNecessary } from '../actions/load-all-actions';
import { LoadMany, LoadManyIfNecessary } from '../actions/load-many-actions';
import { LoadPage, LoadPageIfNecessary } from '../actions/load-page-actions';
import { LoadRange, LoadRangeIfNecessary } from '../actions/load-range-actions';
import {
  addSeconds,
  entityCurrentPage,
  entityCurrentRange,
  entityIds,
  entityIsLoading,
  entityLoadedAt,
  getAppStore,
  hasEntitiesLoaded,
  isSubsequentRange,
  nowAfterExpiry
} from './if-necessary-operator-utils';

@Injectable()
export class EntityIfNecessaryOperators {
  constructor(private injector: Injector) {}

  loadIfNecessary<TModel>() {
    return (source: Observable<LoadIfNecessary<TModel>>) =>
      source.pipe(
        getAppStore<LoadIfNecessary<TModel>>(this.injector),
        mergeMap(({ action: { info, keys, maxAge, criteria, correlationId }, store }) =>
          combineLatest([
            store.pipe(select(entityLoadedAt(info)), take(1)),
            store.pipe(select(entityIsLoading(info)), take(1)),
            store.pipe(select(hasEntitiesLoaded(info)), take(1)),
            of(info.defaultMaxAge),
            store.pipe(select(entityIds(info)), take(1))
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
                !isLoading && (missing || (checkAge ? nowAfterExpiry(addSeconds(new Date(loadedAt), maxAge || defaultMaxAge)) : missing))
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
            store.pipe(select(entityLoadedAt(info)), take(1)),
            store.pipe(select(entityIsLoading(info)), take(1)),
            store.pipe(select(hasEntitiesLoaded(info)), take(1)),
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
                (missing || (checkAge ? nowAfterExpiry(addSeconds(new Date(loadedAt as number), maxAge || defaultMaxAge)) : missing))
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
            store.pipe(select(entityLoadedAt(info)), take(1)),
            store.pipe(select(entityIsLoading(info)), take(1)),
            store.pipe(select(hasEntitiesLoaded(info)), take(1)),
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
                !isLoading && (missing || (checkAge ? nowAfterExpiry(addSeconds(new Date(loadedAt), maxAge || defaultMaxAge)) : missing))
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
            store.pipe(select(entityLoadedAt(info)), take(1)),
            store.pipe(select(entityIsLoading(info)), take(1)),
            store.pipe(select(hasEntitiesLoaded(info)), take(1)),
            of(info.defaultMaxAge),
            store.pipe(select(entityCurrentPage(info)), take(1))
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
                (missing || !samePage || (checkAge ? nowAfterExpiry(addSeconds(new Date(loadedAt), maxAge || defaultMaxAge)) : missing))
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
            store.pipe(select(entityLoadedAt(info)), take(1)),
            store.pipe(select(entityIsLoading(info)), take(1)),
            store.pipe(select(hasEntitiesLoaded(info)), take(1)),
            of(info.defaultMaxAge),
            store.pipe(select(entityCurrentRange(info)), take(1))
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
