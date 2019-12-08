# NgRX Auto-Entity

Automatic entities for [@ngrx](https://github.com/ngrx/platform)! With this library, you can take the weight off your plate, and
get back to business!

## What is it?

NgRX Auto-Entity aims to provide a seamless means of dealing with standard entity actions and
effects with minimal repetitive code requirements, while preserving the fundamental nature of
NgRX itself. This library is not a replacement for or alternative to NgRX. It works within the
standard paradigm that NgRX has set forth, making use of actions, reducers & effects like any
other NgRX application.

What Auto-Entity does do is provide a set of ready-made, generic actions for handling all of
the standard CRUD operations for entities, so you neither have to write nor generate any of that
code yourself. Auto-Entity presents a flexible framework that you may use in its entirety for
all of your entity needs, or use piecemeal as necessary in order to achieve your specific goals.

While it is not required and Auto-Entity is an entirely independent library that solely depends
on Angular 6 and NgRX 6, Auto-Entity manages state in a manner that is compatible with @ngrx/entity
as well, in the event you wish to utilize some of the utilities from that library in your own
custom reducers.

# Installation

Install @briebug/ngrx-auto-entity from npm:

`npm install @briebug/ngrx-auto-entity` or `yarn add @briebug/ngrx-auto-entity`

If you have not already, install the required peer dependencies as well:

`npm install @ngrx/{effects,store,store-devtools} ngrx-store-freeze` or `yarn add @ngrx/{effects,store,store-devtools} ngrx-store-freeze`

# Setup

While Auto-Entity aims to provide a minimal boilerplate platform for handling entities, it does
require some basic setup. As with any Angular module, it must be imported into your application:

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

#### Composite Keys

While composite key support for more advanced applications is on our roadmap, at the current
time composite keys are not directly supported. As one of our goals is to maintain internl
compatibility with @ngrx/entity where possible, we are thinking hard on how to support
composite keys (i.e. apply `@Key` to multiple properties on a model) while maintaining
the standard internal state structure of entity map/id array.

### Services

The model class must then have a companion service created to handle all of the standard
CRUD operations. This service must implement the `IAutoEntityService<TModel>` interface:

```typescript
export interface IAutoEntityService<TModel> {
  load?(entityInfo: IEntityInfo, keys: any, criteria?: any): Observable<TModel>;

  loadAll?(entityInfo: IEntityInfo, criteria?: any): Observable<TModel[]>;

  loadPage?(entityInfo: IEntityInfo, page: Page, criteria?: any): Observable<IEntityWithPageInfo<TModel>>;

  loadRange?(entityInfo: IEntityInfo, range: Range, criteria?: any): Observable<IEntityWithRangeInfo<TModel>>;

  create?(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<TModel>;

  update?(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<TModel>;

  replace?(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<TModel>;

  delete?(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<TModel>;
}
```

The methods of this interface are optional, however, so only implement what you need for
each entity:

```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAutoEntityService, IEntityInfo } from 'ngrx-auto-entity';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { Customer } from 'models/customer.model';
import { environment } from 'environments/environment';

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

  delete(entityInfo: IEntityInfo, entity: Customer): Observable<Customer> {
    return this.http.delete<Customer>(`${this.url}/${entity.id}`).pipe(map(() => entity));
  }
}
```

Entity services are flexible, and may communicate with any API, third party service,
or even local data storage. Whatever may be necessary for your application. We
require only that services return rxjs `Observable`, which are very flexible
and may be created from promises or raw data if or mapped from other observables necessary.

### Advanced Services

Auto-Entity provides a fairly broad range of standard service operations that can be implemented. While
all operations are optional in the IAutoEntityService<TModel> interface, you must implement all
operations that are necessary for the actions you intend to use. If you only intend to use Load, then
you are only required to implement the load() method.

#### Update vs. Replace

In addition to your basic retrieval and CUD operations, we also support a few additional methods. In
an attempt to support current HTTP standards, we have both an `update` as well as a `replace` method
in the service interface. While historically `update` has effectively been synonymous with PUT in all
cases, actual standards-based PUT semantics imply that a PUT replaces the object. The new PATCH is
intended to be used when an update may be partial or explicitly directed.

#### Pages & Ranges

We also provide built-in support for paged data as well as ranged retrievals. Paged data is data that
is only loaded from the server one page at a time, rather than an entire collection pre-loaded
into the browser first, then paging and other operations performed locally within the browser. This
is not only common but also often quite necessary when dealing with larger data sets. Since entire
large data sets may not be fully loaded into memory, use of paged loads will always replace any
previously loaded state for any prior page with the information for the newly loaded page. Make sure
you account for these semantics in your implementations.

// TODO: Add examples of paging operations

Ranged retrievals support things like retrieval by non-key ranges, infinite scrolling, etc. Unlike
paged loads, ranged retrievals support adding additional entities to existing entities already in
state. Ranged retrieval may be done with first/last, start/end, or skip/take semantics. For the
former two, the values may currently be number, string, or date. For the latter, only numbers
are supported.

// TODO: Add examples of range retrieval operations

#### Custom Criteria

Finally, to support any arbitrary means of data retrieval, including hierarchical data structures
and lookup as well as third-party data services, we provide an optional `criteria` property
for all initiating (i.e. non-success, non-failure: Load<TModel>, Create<TModel>, etc.) actions.
This property is an arbitrary key, array or map of keys, that can be used to pass along custom
lookup or search criteria, reference parent or foreign keys, etc. in any way the developer requires.

As a basic example, consider a set of orders looked up by their parent customer. You may have
a REST API endpoint like so:

`/api/v1/customers/:customerId/orders?startDate&endDate`

And perhaps also:

`/api/v1/orders?startDate&endDate`

There are three potential criteria here: The _customerId_, the _startDate_ and the _endDate_.

All orders..."by customer" and "within a given date range", may be looked up like so:

```typescript
this.store.dispatch(new LoadAll(Order, { customerId: 101, startDate: '2018-08-01', endDate: '2018-08-31' }));
```

The Orders service is then provided any criteria included in the original dispatch:

```typescript
@Injectable()
export class OrderService implements IAutoEntityService<Order> {
  // ...

  loadAll(entityInfo: IEntityInfo, criteria: any): Observable<Order[]> {
    const url =
      criteria && criteria.customerId
        ? `/customers/${criteria.customerId}/orders` // Get only customer order if requested
        : '/orders'; // Otherwise get all orders for all customers

    const params = criteria
      ? new HttpParams({
          fromObject: {
            ...criteria, // Bind the rest of the criteria to http parameters for query string
            customerId: undefined // Remove this from the params, we don't want it in the query string
          }
        })
      : null;

    return this.http.get<Order[]>(url, { params });
  }

  // ...
}
```

#### Shared Services

If you have a simple API you consume for your application, it may not be necessary to implement
unique services for each entity. If you follow a strict convention for every model, you may be
able to use a single service. We provide `IEntityInfo` in the entityInfo parameter of each
service method. This contains the `modelName` as a string and the actual `modelType` class reference.

The model information may be used to dynamically build URLs in a single service implementation:

```typescript
@Injectable()
export class EntityService implements IAutoEntityService<any> {
  load(entityInfo: IEntityInfo, id: any): Observable<any[]> {
    const url = `/api/v1/${entityInfo.modelName}/${id}`;
    return this.http.get<any[]>(url);
  }

  loadAll(entityInfo: IEntityInfo): Observable<any[]> {
    const url = `/api/v1/${entityInfo.modelName}`;
    return this.http.get<any[]>(url);
  }

  create(entityInfo: IEntityInfo, entity: any): Observable<any[]> {
    const url = `/api/v1/${entityInfo.modelName}`;
    return this.http.post<any[]>(url, entity);
  }

  update(entityInfo: IEntityInfo, entity: any): Observable<any[]> {
    const url = `/api/v1/${entityInfo.modelName}/${entity.id}`;
    return this.http.patch<any[]>(url, entity);
  }

  replace(entityInfo: IEntityInfo, entity: any): Observable<any[]> {
    const url = `/api/v1/${entityInfo.modelName}/${entity.id}`;
    return this.http.put<any[]>(url, entity);
  }

  delete(entityInfo: IEntityInfo, entity: any): Observable<any[]> {
    const url = `/api/v1/${entityInfo.modelName}/${entity.id}`;
    return this.http.delete<any[]>(url);
  }
}
```

### Providers

The next setup required to support the auto-magical nature of Auto-Entity is properly
registering the providers for each entity. As Angular already integrates an injector
with basic provider vs. implementation mapping, we simply leverage that to support
runtime lookup of the appropriate service for any given entity:

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

#### Shared Service Providers

If you are utilizing a shared service, simply register each model with the same useClass:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgrxAutoEntityModule } from 'ngrx-auto-entity';

import { AppComponent } from './app.component';

import { Customer, Order, OrderLine, Account } from 'models';
import { EntityService } from 'services/entity.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgrxAutoEntityModule],
  providers: [
    { provide: Customer, useClass: EntityService },
    { provide: Order, useClass: EntityService },
    { provide: OrderLine, useClass: EntityService },
    { provide: Account, useClass: EntityService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Since the actual class for the entity model is also provided, this offers further opportunity
to extend and customize your service behavior. You may add static properties to your classes
that could be used within your entity services to direct how they behave, provide config, etc.

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
  selectAll: allCustomers,
  selectEntities: customerEntities,
  selectIds: customerIds,
  selectTotal: totalCustomers
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
  selectAll: allCustomers,
  selectEntities: customerEntities,
  selectIds: customerIds,
  selectTotal: totalCustomers
} = selectors;

export const selectedCustomerId = createSelector(entityState, state => state.selectedCustomerId);

export const selectedCustomer = createSelector(
  customerEntities,
  selectedCustomerId,
  (entities, selectedCustomerId) => entities && entities[selectedCustomerId]
);

export const customerIsLoading = createSelector(entityState, state => state.loading);

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
import { IAppState } from './app.state';

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
import { IAppState } from './app.state';

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

This will register all of the necessary effects to handle initial service calls, as well
as dispatch success or failure actions in response to those service calls. With standard
effects, important errors caused by failed service calls will be surfaced to the browser
console in a developer-friendly manner.

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
- UpdateEffect (PATCH)
- -ReplaceEffect- (PUT): Not yet implemented
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
  ]
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
  ]
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

The next line after the `ofEntityType` call is a little more unusual. Since our entity operator
effects rely on Angular services, they must be included in an Angular class so the standard
injector will function properly.

If you require the ability to pre-format or inject content on a model, for example, before it is updated
through a REST API, a custom effect like the above is an ideal opportunity:

```typescript
  @Effect()
  update$ = this.actions$.pipe(
    ofEntityType(Customer, EntityActionTypes.Update),
    filter(() => !!sessionStorage.getItem('currentUsername')), // Don't update if user is not known
    map((action: Update<Customer>) => ({ // Merge in updating user info
      ...action,
      entity: {
        ...action.entity,
        updatedBy: sessionStorage.getItem('currentUsername'),
        updatedAt: moment().format()
      }
    })),
    this.ops.update()
  );

  constructor(actions: Actions, ops: EntityOperators) {}
```

For fully custom effects, the only change that must be made is to replace `ofType` with `ofEntityType`.
Otherwise, effect implementation would follow standard practices.

If you need the ability to create effects that handle all Auto-Entity actions of a given type, you may
use the `ofEntityAction`, which allows you to filter by just Auto-Entity actions without the
additional model type requirement.

# Using the Actions

Now that everything is set up, which if you are creating a simpler application, should only
require a few minutes of your time, it's time to get down to business. The main use case
for any action is to dispatch them.

While dispatching actions is fairly straightforward and pretty standard, there are some
very slight differences in how Auto-Entity actions are dispatched. The most notable
trait is the way the model is passed as an argument to the action. While possibly a
little quirky, this is actually fundamental to how Auto-Entity is able to automatically
figure out how to actually make the right service calls. By passing in the **class**,
you are providing all the necessary information about the model to the library, at runtime.

## The Basics: Load and LoadAll

For a simple load by primary key, use the `Load<TModel>` action. You must pass both the
model, as well as a key for the entity. Exactly what you pass for the key is up to you,
the developer. You can simply pass the key as a value, or pass the key as a property of
an object. You could even pass a function. In the end, it is your own service code that
will actually be using whatever you pass for the key.

```typescript
this.store.dispatch(new Load(Customer, 101));
this.store.dispatch(new Load(Customer, { id: 101 }));
this.store.dispatch(new Load(Customer, () => this.customerId));
```

If you require additional criteria in order to look up the desired entities, you may
provide that with the optional criteria parameter. To borrow from a prior example, using
the `LoadAll<TModel>` action:

```typescript
this.store.dispatch(new LoadAll(Order, { customerId: 101 }));
```

## Paged & Range Loads

If you are working with large data sets and cannot preload all of the entities into
browser memory, we provide two alternative ways of loading data sets. You can either
use `LoadPage<TModel>` or `LoadRange<TModel>`.

### Paged Data

Loading a page requires some additional information, notably the page to load and the
size of each page. As with all initiating actions, you can optionally include custom
criteria:

```typescript
this.store.dispatch(new LoadPage(Order, { page: 1, size: 25 }));
this.store.dispatch(new LoadPage(Order, { page: 1, size: 25 }, { customerId: 101 }));
```

Paging data involves specific semantics to how the state is handled. Any time a page
is loaded, any data previously stored in that entities state (entities/ids) will be
cleared, and replaced with the new page. This is by design, to maintain memory efficiency
when working with very large data sets. Make sure you account for this when implementing
your code, and if you need to edit an entity, make sure you either save it before loading
another page, provide warnings to the user about loading a different page with unsaved
changes, etc.

### Range Data

If the paging behavior described here is undesired, then ranging may be more appropriate
for your application. The primary use case for ranged loads is infinite scrolling. You
may load the first 20 records, then the next 20, then the next 20, and keep adding to
the previously loaded entities stored in state. With careful use, ranged loads may also
be used to keep previously loaded data in state when loading subsequent pages.

```typescript
this.store.dispatch(new LoadRange(OrderLine, { skip: 10, take: 10 }));
this.store.dispatch(new LoadRange(OrderLine, { skip: page * size, take: size }));
this.store.dispatch(new LoadRange(Order, { start: '2018-08-01', end: '2018-08-07' }));
this.store.dispatch(new LoadRange(Item, { first: 'G%', last: 'J%' }, { dateAddedToCatalog: '2018-07-31' }));
```

Note the last couple examples of LoadRange above. The first makes use of alternate
range criteria, in this case start and end dates, the second makes use of first and
last characters. Also note that additional custom criteria may always be used with
paged or ranged loads.

### Range Types

Ranges can be passed in one of three forms: start/end, first/last, or skip/take. The
first two allow numbers, strings, or Dates to be used. The latter, skip/take, requires
numbers for both. Arbitrary Range models are not supported here, so make sure you
use one of these three structures.

#### Service Support for Page and Range

Properly handling paged or range data requires some additional work in your services.
We will go more into those details later on in this documentation.

## Creating, Updating/Replacing and Deleting

In addition to all of the options for loading data, Auto-Entity also provides the
necessary actions for creating, updating & replacing, and of course deleting entities.
These actions are pretty strait forward, but still use the same pass-the-model approach
of the load actions.

### Create an Entity

To create a new entity, dispatch the `Create<TModel>` action. You must provide the
model class of the entity you wish to create, as well as the instance of the model
you wish to create. Optionally, you may provide custom criteria,
which may be used to identify parent or foreign key relationships not directly stored
on the model, or utilized only within an API URL, etc.

```typescript
this.store.dispatch(new Create(Customer, this.customer));
this.store.dispatch(new Create(Order, this.order, { customerId: this.customer.id }));
this.store.dispatch(
  new Create(OrderLine, this.orderItem, {
    itemId: this.item.id,
    orderId: this.order.id
  })
);
```

### Update & Replace Entities

Supporting modern HTTP and REST standards, we provide both `Update<TModel>` as well as
`Replace<TModel>` actions. These support both PUT semantics, which imply that the entity
being "put" must be **replaced** entirely, as well as PATCH semantics which implies that
the entity may be updated in part, either as a data merger of the **updated** entity with
existing data, or via the execution of individual update actions to augment the existing
data (i.e. a MongoDB update with $set, etc.)

```typescript
this.store.dispatch(new Replace(Customer, this.customer));
this.store.dispatch(new Update(Customer, this.customerChanges));
this.store.dispatch(new Update(Order, this.order, { customerId: this.customer.id }));
```

As always, custom criteria is supported if any additional information must be passed
to the service.

### Deleting Entities

Finally, we support deletes. Deletes are pretty simple, requiring only the entity and
optionally any custom criteria:

```typescript
this.store.dispatch(new Delete(OrderItem, this.orderItem, { orderId: this.order.id }));
```

##
