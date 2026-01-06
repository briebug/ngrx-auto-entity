# Update App Module

Finally, in order for NgRx Auto-Entity to find the entity service you just created, you must provide it in your application state. Providing entity services is slightly different than a normal provider, which simply provides itself as the service class.

{% code title="app.module.ts" %}

```typescript
import { NgModule } from '@angular/core';
import { StateModule } from './state';
import { Customer } from './models';
import { EntityService } from './services';

@NgModule({
  imports: [BrowserModule, StateModule],
  providers: [{ provide: Customer, useClass: EntityService }]
})
export class AppModule {}
```

{% endcode %}

Here, we have provided the **model** type as the provider, and specified the `EntityService` class as the actual service class via `useClass`. This is the simplest model for using Auto-Entity, and for simple backend APIs that follow a common pattern, a single service like this may be reused for any number of entities.

> **provide**: Model, **useClass**: EntityService

In the event that you have a more complex backend API, or even must integrate with many backend APIs, you may create custom entity services for each entity if necessary, and provide each model with its own unique service class following the same pattern as above.

Finally, import the `StateModule` we created earlier into your root `AppModule` to bring in all of your root state, including NgRx Auto-Entity.

And, with that, you are done! You can now start using your entity in your app.
