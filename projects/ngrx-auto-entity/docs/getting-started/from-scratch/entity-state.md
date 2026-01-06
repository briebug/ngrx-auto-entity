---
description: Update the application state interface.
---

# Update App State

Now that we have the standard initial implementation for NgRX and Auto-Entity in place, we need to wire our models into our state.

{% code title="app.state.ts" %}

```typescript
// ... imports ...
import { Customer } from '../models';
import { customerReducer } from './customer.state.ts';

export interface AppState {
  customer: IEntityState<Customer>;
}

export const appReducer: ActionReducerMap<AppState> = {
  customer: customerReducer
};
```

{% endcode %}

Note that we have added a new `customer` property to the `IAppState` interface of type `IEntityState<Customer>`, which we imported from `@briebug/ngrx-auto-entity` at the top of the file.

For most basic CRUD states, you will not need to implement any custom state interfaces, effects or reducers. This is the simplicity that NgRX Auto-Entity brings to the table!

{% hint style="info" %}
After we create the entity reducer, we'll also need to update the `appReducer` constant to include the `customer` property \(with the customer reducer function as the value\). It's important that both properties have the same name.
{% endhint %}
