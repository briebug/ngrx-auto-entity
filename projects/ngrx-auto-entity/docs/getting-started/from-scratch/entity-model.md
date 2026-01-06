---
description: Create your entity models.
---

# Entity Model

In a departure from classic @ngrx/entity models, each model in your application should be defined as a **class** \(see note below\). \*\*\*\*Here is an example of a `Customer` model:

{% code title="customer.model.ts" %}

```typescript
import { Entity, Key } from '@briebug/ngrx-auto-entity';

@Entity({
  modelName: 'Customer',
  uriName: 'customers'
})
export class Customer {
  @Key id: number;
  name: string;
  catchPhrase: string;
}
```

{% endcode %}

Next we need to import the `Key` and `Entity` decorators. The `Key` decorator is used to specify the property in your model that is the unique identifier. Decorate the `id` property, which is the unique identifier for `Customer` model. Read more about entity keys in the advanced documentation.

The `Entity` decorator is used to attach metadata to your entity model that the NgRx Auto-Entity library can use to perform many of its automated tasks. In version 0.5 of the library, only the `modelName` must be specified. Read more about the entity decorator in the advanced documentation.

{% hint style="warning" %}
Note that the model _must_ be a **class** and **not an interface**. This is because interfaces are a _compile-time only_ feature of TypeScript, while classes are a native _runtime_ construct in JavaScript. Further, the `modelName` _must_ be defined on the entity, as this is the name that the library will use at runtime for minified/uglified code \(critical, read more in advanced documentation.\)
{% endhint %}
