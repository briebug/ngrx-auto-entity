import { IEntityEdits } from '../util/entity-state';

// prettier-ignore
export const mapToEditedEntity =
  <TModel>(edits: IEntityEdits<TModel> | undefined): Partial<TModel> | undefined =>
    (!edits ? undefined : edits.editedEntity);

// prettier-ignore
export const mapToIsDirty =
  <TModel>(edits: IEntityEdits<TModel> | undefined): boolean =>
    (!edits ? false : !!edits.isDirty);
