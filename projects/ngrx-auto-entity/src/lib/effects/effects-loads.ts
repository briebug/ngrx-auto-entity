import { Injectable, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';

import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityOperators } from './operators';
import { Load } from '../actions/load-actions';
import { LoadAll } from '../actions/load-all-actions';
import { LoadMany } from '../actions/load-many-actions';
import { LoadPage } from '../actions/load-page-actions';
import { LoadRange } from '../actions/load-range-actions';

@Injectable()
export class LoadEffects {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  load$ = createEffect(() => this.actions$.pipe(ofEntityAction<Load<unknown>>(EntityActionTypes.Load), this.ops.load()));

  loadAll$ = createEffect(() => this.actions$.pipe(ofEntityAction<LoadAll<unknown>>(EntityActionTypes.LoadAll), this.ops.loadAll()));

  loadMany$ = createEffect(() => this.actions$.pipe(ofEntityAction<LoadMany<unknown>>(EntityActionTypes.LoadMany), this.ops.loadMany()));

  loadPage$ = createEffect(() => this.actions$.pipe(ofEntityAction<LoadPage<unknown>>(EntityActionTypes.LoadPage), this.ops.loadPage()));

  loadRange$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<LoadRange<unknown>>(EntityActionTypes.LoadRange), this.ops.loadRange())
  );
}
