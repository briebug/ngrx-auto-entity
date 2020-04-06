import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityOperators } from './operators';

@Injectable()
export class CUDEffects {
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

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}
