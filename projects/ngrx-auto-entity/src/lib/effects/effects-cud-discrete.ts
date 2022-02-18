import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityOperators } from './operators';

@Injectable()
export class CreateEffect {
  create$: Observable<Action> = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Create), this.ops.create()));

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class CreateManyEffect {
  createMany$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(ofEntityAction(EntityActionTypes.CreateMany), this.ops.createMany())
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class UpdateEffect {
  update$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Update), this.ops.update()));

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class UpdateManyEffect {
  updateMany$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.UpdateMany), this.ops.updateMany()));

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class UpsertEffect {
  update$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Upsert), this.ops.upsert()));

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class UpsertManyEffect {
  updateMany$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.UpsertMany), this.ops.upsertMany()));

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class ReplaceEffect {
  replace$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Replace), this.ops.replace()));

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class ReplaceManyEffect {
  replaceMany$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.ReplaceMany), this.ops.replaceMany()));

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class DeleteEffect {
  delete$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Delete), this.ops.delete()));

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class DeleteManyEffect {
  deleteMany$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.DeleteMany), this.ops.deleteMany()));

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class DeleteByKeyEffect {
  deleteByKey$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.DeleteByKey), this.ops.deleteByKey()));

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class DeleteManyByKeysEffect {
  deleteManyByKeys$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction(EntityActionTypes.DeleteManyByKeys), this.ops.deleteManyByKey())
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}
