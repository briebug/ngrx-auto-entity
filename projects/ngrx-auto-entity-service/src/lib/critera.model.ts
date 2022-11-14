export interface EntityCriteria {
  parents?: EntityParent;
  query?: QueryCriteria;
  param?: string | number | string[] | number[];
  version?: number;
  // @Default false
  // Set to true for default values or provide options.
  // ###Only applies to load methods.
  retry?: boolean | RetryCriteria;
  [key: string]: unknown;
}

export interface EntityParent {
  [key: string]: string | number;
}

export interface RetryCriteria {
  // Defaults to 1000 (ms)
  delay?: number;
  // Defaults to 3 max retries
  maxRetries?: number;
}

export interface QueryCriteria {
  [key: string]: string | number | string[] | number[];
}
