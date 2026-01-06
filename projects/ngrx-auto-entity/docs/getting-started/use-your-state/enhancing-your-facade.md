---
description: Encapsulate!
---

# Enhancing your Facade

In our `CustomerComponent`, there are a few methods that exhibit **"class envy"** which is a kind of anti-pattern. For those not familiar with the concept, class envy occurs when methods of one class are more dependent on functionality within another class. It then becomes prudent to move the method into the class of envy, and if necessary parameterize any input required from the method's previous home.

Our `CustomerComponent` has two potential candidates for encapsulation within our `CustomerFacade` class: `hasCustomer` and onSave. We can easily move this functionality into our facade class and make these behaviors reusable in any component that may require interaction with customer entity state:

{% tabs %}
{% tab title="customer.facade.ts" %}

```typescript
export class CustomerFacade extends CustomerFacadeBase {
  hasCustomer(id: number): Observable<boolean> {
    return this.ids$.pipe(map((ids: number[]) => ids.indexOf(id) > -1));
  }

  loadIfMissing(id: number): void {
    this.hasCustomer(id)
      .pipe(first())
      .subscribe(exists => (exists ? this.load(id) : false));
  }

  save(customer: Customer): void {
    if (updatedCustomer.id == null) {
      this.customerFacade.create(customer); // Facades FTW!
    } else {
      this.customerFacade.update(customer); // Facades FTW!
    }
  }
}
```

{% endtab %}
{% endtabs %}

{% hint style="info" %}
Entity facades include a considerable amount of ready-to-go functionality. Check out the advanced facade documentation [here](../../advanced/leveraging-facades/) to learn more about everything our facades provide and how to extend them.
{% endhint %}
