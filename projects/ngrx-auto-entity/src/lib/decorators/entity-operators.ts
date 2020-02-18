import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { EntityAction } from '../actions/entity-action';
import { ENTITY_OPTS_PROP } from './entity-tokens';

/**
 * Operator that determines if an effect should run for the given model type and action.
 */
export const shouldApplyEffect = <TModel, TAction extends EntityAction<TModel>>() => (source: Observable<TAction>) =>
  source.pipe(
    filter(({ actionType, info }) => !((info.modelType[ENTITY_OPTS_PROP] || {}).excludeEffects || {})[actionType])
  );
