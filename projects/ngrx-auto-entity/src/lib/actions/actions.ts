import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Clears all entities for this model from state
 */
export class Clear<TModel> extends EntityAction<TModel> {
  /**
   * @param type - The entity model decorated with @Entity
   * @param correlationId - A custom correlation id for this action; Use to correlate subsequent result actions
   */
  constructor(type: new () => TModel, correlationId?: string) {
    super(type, EntityActionTypes.Clear, correlationId);
  }
}
