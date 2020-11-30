import { ActionCreator } from '@ngrx/store';
import { EntityActionTypes } from '../actions/action-types';
import {
  Deselect,
  DeselectAll,
  Deselected,
  DeselectedMany,
  DeselectMany,
  DeselectManyByKeys
} from '../actions/deselection-actions';
import { TNew } from '../actions/model-constructor';
import { setActionType } from '../actions/util';
import { EntityIdentity } from '../types/entity-identity';
import { cacheOnType, CorrelatedProps, defineTypedFactoryFunction } from './util';

export const createDeselectAction = <TModel, T extends string, P extends CorrelatedProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: CorrelatedProps) => Deselect<TModel>> =>
  cacheOnType(Type, EntityActionTypes.Deselect, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.Deselect, Type),
      ({ correlationId }: CorrelatedProps) => new Deselect(Type, correlationId)
    )
  );

export interface DeselectManyProps<TModel> extends CorrelatedProps {
  entities: TModel[];
}

export const createDeselectManyAction = <TModel, T extends string, P extends DeselectManyProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: DeselectManyProps<TModel>) => DeselectMany<TModel>> =>
  cacheOnType(Type, EntityActionTypes.DeselectMany, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.DeselectMany, Type),
      ({ entities, correlationId }: DeselectManyProps<TModel>) => new DeselectMany(Type, entities, correlationId)
    )
  );

export interface DeselectManyByKeysProps extends CorrelatedProps {
  keys: EntityIdentity[];
}

export const createDeselectManyByKeysAction = <TModel, T extends string, P extends DeselectManyByKeysProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: DeselectManyByKeysProps) => DeselectManyByKeys<TModel>> =>
  cacheOnType(Type, EntityActionTypes.DeselectManyByKeys, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.DeselectManyByKeys, Type),
      ({ keys, correlationId }: DeselectManyByKeysProps) => new DeselectManyByKeys(Type, keys, correlationId)
    )
  );

export const createDeselectAllAction = <TModel, T extends string, P extends CorrelatedProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: CorrelatedProps) => DeselectAll<TModel>> =>
  cacheOnType(Type, EntityActionTypes.DeselectAll, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.DeselectAll, Type),
      ({ correlationId }: CorrelatedProps) => new DeselectAll(Type, correlationId)
    )
  );

export const createDeselectedAction = <TModel, T extends string, P extends CorrelatedProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: CorrelatedProps) => Deselected<TModel>> =>
  cacheOnType(Type, EntityActionTypes.Deselected, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.Deselected, Type),
      ({ correlationId }: CorrelatedProps) => new Deselected(Type, correlationId)
    )
  );

export interface DeselectedManyProps<TModel> extends CorrelatedProps {
  entities: Array<TModel | EntityIdentity>;
}

export const createDeselectedManyAction = <TModel, T extends string, P extends DeselectedManyProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: DeselectedManyProps<TModel>) => DeselectedMany<TModel>> =>
  cacheOnType(Type, EntityActionTypes.DeselectedMany, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.DeselectedMany, Type),
      ({ entities, correlationId }: DeselectedManyProps<TModel>) => new DeselectedMany(Type, entities, correlationId)
    )
  );
