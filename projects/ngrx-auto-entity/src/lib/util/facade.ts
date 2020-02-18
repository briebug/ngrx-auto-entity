import { Observable } from 'rxjs';

import { Page, Range } from '../models';
import { EntityIdentity, IEntityDictionary } from './entity-state';

/**
 * The definition of an Auto-Entity facade class
 */
export interface IEntityFacade<TModel> {
  all$: Observable<TModel[]>;
  sorted$: Observable<TModel[]>;
  entities$: Observable<IEntityDictionary<TModel>>;
  ids$: Observable<EntityIdentity[]>;
  total$: Observable<number>;
  current$: Observable<TModel>;
  currentKey$: Observable<EntityIdentity>;
  currentSet$: Observable<TModel[]>;
  currentSetKeys$: Observable<EntityIdentity[]>;
  edited$: Observable<Partial<TModel>>;
  isDirty$: Observable<boolean>;
  currentPage$: Observable<Page>;
  currentRange$: Observable<Range>;
  totalPageable$: Observable<number>;
  isLoading$: Observable<boolean>;
  isSaving$: Observable<boolean>;
  isDeleting$: Observable<boolean>;
  loadedAt$: Observable<Date>;
  savedAt$: Observable<Date>;
  createdAt$: Observable<Date>;
  deletedAt$: Observable<Date>;

  select(entity: TModel): void;

  selectByKey(key: EntityIdentity): void;

  selectMany(entities: TModel[]): void;

  selectMore(entities: TModel[]): void;

  selectManyByKeys(keys: EntityIdentity[]): void;

  selectMoreByKeys(keys: EntityIdentity[]): void;

  deselect(): void;

  deselectMany(entities: TModel[]): void;

  deselectManyByKeys(keys: EntityIdentity[]): void;

  deselectAll(): void;

  edit(entity: Partial<TModel>): void;

  change(entity: Partial<TModel>): void;

  endEdit(): void;

  load(keys: any, criteria?: any): void;

  loadMany(criteria: any): void;

  loadAll(criteria?: any): void;

  loadPage(page: Page, criteria?: any): void;

  loadRange(range: Range, criteria?: any): void;

  create(entity: TModel, criteria?: any): void;

  createMany(entities: TModel[], criteria?: any): void;

  update(entity: TModel, criteria?: any): void;

  updateMany(entities: TModel[], criteria?: any): void;

  replace(entity: TModel, criteria?: any): void;

  replaceMany(entities: TModel[], criteria?: any): void;

  delete(entity: TModel, criteria?: any): void;

  deleteMany(entities: TModel[], criteria?: any): void;

  deleteByKey(key: EntityIdentity, criteria?: any): void;

  deleteManyByKeys(keys: EntityIdentity[], criteria?: any): void;

  clear(): void;
}
