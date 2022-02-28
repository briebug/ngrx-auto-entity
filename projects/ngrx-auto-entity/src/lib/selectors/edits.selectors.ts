import { IEntityEdits } from '../util/entity-state';

// prettier-ignore
export const mapToEditedEntity =
  <TModel>(edits: IEntityEdits<TModel>): Partial<TModel> | undefined =>
    (!edits ? undefined : edits.editedEntity);

// prettier-ignore
export const mapToIsDirty =
  <TModel>(edits: IEntityEdits<TModel>): boolean =>
    (!edits ? false : !!edits.isDirty);
