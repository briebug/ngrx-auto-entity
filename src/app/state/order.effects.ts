import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { EntityActionTypes, EntityOperators, ofEntityType } from '@briebug/ngrx-auto-entity';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Order } from 'models/order.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Go } from './router/router.actions';

@Injectable()
export class OrderEffects {
  @Effect()
  createSuccess$: Observable<Action> = this.actions$.pipe(
    ofEntityType(Order, EntityActionTypes.CreateSuccess),
    tap(() => this.matSnackBar.open('Order Created', 'Success', { duration: 2000 })),
    map(() => new Go({ path: ['orders'] }))
  );

  @Effect({ dispatch: false })
  deleteSuccessSnackBar$ = this.actions$.pipe(
    ofEntityType(Order, EntityActionTypes.DeleteSuccess),
    tap(() => this.matSnackBar.open('Order Deleted', 'Success', { duration: 2000 }))
  );

  @Effect()
  updateSuccessSnackBar$ = this.actions$.pipe(
    ofEntityType(Order, EntityActionTypes.UpdateSuccess),
    tap(() => this.matSnackBar.open('Order Updated', 'Success', { duration: 2000 })),
    map(() => new Go({ path: ['orders'] }))
  );

  constructor(private actions$: Actions, private ops: EntityOperators, private matSnackBar: MatSnackBar) {}
}
