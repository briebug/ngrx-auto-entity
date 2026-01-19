import { Injectable, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityIfNecessaryOperators } from './if-necessary-operators';

@Injectable()
export class LoadIfNecessaryEffects {
  private readonly actions$ = inject(Actions);
  private readonly ifnOps = inject(EntityIfNecessaryOperators);

  loadIfNecessary$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction(EntityActionTypes.LoadIfNecessary), this.ifnOps.loadIfNecessary())
  );

  loadAllIfNecessary$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction(EntityActionTypes.LoadAllIfNecessary), this.ifnOps.loadAllIfNecessary())
  );

  loadManyIfNecessary$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction(EntityActionTypes.LoadManyIfNecessary), this.ifnOps.loadManyIfNecessary())
  );

  loadPageIfNecessary$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction(EntityActionTypes.LoadPageIfNecessary), this.ifnOps.loadPageIfNecessary())
  );

  loadRangeIfNecessary$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction(EntityActionTypes.LoadRangeIfNecessary), this.ifnOps.loadRangeIfNecessary())
  );
}
