import { Injectable, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityOperators } from './operators';
import { Create, CreateMany } from '../actions/create-actions';
import { Update, UpdateMany } from '../actions/update-actions';
import { Upsert, UpsertMany } from '../actions/upsert-actions';
import { Replace, ReplaceMany } from '../actions/replace-actions';
import { Delete, DeleteMany } from '../actions/delete-actions';
import { DeleteByKey, DeleteManyByKeys } from '../actions/delete-by-key-actions';

@Injectable()
export class CUDEffects {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

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
