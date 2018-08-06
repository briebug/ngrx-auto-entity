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

`npm install @briebug/ngrx-auto-entity or yarn add @briebug/ngrx-auto-entity`

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

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://facebook.github.io/jest/).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
