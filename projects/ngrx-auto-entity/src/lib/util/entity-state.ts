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
 * Structure for how entities are stored, including useful computed properties
 * such as an array of their keys, status flags, timestamps, etc.
 */
export interface IEntityState<TModel> {
  entities: IEntityDictionary<TModel>;
  ids: EntityIdentity[];
  currentEntityKey?: EntityIdentity;
  currentEntitiesKeys?: EntityIdentity[];
  editedEntity?: Partial<TModel>;
  isDirty?: boolean;
  currentPage?: Page;
  currentRange?: Range;
  totalPageableCount?: number;
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
