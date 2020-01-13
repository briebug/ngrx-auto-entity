import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { Back, Forward, Go, RouterActionType } from './router.actions';

@Injectable()
export class RouterEffects {
  @Effect({
    dispatch: false
  })
  navigate$ = this.actions$.pipe(
    ofType<Go>(RouterActionType.go),
    map(action => action.payload),
    tap(({ path, query: queryParams, extras }) => this.router.navigate(path, { queryParams, ...extras }))
  );

  @Effect({
    dispatch: false
  })
  navigateBack$ = this.actions$.pipe(
    ofType<Back>(RouterActionType.back),
    tap(() => this.location.back())
  );

  @Effect({
    dispatch: false
  })
  navigateForward$ = this.actions$.pipe(
    ofType<Forward>(RouterActionType.forward),
    tap(() => this.location.forward())
  );

  constructor(private actions$: Actions, private router: Router, private location: Location) {}
}
