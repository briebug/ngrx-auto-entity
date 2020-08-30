/*
 * Represents an entity identity
 *
 * @remarks
 * At the current time, entity identities must be either number
 * or string. These two types should allow the vast majority
 * of potential identities to be represented effectively in
 * entity state, including composite keys (which auto-entity
 * automatically creates as strings.)
 */
export type EntityIdentity = string | number;
