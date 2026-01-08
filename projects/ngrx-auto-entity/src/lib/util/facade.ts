import { Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EntityIdentity } from '../types/entity-identity';

import { Page, Range } from '../models';
import { IEntityDictionary } from './entity-state';
import { TNew } from '../actions/model-constructor';

export interface IEntityFacadeBase<TModel> {
  /** @deprecated Use the empty constructor instead. The model type will be provided by `buildState`, and the store by `provideStore` or `withCustomStore`. */
  new (type: new () => TModel, store: Store<any>): IEntityFacade<TModel>;
  new (): IEntityFacade<TModel>;
}

/**
 * The definition of an Auto-Entity facade class
 */
export interface IEntityFacade<TModel> {
  readonly modelType: TNew<TModel>;
  readonly store: Store<any>;

  all$: Observable<TModel[]>;
  sorted$: Observable<TModel[]>;
  entities$: Observable<IEntityDictionary<TModel>>;
  ids$: Observable<EntityIdentity[]>;
  total$: Observable<number>;
  hasEntities$: Observable<boolean>;
  hasNoEntities$: Observable<boolean>;
  current$: Observable<TModel | undefined>;
  currentKey$: Observable<EntityIdentity | undefined>;
  currentSet$: Observable<TModel[]>;
  currentSetKeys$: Observable<EntityIdentity[]>;
  edited$: Observable<Partial<TModel> | undefined>;
  isDirty$: Observable<boolean>;
  currentPage$: Observable<Page | undefined>;
  currentRange$: Observable<Range | undefined>;
  totalPageable$: Observable<number>;
  hasBeenLoaded$: Observable<boolean>;
  loadWasAttempted$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isSaving$: Observable<boolean>;
  isDeleting$: Observable<boolean>;
  loadedAt$: Observable<Date | undefined>;
  savedAt$: Observable<Date | undefined>;
  createdAt$: Observable<Date | undefined>;
  updatedAt$: Observable<Date | undefined>;
  replacedAt$: Observable<Date | undefined>;
  deletedAt$: Observable<Date | undefined>;

  all: Signal<TModel[]>;
  sorted: Signal<TModel[]>;
  entities: Signal<IEntityDictionary<TModel>>;
  ids: Signal<EntityIdentity[]>;
  total: Signal<number>;
  hasEntities: Signal<boolean>;
  hasNoEntities: Signal<boolean>;
  current: Signal<TModel | undefined>;
  currentKey: Signal<EntityIdentity | undefined>;
  currentSet: Signal<TModel[]>;
  currentSetKeys: Signal<EntityIdentity[]>;
  edited: Signal<Partial<TModel> | undefined>;
  isDirty: Signal<boolean>;
  currentPage: Signal<Page | undefined>;
  currentRange: Signal<Range | undefined>;
  totalPageable: Signal<number>;
  hasBeenLoaded: Signal<boolean>;
  loadWasAttempted: Signal<boolean>;
  isLoading: Signal<boolean>;
  isSaving: Signal<boolean>;
  isDeleting: Signal<boolean>;
  loadedAt: Signal<Date | undefined>;
  savedAt: Signal<Date | undefined>;
  createdAt: Signal<Date | undefined>;
  updatedAt: Signal<Date | undefined>;
  replacedAt: Signal<Date | undefined>;
  deletedAt: Signal<Date | undefined>;

  select(entity: TModel, correlationId?: string): string;
  selectByKey(key: EntityIdentity, correlationId?: string): string;
  selectMany(entities: TModel[], correlationId?: string): string;
  selectMore(entities: TModel[], correlationId?: string): string;
  selectManyByKeys(keys: EntityIdentity[], correlationId?: string): string;
  selectMoreByKeys(keys: EntityIdentity[], correlationId?: string): string;

  deselect(correlationId?: string): string;
  deselectMany(entities: TModel[], correlationId?: string): string;
  deselectManyByKeys(keys: EntityIdentity[], correlationId?: string): string;
  deselectAll(correlationId?: string): string;

  editNew(entity?: Partial<TModel>, correlationId?: string): string;
  edit(entity: Partial<TModel>, correlationId?: string): string;
  editByKey(key: EntityIdentity, correlationId?: string): string;
  change(entity: Partial<TModel>, correlationId?: string): string;
  endEdit(correlationId?: string): string;

  load(keys?: any, criteria?: any, correlationId?: string): string;
  loadIfNecessary(keys?: any, criteria?: any, maxAge?: number, correlationId?: string): string;
  loadMany(criteria?: any, correlationId?: string): string;
  loadManyIfNecessary(criteria?: any, maxAge?: number, correlationId?: string): string;
  loadAll(criteria?: any, correlationId?: string): string;
  loadAllIfNecessary(criteria?: any, maxAge?: number, correlationId?: string): string;
  loadPage(page: Page, criteria?: any, correlationId?: string): string;
  loadPageIfNecessary(page: Page, criteria?: any, maxAge?: number, correlationId?: string): string;
  loadRange(range: Range, criteria?: any, correlationId?: string): string;
  loadRangeIfNecessary(range: Range, criteria?: any, maxAge?: number, correlationId?: string): string;

  create(entity: TModel, criteria?: any, correlationId?: string): string;
  createMany(entities: TModel[], criteria?: any, correlationId?: string): string;

  update(entity: TModel, criteria?: any, correlationId?: string): string;
  updateMany(entities: TModel[], criteria?: any, correlationId?: string): string;

  upsert(entity: TModel, criteria?: any, correlationId?: string): string;
  upsertMany(entities: TModel[], criteria?: any, correlationId?: string): string;

  replace(entity: TModel, criteria?: any, correlationId?: string): string;
  replaceMany(entities: TModel[], criteria?: any, correlationId?: string): string;

  delete(entity: TModel, criteria?: any, correlationId?: string): string;
  deleteMany(entities: TModel[], criteria?: any, correlationId?: string): string;
  deleteByKey(key: EntityIdentity, criteria?: any, correlationId?: string): string;
  deleteManyByKeys(keys: EntityIdentity[], criteria?: any, correlationId?: string): string;

  clear(correlationId?: string): string;
}
