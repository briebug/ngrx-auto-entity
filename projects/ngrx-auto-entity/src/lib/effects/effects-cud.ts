import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityOperators } from './operators';

@Injectable()
export class CUDEffects {
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

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}
