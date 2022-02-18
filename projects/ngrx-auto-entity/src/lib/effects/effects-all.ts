import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityIfNecessaryOperators } from './if-necessary-operators';
import { EntityOperators } from './operators';

/**
 * Fully-featured entity effects class that provides all standard
 * effect handling for all CURDL operations.
 */
@Injectable()
export class EntityEffects {
  load$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Load), this.ops.load()));

  loadIfNecessary$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction(EntityActionTypes.LoadIfNecessary), this.ifnOps.loadIfNecessary())
  );

  loadAll$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.LoadAll), this.ops.loadAll()));

  loadAllIfNecessary$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction(EntityActionTypes.LoadAllIfNecessary), this.ifnOps.loadAllIfNecessary())
  );

  loadMany$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.LoadMany), this.ops.loadMany()));

  loadManyIfNecessary$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction(EntityActionTypes.LoadManyIfNecessary), this.ifnOps.loadManyIfNecessary())
  );

  loadPage$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.LoadPage), this.ops.loadPage()));

  loadPageIfNecessary$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction(EntityActionTypes.LoadPageIfNecessary), this.ifnOps.loadPageIfNecessary())
  );

  loadRange$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.LoadRange), this.ops.loadRange()));

  loadRangeIfNecessary$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction(EntityActionTypes.LoadRangeIfNecessary), this.ifnOps.loadRangeIfNecessary())
  );

  create$: Observable<Action> = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Create), this.ops.create()));

  createMany$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(ofEntityAction(EntityActionTypes.CreateMany), this.ops.createMany())
  );

  update$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Update), this.ops.update()));

  updateMany$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.UpdateMany), this.ops.updateMany()));

  upsert$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Upsert), this.ops.upsert()));

  upsertMany$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.UpsertMany), this.ops.upsertMany()));

  replace$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Replace), this.ops.replace()));

  replaceMany$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.ReplaceMany), this.ops.replaceMany()));

  delete$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Delete), this.ops.delete()));

  deleteMany$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.DeleteMany), this.ops.deleteMany()));

  deleteByKey$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.DeleteByKey), this.ops.deleteByKey()));

  deleteManyByKeys$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction(EntityActionTypes.DeleteManyByKeys), this.ops.deleteManyByKey())
  );

  constructor(private actions$: Actions, private ops: EntityOperators, private ifnOps: EntityIfNecessaryOperators) {}
}
