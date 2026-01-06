---
description: Create application state interface.
---

# App Interfaces

As with any NgRX application, we need to create a new **app.state.ts** file. We recommend creating is file in a root **state** directory, located at src/app/state. Import the `IEntityState` interface from **@briebug/ngrx-auto-entity** as well, as we will be using it later.

{% code title="app.state.ts" %}

```typescript
import { IEntityState } from '@briebug/ngrx-auto-entity';

export interface AppState {
  // todo: add each entity state interface to our application state interface
}
```

{% endcode %}

Define the `AppState` interface as normal. We will eventually define each entity state property here. For now, we've left it blank, and will fill it in later on in this quick start.

Remember to export the `AppState` type so that it may be used throughout the rest of your app.
