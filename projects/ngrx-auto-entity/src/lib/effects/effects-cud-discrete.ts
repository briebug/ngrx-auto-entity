import { Injectable, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityOperators } from './operators';

@Injectable()
export class CreateEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  create$: Observable<Action> = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Create), this.ops.create()));
}

@Injectable()
export class CreateManyEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  createMany$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(ofEntityAction(EntityActionTypes.CreateMany), this.ops.createMany())
  );
}

@Injectable()
export class UpdateEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  update$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Update), this.ops.update()));
}

@Injectable()
export class UpdateManyEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  updateMany$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.UpdateMany), this.ops.updateMany()));
}

@Injectable()
export class UpsertEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  update$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Upsert), this.ops.upsert()));
}

@Injectable()
export class UpsertManyEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  updateMany$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.UpsertMany), this.ops.upsertMany()));
}

@Injectable()
export class ReplaceEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  replace$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Replace), this.ops.replace()));
}

@Injectable()
export class ReplaceManyEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  replaceMany$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.ReplaceMany), this.ops.replaceMany()));
}

@Injectable()
export class DeleteEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  delete$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Delete), this.ops.delete()));
}

@Injectable()
export class DeleteManyEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  deleteMany$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.DeleteMany), this.ops.deleteMany()));
}

@Injectable()
export class DeleteByKeyEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  deleteByKey$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.DeleteByKey), this.ops.deleteByKey()));
}

@Injectable()
export class DeleteManyByKeysEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  deleteManyByKeys$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction(EntityActionTypes.DeleteManyByKeys), this.ops.deleteManyByKey())
  );
}
