import { Injectable, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityIfNecessaryOperators } from './if-necessary-operators';
import { EntityOperators } from './operators';
import { DeleteByKey, DeleteManyByKeys } from '../actions/delete-by-key-actions';
import { Load, LoadIfNecessary } from '../actions/load-actions';
import { LoadAll, LoadAllIfNecessary } from '../actions/load-all-actions';
import { LoadMany, LoadManyIfNecessary } from '../actions/load-many-actions';
import { LoadPage, LoadPageIfNecessary } from '../actions/load-page-actions';
import { LoadRange, LoadRangeIfNecessary } from '../actions/load-range-actions';
import { Create, CreateMany } from '../actions/create-actions';
import { Update, UpdateMany } from '../actions/update-actions';
import { Upsert, UpsertMany } from '../actions/upsert-actions';
import { Replace, ReplaceMany } from '../actions/replace-actions';
import { Delete, DeleteMany } from '../actions/delete-actions';

/**
 * Fully-featured entity effects class that provides all standard
 * effect handling for all CURDL operations.
 */
@Injectable()
export class EntityEffects {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);
  private readonly ifnOps = inject(EntityIfNecessaryOperators);

  load$ = createEffect(() => this.actions$.pipe(ofEntityAction<Load<unknown>>(EntityActionTypes.Load), this.ops.load()));

  loadIfNecessary$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<LoadIfNecessary<unknown>>(EntityActionTypes.LoadIfNecessary), this.ifnOps.loadIfNecessary())
  );

  loadAll$ = createEffect(() => this.actions$.pipe(ofEntityAction<LoadAll<unknown>>(EntityActionTypes.LoadAll), this.ops.loadAll()));

  loadAllIfNecessary$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<LoadAllIfNecessary<unknown>>(EntityActionTypes.LoadAllIfNecessary), this.ifnOps.loadAllIfNecessary())
  );

  loadMany$ = createEffect(() => this.actions$.pipe(ofEntityAction<LoadMany<unknown>>(EntityActionTypes.LoadMany), this.ops.loadMany()));

  loadManyIfNecessary$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityAction<LoadManyIfNecessary<unknown>>(EntityActionTypes.LoadManyIfNecessary),
      this.ifnOps.loadManyIfNecessary()
    )
  );

  loadPage$ = createEffect(() => this.actions$.pipe(ofEntityAction<LoadPage<unknown>>(EntityActionTypes.LoadPage), this.ops.loadPage()));

  loadPageIfNecessary$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityAction<LoadPageIfNecessary<unknown>>(EntityActionTypes.LoadPageIfNecessary),
      this.ifnOps.loadPageIfNecessary()
    )
  );

  loadRange$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<LoadRange<unknown>>(EntityActionTypes.LoadRange), this.ops.loadRange())
  );

  loadRangeIfNecessary$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityAction<LoadRangeIfNecessary<unknown>>(EntityActionTypes.LoadRangeIfNecessary),
      this.ifnOps.loadRangeIfNecessary()
    )
  );

  create$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(ofEntityAction<Create<unknown>>(EntityActionTypes.Create), this.ops.create())
  );

  createMany$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(ofEntityAction<CreateMany<unknown>>(EntityActionTypes.CreateMany), this.ops.createMany())
  );

  update$ = createEffect(() => this.actions$.pipe(ofEntityAction<Update<unknown>>(EntityActionTypes.Update), this.ops.update()));

  updateMany$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<UpdateMany<unknown>>(EntityActionTypes.UpdateMany), this.ops.updateMany())
  );

  upsert$ = createEffect(() => this.actions$.pipe(ofEntityAction<Upsert<unknown>>(EntityActionTypes.Upsert), this.ops.upsert()));

  upsertMany$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<UpsertMany<unknown>>(EntityActionTypes.UpsertMany), this.ops.upsertMany())
  );

  replace$ = createEffect(() => this.actions$.pipe(ofEntityAction<Replace<unknown>>(EntityActionTypes.Replace), this.ops.replace()));

  replaceMany$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<ReplaceMany<unknown>>(EntityActionTypes.ReplaceMany), this.ops.replaceMany())
  );

  delete$ = createEffect(() => this.actions$.pipe(ofEntityAction<Delete<unknown>>(EntityActionTypes.Delete), this.ops.delete()));

  deleteMany$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<DeleteMany<unknown>>(EntityActionTypes.DeleteMany), this.ops.deleteMany())
  );

  deleteByKey$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<DeleteByKey<unknown>>(EntityActionTypes.DeleteByKey), this.ops.deleteByKey())
  );

  deleteManyByKeys$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<DeleteManyByKeys<unknown>>(EntityActionTypes.DeleteManyByKeys), this.ops.deleteManyByKey())
  );
}
