---
description: Getting started with NgRx Auto-Entity is easy!
---

# Quick Start

If you are already familiar with NgRx, then adding Auto-Entity to your Angular application is very easy. There are four major steps required to add the providers, create new entity state, and provide your entity services.

## Step 1: Importing the Providers

First things first, you must bring in the Auto-Entity Service providers into your app configuration and call the `provideAutoEntityService()` method to configure the library.

```typescript
import { provideAutoEntityService } from '@briebug/ngrx-auto-entity-service';
// ... other imports ...

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers ...
    provideAutoEntityService({
      // Your API URL prefix
      urlPrefix: 'https://example.com/api'
    })
  ]
};
```

## Step 2: Providing your Services

Now we need to provide the service for each entity.

```typescript
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { EntityService } from '@briebug/ngrx-auto-entity-service';
import { Customer, Order } from './models';
// ... other imports ...

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers ...
    provideAutoEntityService(),
    // Add a provider for each model, mapping to the relevant entity service:
    provideEntityService(Customer, EntityService),
    provideEntityService(Order, EntityService)
  ]
};
```

With that, you are ready to start using your automatic entity state! Continue on to the next section to learn how.
