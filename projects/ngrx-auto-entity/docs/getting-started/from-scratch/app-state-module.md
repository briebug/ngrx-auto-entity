---
description: Create application state module.
---

# App State Module

Now that we have implemented our root state interface & reducer map, we need to _update_ the state module we created in the first step:

{% code title="state.module.ts" %}

```typescript
import { NgModule } from '@angular/core';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { appMetaReducers, appReducer } from './app.state';

@NgModule({
  imports: [StoreModule.forRoot(appReducer), EffectsModule.forRoot([]), NgrxAutoEntityModule.forRoot()]
})
export class StateModule {}
```

{% endcode %}

Update the import of the `StoreModule`. In the `forRoot()` static method, specify the `appReducer` and \(if necessary\) `appMetaReducers` from your previously created `app.reducer` as with any normal NgRX app.

If you have any custom effects you may have implemented, include those classes in the `EffectsModule` import's `forRoot()` call. Effects are optional with NgRx Auto-Entity, so if you have no effects just pass an empty array.
