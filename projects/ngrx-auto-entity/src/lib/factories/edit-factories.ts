import { ActionCreator } from '@ngrx/store';
import { EntityActionTypes } from '../actions/action-types';
import { Change, Changed, Edit, EditByKey, Edited, EditedByKey, EditEnded, EditNew, EndEdit } from '../actions/edit-actions';
import { TNew } from '../actions/model-constructor';
import { setActionType } from '../actions/util';
import { EntityIdentity } from '../types/entity-identity';
import { cacheOnType, CorrelatedProps, defineTypedFactoryFunction } from './util';

export interface EditNewProps<TModel> extends CorrelatedProps {
  entity?: Partial<TModel>;
}

export const createEditNewAction = <TModel, T extends string, P extends EditNewProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: EditNewProps<TModel>) => EditNew<TModel>> =>
  cacheOnType(Type, EntityActionTypes.EditNew, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.EditNew, Type),
      ({ entity, correlationId }: EditNewProps<TModel>) => new EditNew(Type, entity, correlationId)
    )
  );

export interface EditProps<TModel> extends CorrelatedProps {
  entity: Partial<TModel>;
}

export const createEditAction = <TModel, T extends string, P extends EditProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: EditProps<TModel>) => Edit<TModel>> =>
  cacheOnType(Type, EntityActionTypes.Edit, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.Edit, Type),
      ({ entity, correlationId }: EditProps<TModel>) => new Edit(Type, entity, correlationId)
    )
  );

export interface EditByKeyProps extends CorrelatedProps {
  key: EntityIdentity;
}

export const createEditByKeyAction = <TModel, T extends string, P extends EditByKeyProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: EditByKeyProps) => EditByKey<TModel>> =>
  cacheOnType(Type, EntityActionTypes.EditByKey, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.EditByKey, Type),
      ({ key, correlationId }: EditByKeyProps) => new EditByKey(Type, key, correlationId)
    )
  );

export const createEditedAction = <TModel, T extends string, P extends EditProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: EditProps<TModel>) => Edited<TModel>> =>
  cacheOnType(Type, EntityActionTypes.Edited, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.Edited, Type),
      ({ entity, correlationId }: EditProps<TModel>) => new Edited(Type, entity, correlationId)
    )
  );

export const createEditedByKeyAction = <TModel, T extends string, P extends EditByKeyProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: EditByKeyProps) => EditedByKey<TModel>> =>
  cacheOnType(Type, EntityActionTypes.EditedByKey, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.EditedByKey, Type),
      ({ key, correlationId }: EditByKeyProps) => new EditedByKey(Type, key, correlationId)
    )
  );

export const createChangeAction = <TModel, T extends string, P extends EditProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: EditProps<TModel>) => Change<TModel>> =>
  cacheOnType(Type, EntityActionTypes.Change, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.Change, Type),
      ({ entity, correlationId }: EditProps<TModel>) => new Change(Type, entity, correlationId)
    )
  );

export const createChangedAction = <TModel, T extends string, P extends EditProps<TModel>>(
  Type: TNew<TModel>
): ActionCreator<T, (props: EditProps<TModel>) => Changed<TModel>> =>
  cacheOnType(Type, EntityActionTypes.Changed, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.Changed, Type),
      ({ entity, correlationId }: EditProps<TModel>) => new Changed(Type, entity, correlationId)
    )
  );

export const createEndEditAction = <TModel, T extends string, P extends CorrelatedProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: CorrelatedProps) => EndEdit<TModel>> =>
  cacheOnType(Type, EntityActionTypes.EndEdit, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.EndEdit, Type),
      ({ correlationId }: CorrelatedProps) => new EndEdit(Type, correlationId)
    )
  );

export const createEditEndedAction = <TModel, T extends string, P extends CorrelatedProps>(
  Type: TNew<TModel>
): ActionCreator<T, (props: CorrelatedProps) => EditEnded<TModel>> =>
  cacheOnType(Type, EntityActionTypes.EditEnded, () =>
    defineTypedFactoryFunction(
      setActionType(EntityActionTypes.EditEnded, Type),
      ({ correlationId }: CorrelatedProps) => new EditEnded(Type, correlationId)
    )
  );
