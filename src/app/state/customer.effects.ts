import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Delete, EntityActionTypes, EntityOperators, ofEntityType, Update } from '@briebug/ngrx-auto-entity';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Customer } from 'models/customer.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Go } from './router/router.actions';

@Injectable()
export class CustomerEffects {
  @Effect()
  createSuccess$: Observable<Action> = this.actions$.pipe(
    ofEntityType(Customer, EntityActionTypes.CreateSuccess),
    tap(() => this.matSnackBar.open('Customer Created', 'Success', { duration: 2000 })),
    map(() => new Go({ path: ['customers'] }))
  );

  @Effect({ dispatch: false })
  deleteSuccessSnackBar$ = this.actions$.pipe(
    ofEntityType<Customer, Delete<Customer>>(Customer, EntityActionTypes.DeleteSuccess),
    tap(() => this.matSnackBar.open('Customer Deleted', 'Success', { duration: 2000 }))
  );

  @Effect()
  updateSuccessSnackBar$ = this.actions$.pipe(
    ofEntityType<Customer, Update<Customer>>(Customer, EntityActionTypes.UpdateSuccess),
    tap(() => this.matSnackBar.open('Customer Updated', 'Success', { duration: 2000 })),
    map(() => new Go({ path: ['customers'] }))
  );

  constructor(private actions$: Actions, private ops: EntityOperators, private matSnackBar: MatSnackBar) {}
}
