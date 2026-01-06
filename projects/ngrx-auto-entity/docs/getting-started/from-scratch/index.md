---
description: Adding NgRx & Auto-Entity to an App
---

# From Scratch

If you have not used NgRx before, and need to start from scratch, this guide should get you going. Let's start by creating a state module. We recommend creating this module in a root **state** directory, located at src/app/state. In this directory, create a new **state.module.ts** file:

{% code title="state.module.ts" %}

```typescript
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EntityOperators } from '@briebug/ngrx-auto-entity';

@NgModule({
  imports: [
    StoreModule.forRoot()
    EffectsModule.forRoot([]),
    NgrxAutoEntityModule.forRoot()
  ]
})
export class StateModule {}
```

{% endcode %}

Import the NgRx `StoreModule` and `EffectsModule` as well as the Auto-Entity `NgrxAutoEntityModule`. Make sure you call the `.forRoot()` initializer on each of them to ensure they are properly imported. It is important that the NgrxAutoEntityModule be brought in after the EffectsModule, as this ensures all automatic effects will be properly registered.

The NgRx Auto Entity module is now imported in your application, giving you access to ready-made generic actions, automatic effects, pre-defined reducers and prefabricated facade classes to handle the bulk of your CRUD meeds.

[Next](entity-model.md), we need to set up the state of our application.
