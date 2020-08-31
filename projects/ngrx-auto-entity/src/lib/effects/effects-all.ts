import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
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
  @Effect()
  load$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Load),
    this.ops.load()
  );

  @Effect()
  loadIfNecessary$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadIfNecessary),
    this.ifnOps.loadIfNecessary()
  );

  @Effect()
  loadAll$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadAll),
    this.ops.loadAll()
  );

  @Effect()
  loadAllIfNecessary$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadAllIfNecessary),
    this.ifnOps.loadAllIfNecessary()
  );

  @Effect()
  loadMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadMany),
    this.ops.loadMany()
  );

  @Effect()
  loadManyIfNecessary$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadManyIfNecessary),
    this.ifnOps.loadManyIfNecessary()
  );

  @Effect()
  loadPage$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadPage),
    this.ops.loadPage()
  );

  @Effect()
  loadPageIfNecessary$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadPageIfNecessary),
    this.ifnOps.loadPageIfNecessary()
  );

  @Effect()
  loadRange$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadRange),
    this.ops.loadRange()
  );

  @Effect()
  loadRangeIfNecessary$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadRangeIfNecessary),
    this.ifnOps.loadRangeIfNecessary()
  );

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Create),
    this.ops.create()
  );

  @Effect()
  createMany$: Observable<Action> = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.CreateMany),
    this.ops.createMany()
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Update),
    this.ops.update()
  );

  @Effect()
  updateMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.UpdateMany),
    this.ops.updateMany()
  );

  @Effect()
  upsert$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Upsert),
    this.ops.upsert()
  );

  @Effect()
  upsertMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.UpsertMany),
    this.ops.upsertMany()
  );

  @Effect()
  replace$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Replace),
    this.ops.replace()
  );

  @Effect()
  replaceMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.ReplaceMany),
    this.ops.replaceMany()
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Delete),
    this.ops.delete()
  );

  @Effect()
  deleteMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.DeleteMany),
    this.ops.deleteMany()
  );

  @Effect()
  deleteByKey$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.DeleteByKey),
    this.ops.deleteByKey()
  );

  @Effect()
  deleteManyByKeys$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.DeleteManyByKeys),
    this.ops.deleteManyByKey()
  );

  constructor(private actions$: Actions, private ops: EntityOperators, private ifnOps: EntityIfNecessaryOperators) {}
}
