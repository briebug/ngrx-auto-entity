import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';

import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityOperators } from './operators';

@Injectable()
export class LoadEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityAction(EntityActionTypes.Load),
      this.ops.load()
    )
  );

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityAction(EntityActionTypes.LoadAll),
      this.ops.loadAll()
    )
  );

  loadMany$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityAction(EntityActionTypes.LoadMany),
      this.ops.loadMany()
    )
  );

  loadPage$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityAction(EntityActionTypes.LoadPage),
      this.ops.loadPage()
    )
  );

  loadRange$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityAction(EntityActionTypes.LoadRange),
      this.ops.loadRange()
    )
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}
