---
description: Create service for handling data interactions with server
---

# Entity Service

In our example we are creating a service for persisting entities via a simple REST API. As such, we've created a new **entity.service.ts** file and defined an injectable `EntityService` class.

{% code title="services/entity.service.ts" %}

```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { environment } from '../../environments/environment';

@Injectable()
export class EntityService implements IAutoEntityService<any> {
  constructor(private http: HttpClient) {}

  load(entityInfo: IEntityInfo, id: any): Observable<any> {
    return this.http.get<any>(`${environment.rootUrl}/${entityInfo.modelName}/${id}`);
  }

  loadAll(entityInfo: IEntityInfo): Observable<any[]> {
    return this.http.get<any[]>(`${environment.rootUrl}/${entityInfo.modelName}`);
  }

  create(entityInfo: IEntityInfo, entity: any): Observable<any> {
    return this.http.post<any>(`${environment.rootUrl}/${entityInfo.modelName}`, entity);
  }

  update(entityInfo: IEntityInfo, entity: any): Observable<any> {
    return this.http.patch<any>(`${environment.rootUrl}/${entityInfo.modelName}/${entity.id}`, entity);
  }

  delete(entityInfo: IEntityInfo, entity: any): Observable<any> {
    return this.http.delete<any>(`${environment.rootUrl}/${entityInfo.modelName}/${entity.id}`).pipe(map(() => entity));
  }
}
```

{% endcode %}

{% hint style="success" %}
It's important that each entity service implement the `IAutoEntity` interface. This interface supports the following methods:

- load\(\)
- loadAll\(\)
- loadMany\(\)
- loadPage\(\)
- loadRange\(\)
- create\(\)
- createMany\(\)
- update\(\)
- updateMany\(\)
- replace\(\)
- replaceMany\(\)
- delete\(\)
- deleteMany\(\)

These methods perform the CRUD operators for entity retrieval and persistence.
{% endhint %}

To create an entity service, we must import the `IAutoEntityService` and `IEntityInfo` interfaces. The entity service must implement the `IAutoEntityService` interface. The `IEntityInfo` object provides metadata about the entities, which can be used to help build urls if necessary.

Finally, we implement each of the necessary methods for retrieving and persisting an entities.

{% hint style="info" %}
Your implementation may vary based on the method of persistence and the architecture of your API. Each method is _**optional**_, and may be implemented on an as-needed basis for each entity. We provide several options for loading data, as well as options for updating \(PATCH\) or replacing \(PUT\) entities. Each method of an entity service also provides additional input parameters such as custom criteria. Implement and use what you need.
{% endhint %}
