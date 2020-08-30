import { EntityActionTypes } from './action-types';
import { EntityAction } from './entity-action';

/**
 * Clears all entities for this model from state
 */
export class Clear<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, correlationId?: string) {
    super(type, EntityActionTypes.Clear, correlationId);
  }
}
