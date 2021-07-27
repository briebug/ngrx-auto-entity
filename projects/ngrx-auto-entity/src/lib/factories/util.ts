import { ActionCreator, Creator } from '@ngrx/store';
import { EntityAction } from '../..';
import { TNew } from '../actions/model-constructor';

export interface CorrelatedProps {
  correlationId?: string;
}

export interface StandardProps extends CorrelatedProps {
  criteria?: any;
}

export const NAE_TYPE_ACTION_CACHE = '__nae_type_action_cache';
export const cacheOnType = <TModel, TAction extends EntityAction<TModel>, T extends string>(
  Type: TNew<TModel>,
  actionName: string,
  creatorCallback: () => ActionCreator<T, (props: object) => TAction>
) => (
  (Type[NAE_TYPE_ACTION_CACHE] = Type[NAE_TYPE_ACTION_CACHE] || Object.create(null)),
  (Type[NAE_TYPE_ACTION_CACHE][actionName] = Type[NAE_TYPE_ACTION_CACHE][actionName] || creatorCallback()),
  Type[NAE_TYPE_ACTION_CACHE][actionName]
);

export function defineTypedFactoryFunction<TModel, TAction extends EntityAction<TModel>, T extends string>(
  type: T,
  creator: Creator
): ActionCreator<T, (props: object) => TAction> {
  return Object.defineProperty(creator as (props: object) => TAction, 'type', {
    value: type,
    writable: false
  }) as ActionCreator<T, (props: object) => TAction>;
}
