import { InjectionToken } from '@angular/core';
import { EntityCriteria, RetryCriteria } from './critera.model';
import { IEntityInfo } from '@briebug/ngrx-auto-entity';
import { Observable } from 'rxjs';

/**
 * Function to resolve the API Prefix for a given request.
 *
 * @param operation - The operation being performed.
 * @param info - The entity information.
 * @param criteria - The request criteria.
 * @returns The API Prefix for the request.
 */
export type APIPrefixResolver = (
  operation: string,
  info: IEntityInfo,
  criteria: EntityCriteria
) => string | Promise<string> | Observable<string>;

/**
 * Configuration for the auto entity service.
 */
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
   *  // Application
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
  urlPrefix: string | APIPrefixResolver;

  /**
   * Default retry to use when setting `retry: true` in action criteria.
   * @default `{ delay: 1000, maxRetries: 3 }`
   */
  defaultRetry?: RetryCriteria;
}

export const AUTO_ENTITY_CONFIG = new InjectionToken<AutoEntityServiceConfig>('@briebug/ngrx-auto-entity-service Config');
