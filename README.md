[![CircleCI](https://circleci.com/gh/briebug/ngrx-auto-entity/tree/develop.svg?style=svg&circle-token=d1d500027a81dda34d4ad75ae5fee38dd8953487)](https://circleci.com/gh/briebug/ngrx-auto-entity/tree/develop)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

# NgRX Auto-Entity

Automatic entities for @ngrx! With this library, you can take the boiler off your plate, and
get back to business.

## What is it?

NgRX Auto-Entity aims to provide a seamless means of dealing with standard entity actions and
effects with minimal repetitive code requirements, while preserving the fundamental nature of
NgRX itself. This library is not a replacement for or alternative to NgRX. It works within the
standard paradigm that NgRX has set forth, making use of actions, reducers & effects like any
other NgRX application.

What Auto-Entity does do, is provide a set of ready-made, generic actions for handling all of
the standard CRUD operations for entities, so you neither have to write nor generate any of that
code yourself. Auto-Entity presents a flexible framework that you may use in it's entirety for
all of your entity needs, or use piecemeal as necessary in order to achieve your specific goals.

While it is not required and Auto-Entity is an entirely independent library that solely depends
on Angular 6 and NgRX 6, Auto-Entity manages state in a manner that is compatible with @ngrx/entity
as well, in the event you wish to utilize some of the utilities from that library in your own
custom reducers.

# Installation

Install @briebug/ngrx-auto-entity from npm:

`npm install @briebug/ngrx-auto-entity` or `yarn add @briebug/ngrx-auto-entity`

# Setup

While Auto-Entity aims to provide a minimal boilerplate platform for handling entities, it does
require some minimal setup. As with any Angular module, it must be imported into your application:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgrxAutoEntityModule } from 'ngrx-auto-entity';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgrxAutoEntityModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## Changes to Service Providers

For Auto-Entity to function properly at runtime, some minor changes must be made to how you
normally provide your services. Auto-Entity is capable of automatically mapping actions for
a given entity to the appropriate angular service that handles the standard CRUD operations
(against a web API, local database, etc.)

As models and services are standard elements of any Angular application, there should be no
additional boilerplate code to implement here. These would be implemented regardless. However,
be aware of the nuanced changes in how the model and service are used, and the explicit
interface requirement for the service.

### Models

First, in order for this automatic mapping to work, we must use classes rather than interfaces
for all entity models. Unlike an interface, which has only compile-time semantics that is
ultimately stripped from the compiled module, a class _exists at runtime_.

```typescript
import { Key } from 'ngrx-auto-entity';

export class Customer {
  @Key id: number;
  name: string;
}
```

Note the use of the `@Key` decorator here. This identifies which property of the model
represents the uniquely identifying key. Auto-Entity will utilize this knowledge later
on to achieve some of the "magic" of automatically managing entity state for you.

### Services

The model class must then have a companion service created to handle all of the standard
CRUD operations. This service must implement the `IAutoEntityService<TModel>` interface:

```typescript
export interface IAutoEntityService<TModel> {
  load?(entityInfo: IEntityInfo, keys: any, relationKeys?: any): Observable<TModel>;

  loadAll?(entityInfo: IEntityInfo, relationKeys?: any): Observable<TModel[]>;

  loadPage?(entityInfo: IEntityInfo, page: Page, relationKeys?: any): Observable<IEntityWithPageInfo<TModel>>;

  loadRange?(entityInfo: IEntityInfo, range: Range, relationKeys?: any): Observable<IEntityWithRangeInfo<TModel>>;

  create?(entityInfo: IEntityInfo, entity: TModel, relationKeys?: any): Observable<TModel>;

  update?(entityInfo: IEntityInfo, entity: TModel, relationKeys?: any): Observable<TModel>;

  replace?(entityInfo: IEntityInfo, entity: TModel, relationKeys?: any): Observable<TModel>;

  delete?(entityInfo: IEntityInfo, entity: TModel, relationKeys?: any): Observable<TModel>;
}
```

The methods of this interface are optional, however, so only implement what you need for
each entity:

```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'models/customer.model';
import { IAutoEntityService, IEntityInfo } from 'ngrx-auto-entity';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class CustomerService implements IAutoEntityService<Customer> {
  static readonly PATH = '/customers';
  readonly url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.API_BASE_URL}${CustomerService.PATH}`;
  }

  load(entityInfo: IEntityInfo, id: any): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}/${id}`);
  }

  loadAll(entityInfo: IEntityInfo): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.url}`);
  }

  create(entityInfo: IEntityInfo, entity: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.url}`, entity);
  }

  update(entityInfo: IEntityInfo, entity: Customer): Observable<Customer> {
    return this.http.patch<Customer>(`${this.url}/${entity.id}`, entity);
  }

  replace(entityInfo: IEntityInfo, entity: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.url}`, entity);
  }

  delete(entityInfo: IEntityInfo, entity: Customer): Observable<Customer> {
    return this.http.delete<Customer>(`${this.url}/${entity.id}`).pipe(map(() => entity));
  }
}
```

### Providers

The final step in supporting the auto-magical of Auto-Entity is properly registering the providers for
each entity. As Angular already integrates an injector with basic provider vs. implementation mapping,
we simply leverage that to support runtime lookup of the appropriate service for any given entity:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgrxAutoEntityModule } from 'ngrx-auto-entity';

import { AppComponent } from './app.component';

import { Customer } from 'models/customer.model';
import { CustomerService } from 'services/customer.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgrxAutoEntityModule],
  providers: [{ provide: Customer, useClass: CustomerService }],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

For Auto-Entity models and services, you must map the model, in our example here `Customer`, as the
`provider`, to the service, in our example here `CustomerService`, via `useClass`. As all actions are
initiated with knowledge of only the model, this mapping allows Auto-Entity to find and retrieve an
instance of the appropriate service at runtime for any given model.

## Per-entity State

Now that we have our models and services, it is time to prepare our state. As one of our primary
tenants for Auto-Entity is to follow standard NgRX practices, creating state is the same as it has
always been. You must still define a state property for your entity, and must still map a reducer
to that state in the reducer map.

### The Entity State Interface

We provide a standard interface for entity states, `IEntityState<TModel>`, that any state interfaces
for auto entities should extend:

```typescript
import { IEntityState } from 'ngrx-auto-entity';

import { Customer } from 'models/customer.model';

export interface ICustomerEntityState extends IEntityState<Customer> {
  loading: boolean;
  selectedCustomerId: number;
}
```

If you wish to include additional state, as with @ngrx/entity, you may. If you require no additional
custom state, then a custom interface is unnecessary, and you may simply utilize the generic
`IEntityState<TModel>` interface where necessary.

### The Entity State Reducer

The next standard piece of code you must implement is the reducer. In order to maintain compatibility
with how NgRX is implemented in a standard application, as much as we would have liked to eliminate this
step, a reducer...even an empty one...is still necessary. If you require the most bare-bones of entity
functionality, the most minimal of reducers may be used:

```typescript
import { Customer } from 'models/customer.model';
import { EntityActions, IEntityState } from 'ngrx-auto-entity';

// ...

export function customerReducer(state = initialState, action: EntityActions<Customer>): IEntityState<Customer> {
  return state;
}
```

Auto-Entity provides a handy little utility, `buildState`, that can be used to create the initial state,
standard selectors, as well as an optional root selector for the entity state in the event you need to
create custom selectors of your own. At it's simplest, you may prepare and retrieve the initial state
for an entity like so:

```typescript
import { Customer } from 'models/customer.model';
import { buildState } from 'ngrx-auto-entity';

const { initialState } = buildState(Customer);

export function customerReducer(
  state = initialState,
  // ...
```

The `buildState` utility also provides you with the standard set of selectors for retrieving your entities
from your state as well. You may retrieve those, then optionally re-export them with different names,
like so:

```typescript
import { Customer } from 'models/customer.model';
import { buildState } from 'ngrx-auto-entity';

const { initialState, selectors } = buildState(Customer);

export const {
  selectAll: selectAllCustomers,
  selectEntities: selectCustomerEntities,
  selectIds: selectCustomerIds,
  selectTotal: selectTotalCustomers
} = selectors;

// ...
```

Finally, if you need custom selectors, the `buildState` utility will also return the root `entityState`
selector for you as well. To put together a full example of custom selectors and the reducer for our
Customer entity:

```typescript
import { createSelector } from '@ngrx/store';
import { Customer } from 'models/customer.model';
import { buildState, EntityActionTypes } from 'ngrx-auto-entity';

import { ICustomerEntityState } from 'state/customer/customer.state';
import { CustomerActions, CustomerActionType, SelectCustomer } from './customer.actions';

const { initialState, selectors, entityState } = buildState(Customer);

export const {
  selectAll: selectAllCustomers,
  selectEntities: selectCustomerEntities,
  selectIds: selectCustomerIds,
  selectTotal: selectTotalCustomers
} = selectors;

export const selectSelectedCustomerId = createSelector(entityState, state => state.selectedCustomerId);

export const selectSelectedCustomer = createSelector(
  selectCustomerEntities,
  selectSelectedCustomerId,
  (entities, selectedCustomerId) => entities && entities[selectedCustomerId]
);

export const selectCustomerIsLoading = createSelector(entityState, state => state.loading);

export function customerReducer(
  state: ICustomerEntityState = initialState,
  action: CustomerActions
): ICustomerEntityState {
  switch (action.type) {
    case CustomerActionType.SelectCustomer:
      return {
        ...state,
        selectedCustomerId: (action as SelectCustomer).payload.id
      };
    case EntityActionTypes.Update:
      return {
        ...state,
        loading: true
      };
    case EntityActionTypes.UpdateSuccess:
      return {
        ...state,
        loading: false
      };
    default: {
      return state;
    }
  }
}
```

Note how seamlessly custom actions for handling loading state as well as a custom `selectedCustomerId`
state have been integrated into the otherwise automatic Customer entity. Any Auto-Entity action may
be reduced within your custom reducers if necessary, simply by combining EntityActionTypes with your own
custom actions:

```typescript
import { Action } from '@ngrx/store';
import { Customer } from 'models/customer.model';
import { EntityActions } from 'ngrx-auto-entity';

export enum CustomerActionType {
  SelectCustomer = '[Customer] Select customer'
}

export class SelectCustomer implements Action {
  readonly type = CustomerActionType.SelectCustomer;

  constructor(public payload: { id: number }) {}
}

export type CustomerActions = EntityActions<Customer> | SelectCustomer;
```

We hope that this seamless integration of custom and pre-fabricated entity behavior within a single
piece of state provides a nearly effortless transition to using Auto-Entity in your projects. Since
each entity is still managed the same way with regards to root state/reducerMap, you may even start
adding Auto-Entity to an application that already uses @ngrx/entity, or just plain old NgRX without
any other entity framework.

### State and Reducer Map

As a final step, do not forget to register your state:

```typescript
import { ICustomerEntityState } from 'state/customer/customer.state';

export interface IAppState {
  customer: ICustomerEntityState;
}

export type State = IAppState;
```

And map your reducer to your state:

```typescript
import { ActionReducerMap } from '@ngrx/store';

import { customerReducer } from 'state/customer/customer.reducer';
import { IAppState } from './app.interfaces';

export const appReducer: ActionReducerMap<IAppState> = {
  customer: customerReducer
};
```

Auto-Entity requires one final piece of registration to ensure that all standard reductions
for automatic entities are properly handled. The `autoEntityMetaReducer` must be added to your
meta reducers. Make sure you include it for production as well:

```typescript
import { MetaReducer } from '@ngrx/store';
import { autoEntityMetaReducer } from 'ngrx-auto-entity';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';
import { IAppState } from './app.interfaces';

// ...

export const appMetaReducers: Array<MetaReducer<IAppState>> = !environment.production
  ? [autoEntityMetaReducer, storeFreeze]
  : [autoEntityMetaReducer];
```

This meta reducer handles all standard reduction for all success actions for automatic
entities. It will store the entity state in the same internal structure as @ngrx/entity,
with all identities (as defined by the @Key decorator, described above in the model section)
stored in an `ids` array, and each identity mapped to each full entity in an `entities` map.

## Effects

Not to be left out, effects are the final bit of magic required for Auto-Entity to handle
your entity actions for you. If you do not require any custom functionality, then the final
configuration required to get you rolling would be to add the `EntityEffects` class to your
state entities:

```typescript
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { EntityEffects, EntityOperators } from 'ngrx-auto-entity';
import { CustomerEffects } from 'state/customer/customer.effects';

@NgModule({
  imports: [
    // ...
    EffectsModule.forRoot([EntityEffects, CustomerEffects])
    // ...
  ]
})
export class StateModule {
  // ...
}
```

### Advanced Effects

In the event that you require more control over the side effects for your entities, we
offer a variety of ways of dealing with effects in Auto-Entity. In most cases, you
should be able to register the standard EntityEffects, and leave it at that. If you need
to handle certain side effects yourself, we provide a flexible set of pre-made effects
classes, as well as a handy set of rxjs operators in `EntityOperators`, so that you may handle
entity effects yourself.

There are several standard effects classes included with Auto-Entity. You may register
only the load effects, only the CUD (create, update, delete) effects, or individually
register the effect for each side effect as necessary:

- LoadEffects: All load effects
- LoadEffect (GET/single)
- LoadAllEffect (GET/all)
- LoadPageEffect (GET/many)
- LoadRangeEffect (GET/many)
- CUDEffects: All CUD -CURD- effects
- CreateEffect (POST)
- UpdateEffect (PUT)
- -ReplaceEffect- (PATCH): Not yet implemented
- DeleteEffect (DELETE)

Simply register the effects class(es) you wish to have Auto-Entity handle for you. Any
remaining effects you may handle yourself, either 100% custom, or integrating with our
ready-made entity operators in your own effects pipes.

To handle all CUD operations yourself:

```typescript
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { LoadEffects, EntityOperators } from 'ngrx-auto-entity';
import { CustomerEffects } from 'state/customer/customer.effects';

@NgModule({
  imports: [
    // ...
    EffectsModule.forRoot([LoadEffects, CustomerEffects])
    // ...
  ],
  declarations: [],
  providers: [EntityOperators]
})
export class StateModule {
  // ...
}
```

To handle deletions and single loads yourself, and let LoadAll, Create and Update be handled
automatically, ignoring page and range effects:

```typescript
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { LoadAllEffect, CreateEffect, UpdateEffect, EntityOperators } from 'ngrx-auto-entity';
import { CustomerEffects } from 'state/customer/customer.effects';

@NgModule({
  imports: [
    // ...
    EffectsModule.forRoot([LoadAllEffect, CreateEffect, UpdateEffect, CustomerEffects])
    // ...
  ],
  declarations: [],
  providers: [EntityOperators]
})
export class StateModule {
  // ...
}
```

Note that if you need more piecemeal control over effects for each entity, try using separate
modules for each entity or group of entities that require different handling of effects, and
utilize the feature state functionality of NgRx.

### Custom Effects

If you require the utmost control over your effects, you may handle the necessary actions yourself
in your own effects classes. You can either implement the necessary functionality 100% yourself,
or leverage the `EntityOperators` to allow Auto-Entity to handle service lookup and call as well
as dispatch of success or failure for you.

```typescript
  @Effect()
  update$ = this.actions$.pipe(
    ofEntityType(Customer, EntityActionTypes.Update),
    this.ops.update()
  );

  constructor(actions: Actions, ops: EntityOperators) {}
```

When handling an effect on your own, we provide an `ofEntityType` operator. This is very much
akin to the standard ngrx `ofType` operator, only extended to support filtering by both an
action as well as a specific entity model. In the case of our example, the `Customer` model.

The next line after the `ofEntityType` call is a little more unusual. Since our entity opperator
effects rely on Angular services, they must be included in an Angular class so the standard
injector will function properly.

If you require the ability to pre-format or inject content on a model, for example, before it is updated
through a REST API, a custom effect like the above is an ideal opportunity:

```typescript
  @Effect()
  update$ = this.actions$.pipe(
    ofEntityType(Customer, EntityActionTypes.Update),
    map((action: Update<Customer>) => ({
      ...action,
      entity: {
        ...action.entity,
        updatedBy: localStorage.getItem('currentUsername'),
        updatedAt: moment().format()
      }
    })),
    this.ops.update()
  );

  constructor(actions: Actions, ops: EntityOperators) {}
```

For fully custom effects, the only change that must be made is to replace `ofType` with `ofEntityType`.

If you need the ability to create effects that handle all Auto-Entity actions of a given type, you may
use the `ofEntityAction`, which allows you to filter by just Auto-Entity actions without the
additional model type requirement.
