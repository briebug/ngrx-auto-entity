import { Injectable, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityOperators } from './operators';
import { LoadAll } from '../actions/load-all-actions';
import { Load } from '../actions/load-actions';
import { LoadMany } from '../actions/load-many-actions';
import { LoadPage } from '../actions/load-page-actions';
import { LoadRange } from '../actions/load-range-actions';

@Injectable()
export class LoadEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  load$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(ofEntityAction<Load<unknown>>(EntityActionTypes.Load), this.ops.load())
  );
}

@Injectable()
export class LoadAllEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  loadAll$ = createEffect(() => this.actions$.pipe(ofEntityAction<LoadAll<unknown>>(EntityActionTypes.LoadAll), this.ops.loadAll()));
}

@Injectable()
export class LoadManyEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  loadMany$ = createEffect(() => this.actions$.pipe(ofEntityAction<LoadMany<unknown>>(EntityActionTypes.LoadMany), this.ops.loadMany()));
}

@Injectable()
export class LoadPageEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  loadPage$ = createEffect(() => this.actions$.pipe(ofEntityAction<LoadPage<unknown>>(EntityActionTypes.LoadPage), this.ops.loadPage()));
}

@Injectable()
export class LoadRangeEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  loadRange$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<LoadRange<unknown>>(EntityActionTypes.LoadRange), this.ops.loadRange())
  );
}
