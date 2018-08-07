# NgRX Auto-Entity

Automatic entities for [@ngrx](https://github.com/ngrx/platform)! With this library, you can take the boiler off your plate, and
get back to business!

# Quick Start

One of the primary goals with Auto-Entity is to provide a rapid development platform
with minimal boilerplate requirements and easy setup. For those developers who wish
to get rolling as quickly as possible, this guide should get you going fast!

## Installation

Install @briebug/ngrx-auto-entity from npm:

`npm install @briebug/ngrx-auto-entity` or `yarn add @briebug/ngrx-auto-entity`

## Setup

### 1: App Module

Add the `NgrxAutoEntityModule` to your app module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgrxAutoEntityModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### 2: Meta Reducer

Add the autoEntityMetaReducer to your meta reducers for your application or
feature:

```typescript
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { autoEntityMetaReducer } from '@briebug/ngrx-auto-entity';
import { storeFreeze } from 'ngrx-store-freeze';
// ...
import { environment } from '../../environments/environment';

export interface IAppState {
  // ...
}

export const appReducer: ActionReducerMap<IAppState> = {
  // ...
};

export const appMetaReducers: Array<MetaReducer<IAppState>> = !environment.production
  ? [autoEntityMetaReducer, storeFreeze]
  : [autoEntityMetaReducer];
```

### 3: App State

Add default `EntityEffects` to your effects in your state module and reference
your meta reducers in the store:

```typescript
// ...
import { EntityEffects } from '@briebug/ngrx-auto-entity';
import { appMetaReducers, appReducer } from './app.reducer';
// ...

@NgModule({
  imports: [
    // ...
    StoreModule.forRoot(appReducer, { metaReducers: appMetaReducers }),
    EffectsModule.forRoot([EntityEffects /* ... */])
    // ...
  ]
})
export class StateModule {
  // ...
}
```

### 4: Entity State

You will need to set up basic state for each entity. For fully automatic entities, you
only need a basic reducer and standard selectors:

```typescript
import { Customer } from 'models';
import { buildState, EntityActions, IEntityState } from '@briebug/ngrx-auto-entity';

const { initialState, selectors } = buildState(Customer);

export const {
  selectAll: allCustomers,
  selectEntities: customerEntities,
  selectIds: customerIds,
  selectTotal: totalCustomers
} = selectors;

export function customerReducer(state = initialState, action: EntityActions<Customer>): IEntityState<Customer> {
  return state;
}
```

And make sure you register the state and reducer in your main state code:

```typescript
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { autoEntityMetaReducer } from '@briebug/ngrx-auto-entity';
import { storeFreeze } from 'ngrx-store-freeze';
import { customerReducer } from 'state/customer/customer.reducer';
import { environment } from 'environments/environment';

export interface IAppState {
  customer: IEntityState<Customer>;
}

export const appReducer: ActionReducerMap<IAppState> = {
  customer: customerReducer
};

export const appMetaReducers: Array<MetaReducer<IAppState>> = !environment.production
  ? [autoEntityMetaReducer, storeFreeze]
  : [autoEntityMetaReducer];
```

### 5: Models & Services

You are now ready to get rolling! You will need to create your models and your
services, however for a simple application you are now fully set up. Just make sure
you properly register your providers in your module:

```typescript
  // ...
  providers: [
    { provide: Customer, useClass: CustomerService },
    { provide: Order, useClass: OrderService },
    { provide: OrderItem, useClass: OrderItemService },
    { provide: Item, useClass: ItemService },
    // ...
  ],
  // ...
```

Providers must be the model class, an the services must be provided with `useClass`. While
this may seem unusul, this is important to make sure Auto-Entity is able to automatically
map the models associated with each action to the appropriate service calls.

Make sure all models are _**classes**_ (not interfaces!), and make sure your services
implement the required methods from the `IAutoEntityService<TModel>` interface. See
full usage documentation for more information on implementing models and services.

# Further Reading

If you require more information, you may continue reading the [full usage documentation](USAGE.md).

Hop on over to the [NgRX documentation](https://github.com/ngrx/platform) for additional reading if you are just getting going with the popular state management library for Agular.
