---
description: Getting started with NgRx Auto-Entity is easy!
---

# Quick Start

If you are already familiar with NgRx, then adding Auto-Entity to your Angular application is very easy. There are four major steps required to add the providers, create new entity state, and provide your entity services.

## Step 1: Importing the Providers

First things first, you must bring in the Auto-Entity providers into your app configuration and call the `provideAutoEntityStore()` method to configure the library.

```typescript
import { provideAutoEntityStore } from '@briebug/ngrx-auto-entity';
// ... other imports ...

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers ...
    provideStore(appReducer, {
      metaReducers: appMetaReducers,
      runtimeChecks: {
        // Auto-Entity includes classes in its actions:
        strictActionSerializability: false
      }
    }),
    provideEffects(),
    provideAutoEntityStore()
  ]
};
```

{% hint style="warning" %}
Note the use of `strictActionSerializability` being set to `false` here. This is an important setting with NgRx Auto-Entity. This library uses special actions that reference classes, which are types. Not instances of those classes, which would be objects \(data\), but the classes themselves. Classes, being types, are not serializable, which prevents auto-entity actions from being compatible with strict action serializability in NgRx.

Providing the type allows Auto-Entity to gain rich knowledge about each entity, including any metadata/config you may attach to your entities with the `@Entity` and `@Key` decorators.
{% endhint %}

## Step 2: Creating your Model and Entity Service

### Entity Models

Before you can actually create your state, you will need to create your entity models, as you would normally do. Auto-Entity requires two small changes to how you create models for NgRx.

{% tabs %}
{% tab title="models/customer.model.ts" %}

```typescript
import { Key } from '@briebug/ngrx-auto-entity';

@Entity({ uriName: 'accounts' })
export class Customer {
  @Key id: number;
  name: string;
  address: Address;
}
```

{% endtab %}
{% endtabs %}

First, your models must be classes rather than interfaces \(see [advanced documentation](../advanced/usage/paradigm/models.md) for more info.\) Second, your entity identity must be decorated with the `@Key` directive. For entities with composite keys, simply decorate each property that is part of the key.

### Entity Services

You will also need to create an entity service to handle CRUD behavior for each entity. Entity services may be shared if your API uses a common pattern. Otherwise you may need to implement a service for each entity as you usually do with NgRx.

{% tabs %}
{% tab title="services/entity.service.ts" %}

```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { environment } from '../../environments/environment';

@Injectable()
export class EntityService implements IAutoEntityService<any> {
  constructor(private http: HttpClient) {}

  load(entityInfo: IEntityInfo, id: any): Observable<any> {
    return this.http.get<any>(`${environment.rootUrl}/${entityInfo.uriName}/${id}`);
  }

  loadAll(entityInfo: IEntityInfo): Observable<any[]> {
    return this.http.get<any[]>(`${environment.rootUrl}/${entityInfo.uriName}`);
  }

  create(entityInfo: IEntityInfo, entity: any): Observable<any> {
    return this.http.post<any>(`${environment.rootUrl}/${entityInfo.uriName}`, entity);
  }

  update(entityInfo: IEntityInfo, entity: any): Observable<any> {
    return this.http.patch<any>(`${environment.rootUrl}/${entityInfo.uriName}/${entity.id}`, entity);
  }

  delete(entityInfo: IEntityInfo, entity: any): Observable<any> {
    return this.http.delete<any>(`${environment.rootUrl}/${entityInfo.uriName}/${entity.id}`).pipe(map(() => entity));
  }
}
```

{% endtab %}
{% endtabs %}

In the example above we have a simple shared entity service that supports a basic REST API where each entity conforms to a simple pattern:

`/<rootUrl>/<entityName>[/<key>]`

Auto-Entity provides basic entity metadata, such as the model name, in the `entityInfo` parameter of each entity service method.

## Step 3: Providing your Services

Once you have created an entity service or services, you will need to provide them in your app. With Auto-Entity, services must be provided in a slightly different manner than normal, to ensure that Auto-Entity is able to find entity services dynamically.

{% tabs %}
{% tab title="app.config.ts" %}

```typescript
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { Customer, Order } from './models';
import { EntityService } from './services';
// ... other imports ...

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers ...
    provideStore(...),
    provideEffects(...),
    provideAutoEntityStore()
    // Add a provider for each model, mapping to the relevant entity service:
    provideEntityService(Customer, EntityService),
    provideEntityService(Order, EntityService),
  ]
}
```

{% endtab %}
{% endtabs %}

In our example here, we are sharing a single entity service, `EntityService`, for all entities. `provideEntityService` provides your service and provides each model using `useExisting` to specify the service class to use.

## Step 4: Adding your States

Finally, now that you have your models and have provided your entity services, you need to build your state for each model. Add a new state file for each model following the pattern depicted here:

{% tabs %}
{% tab title="state/customer.state.ts" %}

```typescript
import { createReducer } from '@ngrx/store';
import { buildState } from '@briebug/ngrx-auto-entity';
import { Customer } from '../models';

export const { initialState, facade: CustomerFacadeBase } = buildState(Customer);

export const customerReducer = createReducer(initialState);
```

{% endtab %}
{% endtabs %}

Finally, include your entity states in the AppState interface, and your stub reducers in the action reducer map:

{% tabs %}
{% tab title="state/app.state.ts" %}

```typescript
import { IEntityState } from '@briebug/ngrx-auto-entity';
import { Customer, Order } from 'models';
import { customerReducer } from './customer.state.ts'
import { orderReducer } from './order.state.ts'

export interface IAppState {
  // ... other states ...
  customer: IEntityState<Customer>;
  order: IEntityState<Order>;
}
export type AppState = IAppState;

export const appReducer: ActionReducerMap<AppState> = {
  // ... other reducers ...
  customer: customerReducer
  order: orderReducer
};
```

{% endtab %}
{% endtabs %}

With that, you are ready to start using your automatic entity state! Continue on to the next section to learn how.
