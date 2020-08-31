import { Injectable, InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { pipe } from '../../util/func';
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

export const NGRX_AUTO_ENTITY_APP_STORE = new InjectionToken('NgRx Auto-Entity App Store');

const getEntityState = (info: IEntityInfo) => (state: any): IEntityState<any> =>
  state[entityStateName(info.modelName)] as IEntityState<any>;
const getLoadedAt = (state: IEntityState<any>): number => state.loadedAt;
const getCurrentPage = (state: IEntityState<any>): Page => state.currentPage;
const getCurrentRange = (state: IEntityState<any>): Range => state.currentRange;
const getEntityIds = (state: IEntityState<any>): EntityIdentity[] => state.ids;
const mapToHasEntities = (ids?: EntityIdentity[]): boolean => !!ids && !!ids.length;

const entityLoadedAt = (info: IEntityInfo) =>
  pipe(
    getEntityState(info),
    getLoadedAt
  );

const entityCurrentPage = (info: IEntityInfo) =>
  pipe(
    getEntityState(info),
    getCurrentPage
  );

const entityCurrentRange = (info: IEntityInfo) =>
  pipe(
    getEntityState(info),
    getCurrentRange
  );

const entityIds = (info: IEntityInfo) =>
  pipe(
    getEntityState(info),
    getEntityIds
  );

const hasEntitiesLoaded = (info: IEntityInfo) =>
  pipe(
    getEntityState(info),
    getEntityIds,
    mapToHasEntities
  );

const addSeconds = (date: Date, seconds: number): Date => (date.setSeconds(date.getSeconds() + seconds), date);
const nowAfterExpiry = (expiry: Date): boolean => expiry < new Date();
const isSubsequentRange = (a: any, b: any) =>
  (a.start || a.first || a.skip + a.take) > (b.end || b.last || b.skip + b.take);

@Injectable()
export class EntityIfNecessaryOperators {
  constructor(private store: Store<any>) {}

  loadIfNecessary<TModel>() {
    return (source: Observable<LoadIfNecessary<TModel>>) =>
      source.pipe(
        mergeMap(({ info, keys, maxAge, criteria, correlationId }) =>
          combineLatest([
            this.store.select(entityLoadedAt(info)),
            this.store.select(hasEntitiesLoaded(info)),
            of(info.defaultMaxAge),
            this.store.select(entityIds(info))
          ]).pipe(
            map(([loadedAt, hasEntities, defaultMaxAge, ids]) => ({
              loadedAt,
              hasEntities,
              defaultMaxAge,
              missing: !loadedAt || !hasEntities || (!!ids && ids.indexOf(keys) === -1),
              checkAge: !!defaultMaxAge || !!maxAge
            })),
            filter(
              ({ missing, checkAge, loadedAt, defaultMaxAge }) =>
                !(
                  missing ||
                  (checkAge ? nowAfterExpiry(addSeconds(new Date(loadedAt), maxAge || defaultMaxAge)) : missing)
                )
            ),
            map(() => new Load(info.modelType, keys, criteria, correlationId))
          )
        )
      );
  }

  loadAllIfNecessary<TModel>() {
    return (source: Observable<LoadAllIfNecessary<TModel>>) =>
      source.pipe(
        mergeMap(({ info, maxAge, criteria, correlationId }) =>
          combineLatest([
            this.store.select(entityLoadedAt(info)),
            this.store.select(hasEntitiesLoaded(info)),
            of(info.defaultMaxAge)
          ]).pipe(
            map(([loadedAt, hasEntities, defaultMaxAge]) => ({
              loadedAt,
              hasEntities,
              defaultMaxAge,
              missing: !loadedAt || !hasEntities,
              checkAge: !!defaultMaxAge || !!maxAge
            })),
            filter(
              ({ missing, checkAge, loadedAt, defaultMaxAge }) =>
                !(
                  missing ||
                  (checkAge ? nowAfterExpiry(addSeconds(new Date(loadedAt), maxAge || defaultMaxAge)) : missing)
                )
            ),
            map(() => new LoadAll(info.modelType, criteria, correlationId))
          )
        )
      );
  }

  loadManyIfNecessary<TModel>() {
    return (source: Observable<LoadManyIfNecessary<TModel>>) =>
      source.pipe(
        mergeMap(({ info, maxAge, criteria, correlationId }) =>
          combineLatest([
            this.store.select(entityLoadedAt(info)),
            this.store.select(hasEntitiesLoaded(info)),
            of(info.defaultMaxAge)
          ]).pipe(
            map(([loadedAt, hasEntities, defaultMaxAge]) => ({
              loadedAt,
              hasEntities,
              defaultMaxAge,
              missing: !loadedAt || !hasEntities,
              checkAge: !!defaultMaxAge || !!maxAge
            })),
            filter(
              ({ missing, checkAge, loadedAt, defaultMaxAge }) =>
                !(
                  missing ||
                  (checkAge ? nowAfterExpiry(addSeconds(new Date(loadedAt), maxAge || defaultMaxAge)) : missing)
                )
            ),
            map(() => new LoadMany(info.modelType, criteria, correlationId))
          )
        )
      );
  }

  loadPageIfNecessary<TModel>() {
    return (source: Observable<LoadPageIfNecessary<TModel>>) =>
      source.pipe(
        mergeMap(({ info, page, maxAge, criteria, correlationId }) =>
          combineLatest([
            this.store.select(entityLoadedAt(info)),
            this.store.select(hasEntitiesLoaded(info)),
            of(info.defaultMaxAge),
            this.store.select(entityCurrentPage(info))
          ]).pipe(
            map(([loadedAt, hasEntities, defaultMaxAge, currentPage]) => ({
              loadedAt,
              hasEntities,
              defaultMaxAge,
              missing: !loadedAt || !hasEntities,
              samePage: page.page === currentPage.page,
              checkAge: !!defaultMaxAge || !!maxAge
            })),
            filter(
              ({ missing, samePage, checkAge, loadedAt, defaultMaxAge }) =>
                !(
                  missing ||
                  samePage ||
                  (checkAge ? nowAfterExpiry(addSeconds(new Date(loadedAt), maxAge || defaultMaxAge)) : missing)
                )
            ),
            map(() => new LoadPage(info.modelType, page, criteria, correlationId))
          )
        )
      );
  }

  loadRangeIfNecessary<TModel>() {
    return (source: Observable<LoadRangeIfNecessary<TModel>>) =>
      source.pipe(
        mergeMap(({ info, range, maxAge, criteria, correlationId }) =>
          combineLatest([
            this.store.select(entityLoadedAt(info)),
            this.store.select(hasEntitiesLoaded(info)),
            of(info.defaultMaxAge),
            this.store.select(entityCurrentRange(info))
          ]).pipe(
            map(([loadedAt, hasEntities, defaultMaxAge, currentRange]) => ({
              loadedAt,
              hasEntities,
              defaultMaxAge,
              missing: !loadedAt || !hasEntities,
              nonFollowingRange: !isSubsequentRange(range, currentRange),
              checkAge: !!defaultMaxAge || !!maxAge
            })),
            filter(
              ({ missing, nonFollowingRange, checkAge, loadedAt, defaultMaxAge }) =>
                !(
                  missing ||
                  nonFollowingRange ||
                  (checkAge ? nowAfterExpiry(addSeconds(new Date(loadedAt), maxAge || defaultMaxAge)) : missing)
                )
            ),
            map(() => new LoadRange(info.modelType, range, criteria, correlationId))
          )
        )
      );
  }
}
