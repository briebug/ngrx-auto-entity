import { InjectionToken } from '@angular/core';
import { RetryCriteria } from './critera.model';

export interface AutoEntityServiceConfig {
  /** API Host Endpoint. Entity url paths will be appended to the provided host.
   *
   * ## Example
   *
   * ```ts
   *
   *  // Import and set config
   *  NgrxAutoEntityServiceModule.forRoot({ host: 'http://localhost:3000/api' })
   *
   *  // Entity Declaration
   *  @Entity({ modelName: 'User', uriName: 'users' })
   *  export class User {
   *    @Key: id: string;
   *  }
   *
   *  // Build State
   *  export const {
   *    actions: { loadAll: loadAllUsers, load: loadUser }
   *  } = buildState(User)
   *
   *  // Applicaiton
   *  someEffect$ = createEffect(() => this.actions$.pipe(
   *    ofType(someAction),
   *    map(() => loadAllUsers()) // Will trigger HTTP GET 'http://localhost:3000/api/users'
   *  ))
   *
   *  someOtherEffect$ = createEffect(() => this.actions$.pipe(
   *    ofType(someAction),
   *    map(({ id }}) => loadUser({ keys: id })) // Will trigger HTTP GET 'http://localhost:3000/api/users/id'
   *  ))
   *
   *
   * ```
   */
  host: string;
  // Default retry to use when setting `retry: true` in action criteria.
  // Defaults to { count: 3, delay: 1000 }
  defaultRetry?: RetryCriteria;
}


export const AUTO_ENTITY_CONFIG = new InjectionToken<AutoEntityServiceConfig>('auto-entity-config')
