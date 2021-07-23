import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityOperators } from './operators';

@Injectable()
export class LoadEffect {
  load$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofEntityAction(EntityActionTypes.Load),
      this.ops.load()
    )
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class LoadAllEffect {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityAction(EntityActionTypes.LoadAll),
      this.ops.loadAll()
    )
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class LoadManyEffect {
  loadMany$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityAction(EntityActionTypes.LoadMany),
      this.ops.loadMany()
    )
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class LoadPageEffect {
  loadPage$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityAction(EntityActionTypes.LoadPage),
      this.ops.loadPage()
    )
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class LoadRangeEffect {
  loadRange$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityAction(EntityActionTypes.LoadRange),
      this.ops.loadRange()
    )
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}
