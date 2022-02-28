import { Page, Range } from '../models';
import { EntityIdentity } from '../types/entity-identity';

/**
 * Structure for how entities are stored within the `entities` state property:
 * a single object with the key being each entity's @Key value and the value being the entity itself
 */
export interface IEntityDictionary<TModel> {
  [key: string]: TModel;
}

/**
 * Structure for how entity selections are stored
 */
export interface IEntitySelections {
  currentEntityKey?: EntityIdentity;
  currentEntitiesKeys?: EntityIdentity[];
}

/**
 * Structure for how entity edits are stored
 */
export interface IEntityEdits<TModel> {
  editedEntity?: Partial<TModel>;
  isDirty?: boolean;
}

/**
 * Structure for how entity paging info is stored
 */
export interface IEntityPaging {
  currentPage?: Page;
  currentRange?: Range;
  totalPageableCount?: number;
}

/**
 * Structure for how entity tracking is stored
 */
export interface IEntityTracking {
  isLoading?: boolean;
  isSaving?: boolean;
  isDeleting?: boolean;
  loadedAt?: number;
  savedAt?: number;
  createdAt?: number;
  updatedAt?: number;
  replacedAt?: number;
  deletedAt?: number;
}

/**
 * Structure for how entities are stored, including useful computed properties
 * such as an array of their keys, status flags, timestamps, etc.
 */
export interface IEntityState<TModel> {
  entities: IEntityDictionary<TModel>;
  ids: EntityIdentity[];
  selections?: IEntitySelections;
  edits?: IEntityEdits<TModel>;
  paging?: IEntityPaging;
  tracking?: IEntityTracking;
}
