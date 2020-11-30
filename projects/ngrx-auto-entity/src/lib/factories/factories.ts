import { ActionCreator } from '@ngrx/store';
import { EntityActionTypes } from '../actions/action-types';
import { Clear } from '../actions/actions';
import { TNew } from '../actions/model-constructor';
import { setActionType } from '../actions/util';
import { cacheOnType, CorrelatedProps, defineTypedFactoryFunction } from './util';

export const createClearAction = <TModel, T extends string, P extends CorrelatedProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: CorrelatedProps) => Clear<TModel>> =>
  cacheOnType(Type, EntityActionTypes.Clear, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.Clear, Type),
      ({ correlationId }: CorrelatedProps) => new Clear(Type, correlationId)
    )
  );
