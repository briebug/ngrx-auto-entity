/**
 * Criteria passed to the entity service.
 */
export interface EntityCriteria {
  /**
   * Map of entity parent name to ids to prefix the request path with.
   *
   * @example
   * ```typescript
   * { parents: { game: 'tempest' } }
   * ```
   * ```text
   * https://example.com/api/games/tempest/scores
   * ```
   *
   * @example
   * ```typescript
   * { parents: { game: null } }
   * ```
   * ```text
   * https://example.com/api/games/scores
   * ```
   */
  parents?: EntityParent;

  /**
   * Map of query parameters to add to the request URL
   *
   * @example
   * ```typescript
   * { query: { sort: 'asc' } }
   * ```
   * ```text
   * https://example.com/api/scores?sort=asc
   * ```
   */
  query?: QueryCriteria;

  /**
   * An entity subpath to add to the URL
   *
   * @example
   * With param set to `top`
   * ```text
   * https://example.com/api/scores/top
   * ```
   *
   * @example
   * Without param
   * ```text
   * https://example.com/api/scores
   * ```
   */
  param?: string | number | string[] | number[];

  /**
   * Version of the API to use.
   *
   * @remarks
   * The version subpath is prefixed with `v`.
   *
   * @example
   * With version set to `1`
   * ```text
   * https://example.com/api/v1/users
   * ```
   *
   * @example
   * Without version
   * ```text
   * https://example.com/api/users
   * ```
   */
  version?: number;

  /**
   * Retry the request on failure. **Only applies to load methods.**
   *
   * @remarks
   * When `true`, enables retry and uses the default retry options.
   * When `false` or `undefined`, disables retry.
   * When `RetryCriteria`, enables retry and provides custom retry options.
   *
   * @default false
   */
  retry?: boolean | RetryCriteria;

  /**
   * Additional criteria to pass to the service.
   */
  [key: string]: unknown;
}

/**
 * Map of path-id pairs prefixed to the request path.
 */
export interface EntityParent {
  [key: string]: string | number;
}

/**
 * Request retry configuration criteria.
 */
export interface RetryCriteria {
  /**
   * Delay between retries in milliseconds.
   * @default 1000
   */
  delay?: number;

  /**
   * Maximum number of retries.
   * @default 3
   */
  maxRetries?: number;
}

/**
 * Query parameter map.
 */
export interface QueryCriteria {
  [key: string]: string | number | string[] | number[];
}
