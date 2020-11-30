import { ActionCreator } from '@ngrx/store';
import { EntityActionTypes } from '../actions/action-types';
import {
  Select,
  Selected,
  SelectedMany, SelectedMore,
  SelectMany,
  SelectManyByKeys, SelectMore, SelectMoreByKeys, SelectByKey
} from '../actions/selection-actions';
import { TNew } from '../actions/model-constructor';
import { setActionType } from '../actions/util';
import { EntityIdentity } from '../types/entity-identity';
import { cacheOnType, CorrelatedProps, defineTypedFactoryFunction } from './util';

export interface SelectProps<TModel> extends CorrelatedProps {
  entity: TModel;
}

export const createSelectAction = <TModel, T extends string, P extends SelectProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: SelectProps<TModel>) => Select<TModel>> =>
  cacheOnType(Type, EntityActionTypes.Select, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.Select, Type),
      ({ entity, correlationId }: SelectProps<TModel>) => new Select(Type, entity, correlationId)
    )
  );

export interface SelectByKeyProps extends CorrelatedProps {
  key: EntityIdentity;
}

export const createSelectByKeyAction = <TModel, T extends string, P extends SelectByKeyProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: SelectByKeyProps) => SelectByKey<TModel>> =>
  cacheOnType(Type, EntityActionTypes.SelectByKey, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.SelectByKey, Type),
      ({ key, correlationId }: SelectByKeyProps) => new SelectByKey(Type, key, correlationId)
    )
  );

export interface SelectManyProps<TModel> extends CorrelatedProps {
  entities: TModel[];
}

export const createSelectManyAction = <TModel, T extends string, P extends SelectManyProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: SelectManyProps<TModel>) => SelectMany<TModel>> =>
  cacheOnType(Type, EntityActionTypes.SelectMany, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.SelectMany, Type),
      ({ entities, correlationId }: SelectManyProps<TModel>) => new SelectMany(Type, entities, correlationId)
    )
  );

export const createSelectMoreAction = <TModel, T extends string, P extends SelectManyProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: SelectManyProps<TModel>) => SelectMore<TModel>> =>
  cacheOnType(Type, EntityActionTypes.SelectMore, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.SelectMore, Type),
      ({ entities, correlationId }: SelectManyProps<TModel>) => new SelectMore(Type, entities, correlationId)
    )
  );

export interface SelectManyByKeysProps extends CorrelatedProps {
  keys: EntityIdentity[];
}

export const createSelectManyByKeysAction = <TModel, T extends string, P extends SelectManyByKeysProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: SelectManyByKeysProps) => SelectManyByKeys<TModel>> =>
  cacheOnType(Type, EntityActionTypes.SelectManyByKeys, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.SelectManyByKeys, Type),
      ({ keys, correlationId }: SelectManyByKeysProps) => new SelectManyByKeys(Type, keys, correlationId)
    )
  );

export const createSelectMoreByKeysAction = <TModel, T extends string, P extends SelectManyByKeysProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: SelectManyByKeysProps) => SelectMoreByKeys<TModel>> =>
  cacheOnType(Type, EntityActionTypes.SelectMoreByKeys, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.SelectMoreByKeys, Type),
      ({ keys, correlationId }: SelectManyByKeysProps) => new SelectMoreByKeys(Type, keys, correlationId)
    )
  );

export const createSelectedAction = <TModel, T extends string, P extends CorrelatedProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: CorrelatedProps) => Selected<TModel>> =>
  cacheOnType(Type, EntityActionTypes.Selected, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.Selected, Type),
      ({ correlationId }: CorrelatedProps) => new Selected(Type, correlationId)
    )
  );

export interface SelectedManyProps<TModel> extends CorrelatedProps {
  entities: Array<TModel | EntityIdentity>;
}

export const createSelectedManyAction = <TModel, T extends string, P extends SelectedManyProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: SelectedManyProps<TModel>) => SelectedMany<TModel>> =>
  cacheOnType(Type, EntityActionTypes.SelectedMany, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.SelectedMany, Type),
      ({ entities, correlationId }: SelectedManyProps<TModel>) => new SelectedMany(Type, entities, correlationId)
    )
  );

export const createSelectedMoreAction = <TModel, T extends string, P extends SelectedManyProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: SelectedManyProps<TModel>) => SelectedMore<TModel>> =>
  cacheOnType(Type, EntityActionTypes.SelectedMore, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.SelectedMore, Type),
      ({ entities, correlationId }: SelectedManyProps<TModel>) => new SelectedMore(Type, entities, correlationId)
    )
  );
