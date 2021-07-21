import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Create, CreateSuccess, EntityActionTypes, EntityOperators, ofEntityType, Update, UpdateSuccess } from '@briebug/ngrx-auto-entity';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AccountFacade } from 'facades/account.facade';
import { Account } from 'models/account.model';
import { OrderItem } from 'models/order-item.model';
import { Order } from 'models/order.model';
import { Observable, of } from 'rxjs';
import { filter, map, mergeMap, take, tap } from 'rxjs/operators';
import { PartialPick } from 'shared/types/util.type';
import { AppState } from 'state/app.state';
import { upsertFullOrder } from 'state/order.state';

@Injectable()
export class OrderEffects {
  createSuccess$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofEntityType(Order, EntityActionTypes.CreateSuccess),
        tap(() => this.matSnackBar.open('Order Created', 'Success', { duration: 2000 }))
      ),
    { dispatch: false }
  );

  deleteSuccessSnackBar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofEntityType(Order, EntityActionTypes.DeleteSuccess),
        tap(() => this.matSnackBar.open('Order Deleted', 'Success', { duration: 2000 }))
      ),
    { dispatch: false }
  );

  updateSuccessSnackBar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofEntityType(Order, EntityActionTypes.UpdateSuccess),
        tap(() => this.matSnackBar.open('Order Updated', 'Success', { duration: 2000 }))
      ),
    { dispatch: false }
  );

  upsertFullOrder$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(upsertFullOrder),
        // Create account if needed
        mergeMap(({ order, orderItems, correlationId }) => {
          if (order.accountId) {
            return of({ order, orderItems, correlationId });
          } else {
            this.store.dispatch(new Create(Account, AccountFacade.getNewPersonalTab(order.customerId), undefined, correlationId));

            return this.actions$.pipe(
              ofEntityType(Account, EntityActionTypes.CreateSuccess),
              filter((success: CreateSuccess<Account>) => correlationId === success.correlationId),
              take(1),
              map((success: CreateSuccess<Account>) => ({
                order: { ...order, accountId: success.entity.id },
                orderItems,
                correlationId
              }))
            );
          }
        }),
        // Create/update order
        tap(({ order, correlationId }) => {
          if (order.id) {
            this.store.dispatch(new Update(Order, order, undefined, correlationId));
          } else {
            this.store.dispatch(new Create(Order, order, undefined, correlationId));
          }
        }),
        // Create/update orderItems
        mergeMap(({ orderItems, correlationId }) => {
          return this.actions$.pipe(
            ofEntityType(Order, EntityActionTypes.CreateSuccess, EntityActionTypes.UpdateSuccess),
            filter((success: CreateSuccess<Order> | UpdateSuccess<Order>) => correlationId === success.correlationId),
            take(1),
            tap((success: CreateSuccess<Order> | UpdateSuccess<Order>) => {
              orderItems.forEach((item: PartialPick<OrderItem, 'orderId' | 'id'>) => {
                const payload: OrderItem = {
                  id: undefined,
                  ...item,
                  orderId: success.entity.id
                };

                if (payload.id) {
                  this.store.dispatch(new Update(OrderItem, payload, undefined, correlationId));
                } else {
                  this.store.dispatch(new Create(OrderItem, payload, undefined, correlationId));
                }
              });
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions, private ops: EntityOperators, private matSnackBar: MatSnackBar, private store: Store<AppState>) {}
}
