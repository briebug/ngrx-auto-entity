import { Injectable, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityIfNecessaryOperators } from './if-necessary-operators';
import { LoadPageIfNecessary } from '../actions/load-page-actions';
import { LoadRangeIfNecessary } from '../actions/load-range-actions';
import { LoadIfNecessary } from '../actions/load-actions';
import { LoadManyIfNecessary } from '../actions/load-many-actions';
import { LoadAllIfNecessary } from '../actions/load-all-actions';

@Injectable()
export class LoadIfNecessaryEffects {
  private readonly actions$ = inject(Actions);
  private readonly ifnOps = inject(EntityIfNecessaryOperators);

  loadIfNecessary$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<LoadIfNecessary<unknown>>(EntityActionTypes.LoadIfNecessary), this.ifnOps.loadIfNecessary())
  );

  loadAllIfNecessary$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<LoadAllIfNecessary<unknown>>(EntityActionTypes.LoadAllIfNecessary), this.ifnOps.loadAllIfNecessary())
  );

  loadManyIfNecessary$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityAction<LoadManyIfNecessary<unknown>>(EntityActionTypes.LoadManyIfNecessary),
      this.ifnOps.loadManyIfNecessary()
    )
  );

  loadPageIfNecessary$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityAction<LoadPageIfNecessary<unknown>>(EntityActionTypes.LoadPageIfNecessary),
      this.ifnOps.loadPageIfNecessary()
    )
  );

  loadRangeIfNecessary$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityAction<LoadRangeIfNecessary<unknown>>(EntityActionTypes.LoadRangeIfNecessary),
      this.ifnOps.loadRangeIfNecessary()
    )
  );
}
