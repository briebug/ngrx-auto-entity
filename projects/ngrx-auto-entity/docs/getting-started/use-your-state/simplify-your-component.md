---
description: That junk don't belong here!
---

# Simplify your Component

Once you have enhanced your facade with functionality that belongs in the facade and not the component, it's time to clean up your component. Using the new functionality we have implemented in our customer facade, our component can become reduced to a simpler form:

{% tabs %}
{% tab title="components/customer.component.ts" %}

```typescript
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    public customerFacade: CustomerFacade // No store, no selectors!
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        filter(params => params.has('id')),
        map(params => +params.get('id'))
      )
      .subscribe(id => {
        this.customerFacade.selectByKey(id); // Facades FTW!
        this.customerFacade.loadIfMissing(id); // Facades FTW!
      });
  }
}
```

{% endtab %}

{% tab title="components/customer.component.html" %}

```html
<div class="customers">
  <div>
    <h2>Customer</h2>
    <app-customer-form #customerForm [customer]="customerFacade.current$ | async" (saved)="customerFacade.save($event)">
    </app-customer-form>
    <div>
      <button routerLink="/customers">Cancel</button>
      <button (click)="customerForm.save()" [disabled]="!customerForm.valid">Save</button>
    </div>
  </div>
</div>
```

{% endtab %}
{% endtabs %}
