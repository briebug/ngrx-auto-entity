import { IEntityFacade } from '@briebug/ngrx-auto-entity';
import { Observable } from 'rxjs';
import { filter, map, skip, switchMapTo, take, tap } from 'rxjs/operators';

export function createAndFetch$<TModel = any>(
  facade: IEntityFacade<TModel>,
  entity: TModel,
  criteria?: any
): Observable<TModel> {
  let isCreated = false;
  return facade.isSaving$.pipe(
    filter(isSaving => !isSaving),
    tap(() => {
      this.create(entity, criteria);
      isCreated = true;
    }),
    skip(1),
    take(1),
    switchMapTo(facade.all$.pipe(take(1))),
    map((entities: TModel[]) => entities[entities.length - 1])
  );
}