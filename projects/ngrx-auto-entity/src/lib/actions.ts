import { Action } from '@ngrx/store';
import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import { pascalCase } from '../util/case';
import { checkKeyName } from './decorators';
import { IPageInfo, IRangeInfo, Page, Range } from './models';
import { EntityIdentity } from './util';

export enum EntityActionTypes {
  Load = '[Entity] Generic Load',
  LoadSuccess = '[Entity] Generic Load: Success',
  LoadFailure = '[Entity] Generic Load: Failure',

  LoadMany = '[Entity] Generic Load Many',
  LoadManySuccess = '[Entity] Generic Load Many: Success',
  LoadManyFailure = '[Entity] Generic Load Many: Failure',

  LoadAll = '[Entity] Generic Load All',
  LoadAllSuccess = '[Entity] Generic Load All: Success',
  LoadAllFailure = '[Entity] Generic Load All: Failure',

  LoadPage = '[Entity] Generic Load Page',
  LoadPageSuccess = '[Entity] Generic Load Page: Success',
  LoadPageFailure = '[Entity] Generic Load Page: Failure',

  LoadRange = '[Entity] Generic Load Range',
  LoadRangeSuccess = '[Entity] Generic Load Range: Success',
  LoadRangeFailure = '[Entity] Generic Load Range: Failure',

  Create = '[Entity] Generic Create',
  CreateSuccess = '[Entity] Generic Create: Success',
  CreateFailure = '[Entity] Generic Create: Failure',

  CreateMany = '[Entity] Generic Create Many',
  CreateManySuccess = '[Entity] Generic Create Many: Success',
  CreateManyFailure = '[Entity] Generic Create Many: Failure',

  Update = '[Entity] Generic Update',
  UpdateSuccess = '[Entity] Generic Update: Success',
  UpdateFailure = '[Entity] Generic Update: Failure',

  UpdateMany = '[Entity] Generic Update Many',
  UpdateManySuccess = '[Entity] Generic Update Many: Success',
  UpdateManyFailure = '[Entity] Generic Update Many: Failure',

  Replace = '[Entity] Generic Replace',
  ReplaceSuccess = '[Entity] Generic Replace: Success',
  ReplaceFailure = '[Entity] Generic Replace: Failure',

  ReplaceMany = '[Entity] Generic Replace Many',
  ReplaceManySuccess = '[Entity] Generic Replace Many: Success',
  ReplaceManyFailure = '[Entity] Generic Replace Many: Failure',

  Delete = '[Entity] Generic Delete',
  DeleteSuccess = '[Entity] Generic Delete: Success',
  DeleteFailure = '[Entity] Generic Delete: Failure',

  DeleteMany = '[Entity] Generic Delete Many',
  DeleteManySuccess = '[Entity] Generic Delete Many: Success',
  DeleteManyFailure = '[Entity] Generic Delete Many: Failure',

  Clear = '[Entity] Generic Clear',

  Select = '[Entity] Generic Select',
  SelectByKey = '[Entity] Generic Select by Key',
  SelectMany = '[Entity] Generic Select of Many',
  SelectManyByKeys = '[Entity] Generic Select of Many by Keys',
  Selected = '[Entity] Generic Selection',
  SelectedMany = '[Entity] Generic Selection of Many',

  Deselect = '[Entity] Generic Deselect',
  DeselectMany = '[Entity] Generic Deselect of Many',
  DeselectManyByKeys = '[Entity] Generic Deselect of Many by Keys',
  DeselectAll = '[Entity] Generic Deselect of All',
  Deselected = '[Entity] Generic Deselection',
  DeselectedMany = '[Entity] Generic Deselection of Many'
}

/**
 * Entity class
 */
export interface IEntityInfo {
  modelName: string;
  modelType: new () => any;
}

export type TNew<TModel> = new () => TModel;

export interface IEntityAction extends Action {
  actionType: string;
  info: IEntityInfo;
}

/**
 * Structure for all of this library's actions
 */
export abstract class EntityAction<TModel> implements IEntityAction {
  type: string;
  info: IEntityInfo;

  protected constructor(type: TNew<TModel>, public actionType: string) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

const setInfo = (type: any): IEntityInfo => {
  const instance = new type();
  checkKeyName(type, instance.constructor.name);
  return {
    modelType: type,
    modelName: instance.constructor.name
  };
};

const setType = (actionType: string, info: IEntityInfo): string => {
  const name = info.modelName;
  const entity = pascalCase(name);

  return actionType.replace('Entity', entity);
};

/**
 * Loads a single instance of an entity, corresponding to HTTP GET /entity/:id operation
 */
export class Load<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public keys: any, public criteria?: any) {
    super(type, EntityActionTypes.Load);
  }
}

export class LoadSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel) {
    super(type, EntityActionTypes.LoadSuccess);
  }
}

export class LoadFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any) {
    super(type, EntityActionTypes.LoadFailure);
  }
}

/**
 * Loads many instances of an entity (updating existing state), corresponding to HTTP GET /entity operation
 */
export class LoadMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public criteria?: any) {
    super(type, EntityActionTypes.LoadMany);
  }
}

export class LoadManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[]) {
    super(type, EntityActionTypes.LoadManySuccess);
  }
}

export class LoadManyFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any) {
    super(type, EntityActionTypes.LoadManyFailure);
  }
}

/**
 * Loads all instance of an entity (replacing existing state), corresponding to HTTP GET /entity operation
 */
export class LoadAll<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public criteria?: any) {
    super(type, EntityActionTypes.LoadAll);
  }
}

export class LoadAllSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[]) {
    super(type, EntityActionTypes.LoadAllSuccess);
  }
}

export class LoadAllFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any) {
    super(type, EntityActionTypes.LoadAllFailure);
  }
}

/**
 * Loads a single page of entities, corresponding to HTTP GET /entity?page&size operation
 */
export class LoadPage<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public page: Page, public criteria?: any) {
    super(type, EntityActionTypes.LoadPage);
  }
}

export class LoadPageSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public pageInfo: IPageInfo) {
    super(type, EntityActionTypes.LoadPageSuccess);
  }
}

export class LoadPageFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any) {
    super(type, EntityActionTypes.LoadPageFailure);
  }
}

/**
 * Loads a range of entities, corresponding to HTTP GET /entity?start&end|first&last|skip&take operation
 */
export class LoadRange<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public range: Range, public criteria?: any) {
    super(type, EntityActionTypes.LoadRange);
  }
}

export class LoadRangeSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public rangeInfo: IRangeInfo) {
    super(type, EntityActionTypes.LoadRangeSuccess);
  }
}

export class LoadRangeFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any) {
    super(type, EntityActionTypes.LoadRangeFailure);
  }
}

/**
 * Creates a single entity, corresponding to HTTP POST operation
 */
export class Create<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any) {
    super(type, EntityActionTypes.Create);
  }
}

export class CreateSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel) {
    super(type, EntityActionTypes.CreateSuccess);
  }
}

export class CreateFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any) {
    super(type, EntityActionTypes.CreateFailure);
  }
}

/**
 * Creates many entities, corresponding to HTTP POST operation
 */
export class CreateMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any) {
    super(type, EntityActionTypes.CreateMany);
  }
}

export class CreateManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[]) {
    super(type, EntityActionTypes.CreateManySuccess);
  }
}

export class CreateManyFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any) {
    super(type, EntityActionTypes.CreateManyFailure);
  }
}

/**
 * Updates a single entity, corresponding to HTTP PATCH operation.
 *
 * PATCH: Update just the supplied attributes of the entity
 */
export class Update<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any) {
    super(type, EntityActionTypes.Update);
  }
}

export class UpdateSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel) {
    super(type, EntityActionTypes.UpdateSuccess);
  }
}

export class UpdateFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any) {
    super(type, EntityActionTypes.UpdateFailure);
  }
}

/**
 * Updates many entities, corresponding to HTTP PATCH operation.
 *
 * PATCH: Update just the supplied attributes of the entities
 */
export class UpdateMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any) {
    super(type, EntityActionTypes.UpdateMany);
  }
}

export class UpdateManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[]) {
    super(type, EntityActionTypes.UpdateManySuccess);
  }
}

export class UpdateManyFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any) {
    super(type, EntityActionTypes.UpdateManyFailure);
  }
}

/**
 * Replaces a single entity, corresponding to HTTP PUT operation.
 *
 * PUT: Replace the entity with the one supplied in the request
 */
export class Replace<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any) {
    super(type, EntityActionTypes.Replace);
  }
}

export class ReplaceSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel) {
    super(type, EntityActionTypes.ReplaceSuccess);
  }
}

export class ReplaceFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any) {
    super(type, EntityActionTypes.ReplaceFailure);
  }
}

/**
 * Replaces many entities, corresponding to HTTP PUT operation.
 *
 * PUT: Replace the entities with the ones supplied in the request
 */
export class ReplaceMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any) {
    super(type, EntityActionTypes.ReplaceMany);
  }
}

export class ReplaceManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[]) {
    super(type, EntityActionTypes.ReplaceManySuccess);
  }
}

export class ReplaceManyFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any) {
    super(type, EntityActionTypes.ReplaceManyFailure);
  }
}

/**
 * Deletes a single entity, corresponding to HTTP DELETE operation
 */
export class Delete<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any) {
    super(type, EntityActionTypes.Delete);
  }
}

export class DeleteSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel) {
    super(type, EntityActionTypes.DeleteSuccess);
  }
}

export class DeleteFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any) {
    super(type, EntityActionTypes.DeleteFailure);
  }
}

/**
 * Deletes many entities, corresponding to HTTP DELETE operation
 */
export class DeleteMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any) {
    super(type, EntityActionTypes.DeleteMany);
  }
}

export class DeleteManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[]) {
    super(type, EntityActionTypes.DeleteManySuccess);
  }
}

export class DeleteManyFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any) {
    super(type, EntityActionTypes.DeleteManyFailure);
  }
}

/**
 * Clears all entities for this model from state
 */
export class Clear<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel) {
    super(type, EntityActionTypes.Clear);
  }
}

/**
 * Selects a single entity in the store by the entity model
 */
export class Select<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel) {
    super(type, EntityActionTypes.Select);
  }
}

/**
 * Selects a single entity in the store by the entity key
 */
export class SelectByKey<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entityKey: EntityIdentity) {
    super(type, EntityActionTypes.SelectByKey);
  }
}

/**
 * Selects a single entity in the store by the entity model
 */
export class SelectMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[]) {
    super(type, EntityActionTypes.SelectMany);
  }
}

/**
 * Selects a single entity in the store by the entity key
 */
export class SelectManyByKeys<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entitiesKeys: EntityIdentity[]) {
    super(type, EntityActionTypes.SelectManyByKeys);
  }
}

/**
 * Indicates the selection of a single entity in the store
 */
export class Selected<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel | EntityIdentity) {
    super(type, EntityActionTypes.Selected);
  }
}

/**
 * Indicates the selection of a single entity in the store
 */
export class SelectedMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: Array<TModel | EntityIdentity>) {
    super(type, EntityActionTypes.SelectedMany);
  }
}

/**
 * De-selects a single entity in the store
 */
export class Deselect<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel) {
    super(type, EntityActionTypes.Deselect);
  }
}

/**
 * De-selects many entities in the store
 */
export class DeselectMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[]) {
    super(type, EntityActionTypes.DeselectMany);
  }
}

/**
 * De-selects many entities in the store by entity keys
 */
export class DeselectManyByKeys<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entitiesKeys: EntityIdentity[]) {
    super(type, EntityActionTypes.DeselectManyByKeys);
  }
}

/**
 * De-selects all entities in the store
 */
export class DeselectAll<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel) {
    super(type, EntityActionTypes.DeselectAll);
  }
}

/**
 * Indicates the de-selection of a single entity in the store
 */
export class Deselected<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel) {
    super(type, EntityActionTypes.Deselected);
  }
}

/**
 * Indicates the de-selection of many entities in the store
 */
export class DeselectedMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: Array<TModel | EntityIdentity>) {
    super(type, EntityActionTypes.DeselectedMany);
  }
}

/**
 * Union of all known entity action types
 */
export type EntityActions<TModel> =
  | Load<TModel>
  | LoadFailure<TModel>
  | LoadSuccess<TModel>
  | LoadMany<TModel>
  | LoadManyFailure<TModel>
  | LoadManySuccess<TModel>
  | LoadAll<TModel>
  | LoadAllFailure<TModel>
  | LoadAllSuccess<TModel>
  | LoadPage<TModel>
  | LoadPageFailure<TModel>
  | LoadPageSuccess<TModel>
  | LoadRange<TModel>
  | LoadRangeFailure<TModel>
  | LoadRangeSuccess<TModel>
  | Create<TModel>
  | CreateFailure<TModel>
  | CreateSuccess<TModel>
  | CreateMany<TModel>
  | CreateManyFailure<TModel>
  | CreateManySuccess<TModel>
  | Update<TModel>
  | UpdateFailure<TModel>
  | UpdateSuccess<TModel>
  | UpdateMany<TModel>
  | UpdateManyFailure<TModel>
  | UpdateManySuccess<TModel>
  | Replace<TModel>
  | ReplaceFailure<TModel>
  | ReplaceSuccess<TModel>
  | ReplaceMany<TModel>
  | ReplaceManyFailure<TModel>
  | ReplaceManySuccess<TModel>
  | Delete<TModel>
  | DeleteFailure<TModel>
  | DeleteSuccess<TModel>
  | DeleteMany<TModel>
  | DeleteManyFailure<TModel>
  | DeleteManySuccess<TModel>
  | Clear<TModel>
  | Select<TModel>
  | SelectByKey<TModel>
  | SelectMany<TModel>
  | SelectManyByKeys<TModel>
  | Selected<TModel>
  | SelectedMany<TModel>
  | Deselect<TModel>
  | DeselectMany<TModel>
  | DeselectManyByKeys<TModel>
  | Deselected<TModel>
  | DeselectedMany<TModel>;

export const isEntityActionInstance = (action: IEntityAction): boolean =>
  action instanceof Load ||
  action instanceof LoadSuccess ||
  action instanceof LoadFailure ||
  action instanceof LoadMany ||
  action instanceof LoadManySuccess ||
  action instanceof LoadManyFailure ||
  action instanceof LoadAll ||
  action instanceof LoadAllSuccess ||
  action instanceof LoadAllFailure ||
  action instanceof LoadPage ||
  action instanceof LoadPageSuccess ||
  action instanceof LoadPageFailure ||
  action instanceof LoadRange ||
  action instanceof LoadRangeSuccess ||
  action instanceof LoadRangeFailure ||
  action instanceof Create ||
  action instanceof CreateSuccess ||
  action instanceof CreateFailure ||
  action instanceof CreateMany ||
  action instanceof CreateManySuccess ||
  action instanceof CreateManyFailure ||
  action instanceof Update ||
  action instanceof UpdateSuccess ||
  action instanceof UpdateFailure ||
  action instanceof UpdateMany ||
  action instanceof UpdateManySuccess ||
  action instanceof UpdateManyFailure ||
  action instanceof Replace ||
  action instanceof ReplaceSuccess ||
  action instanceof ReplaceFailure ||
  action instanceof ReplaceMany ||
  action instanceof ReplaceManySuccess ||
  action instanceof ReplaceManyFailure ||
  action instanceof Delete ||
  action instanceof DeleteSuccess ||
  action instanceof DeleteFailure ||
  action instanceof DeleteMany ||
  action instanceof DeleteManySuccess ||
  action instanceof DeleteManyFailure ||
  action instanceof Clear ||
  action instanceof Select ||
  action instanceof SelectByKey ||
  action instanceof SelectMany ||
  action instanceof SelectManyByKeys ||
  action instanceof Selected ||
  action instanceof SelectedMany ||
  action instanceof Deselect ||
  action instanceof DeselectMany ||
  action instanceof DeselectManyByKeys ||
  action instanceof DeselectAll ||
  action instanceof Deselected ||
  action instanceof DeselectedMany;

/**
 * Operator to filter actions by an entity action type or multiple action types.
 *
 * @param allowedActionTypes One or more action type string constants
 */
export function ofEntityAction<T extends IEntityAction>(
  ...allowedActionTypes: EntityActionTypes[]
): OperatorFunction<Action, T> {
  return filter((action: IEntityAction): action is T => {
    return isEntityActionInstance(action)
      ? allowedActionTypes.some(type => setType(type, action.info) === action.type)
      : false;
  });
}

/**
 * Operator to filter actions by an entity and action type or multiple action types.
 *
 * @param entity The entity class
 * @param allowedActionTypes One or more action type string constants
 */
export function ofEntityType<TModel, T extends EntityAction<TModel>>(
  entity: new () => TModel,
  ...allowedActionTypes: EntityActionTypes[]
): OperatorFunction<Action, T> {
  return filter((action: EntityAction<TModel>): action is T => {
    return isEntityActionInstance(action)
      ? action.info.modelType === entity && allowedActionTypes.some(type => setType(type, action.info) === action.type)
      : false;
  });
}
