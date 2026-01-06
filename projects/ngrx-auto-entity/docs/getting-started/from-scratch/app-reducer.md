---
description: Create application reducer and meta reducer.
---

# App Reducer

Also like normal NgRX apps, add a reducer map to your **app.state.ts** file. We recommend creating this file in a root **state** directory, located at src/app/state.

{% code title="app.state.ts" %}

```typescript
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { IEntityState } from '@briebug/ngrx-auto-entity';
import { environment } from '../../environments/environment';

export interface AppState {
  // todo: add each entity state interface to our application state interface
}

export const appReducer: ActionReducerMap<AppState> = {
  // todo: add each entity reducer
};
```

{% endcode %}

{% hint style="danger" %}
In versions of NgRx Auto-Entity prior to v0.2, the developer was also responsible for including the `autoEntityMetaReducer` in the app meta reducers collection. As of version 0.2 of the library, import of the `NgrxAutoEntityModule` with the `.forRoot()` call is all that is necessary to include the meta reducer.

If you are upgrading from a version prior to v0.2, you should remove the `autoEntityMetaReducer` from your app meta reducers!
{% endhint %}

{% hint style="info" %}
With NgRx 8 and up, runtime checks have replaced the need to use the storeFreeze meta reducer. As such, a standard state configuration no longer requires any meta reducers.
{% endhint %}
