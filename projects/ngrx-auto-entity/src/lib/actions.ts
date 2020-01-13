import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { merge, Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

import { pascalCase } from '../util/case';
import { IEntityOptions } from './decorators/entity';
import { ENTITY_OPTS_PROP } from './decorators/entity-tokens';
import { checkKeyName } from './decorators/key';
import { IPageInfo, IRangeInfo, Page, Range } from './models';
import { EntityIdentity } from './util';

export enum EntityActionTypes {
  Load = '[Entity] (Generic) Load',
  LoadSuccess = '[Entity] (Generic) Load: Success',
  LoadFailure = '[Entity] (Generic) Load: Failure',

  LoadMany = '[Entity] (Generic) Load Many',
  LoadManySuccess = '[Entity] (Generic) Load Many: Success',
  LoadManyFailure = '[Entity] (Generic) Load Many: Failure',

  LoadAll = '[Entity] (Generic) Load All',
  LoadAllSuccess = '[Entity] (Generic) Load All: Success',
  LoadAllFailure = '[Entity] (Generic) Load All: Failure',

  LoadPage = '[Entity] (Generic) Load Page',
  LoadPageSuccess = '[Entity] (Generic) Load Page: Success',
  LoadPageFailure = '[Entity] (Generic) Load Page: Failure',

  LoadRange = '[Entity] (Generic) Load Range',
  LoadRangeSuccess = '[Entity] (Generic) Load Range: Success',
  LoadRangeFailure = '[Entity] (Generic) Load Range: Failure',

  Create = '[Entity] (Generic) Create',
  CreateSuccess = '[Entity] (Generic) Create: Success',
  CreateFailure = '[Entity] (Generic) Create: Failure',

  CreateMany = '[Entity] (Generic) Create Many',
  CreateManySuccess = '[Entity] (Generic) Create Many: Success',
  CreateManyFailure = '[Entity] (Generic) Create Many: Failure',

  Update = '[Entity] (Generic) Update',
  UpdateSuccess = '[Entity] (Generic) Update: Success',
  UpdateFailure = '[Entity] (Generic) Update: Failure',

  UpdateMany = '[Entity] (Generic) Update Many',
  UpdateManySuccess = '[Entity] (Generic) Update Many: Success',
  UpdateManyFailure = '[Entity] (Generic) Update Many: Failure',

  Replace = '[Entity] (Generic) Replace',
  ReplaceSuccess = '[Entity] (Generic) Replace: Success',
  ReplaceFailure = '[Entity] (Generic) Replace: Failure',

  ReplaceMany = '[Entity] (Generic) Replace Many',
  ReplaceManySuccess = '[Entity] (Generic) Replace Many: Success',
  ReplaceManyFailure = '[Entity] (Generic) Replace Many: Failure',

  Delete = '[Entity] (Generic) Delete',
  DeleteSuccess = '[Entity] (Generic) Delete: Success',
  DeleteFailure = '[Entity] (Generic) Delete: Failure',

  DeleteMany = '[Entity] (Generic) Delete Many',
  DeleteManySuccess = '[Entity] (Generic) Delete Many: Success',
  DeleteManyFailure = '[Entity] (Generic) Delete Many: Failure',

  Clear = '[Entity] (Generic) Clear',

  Select = '[Entity] (Generic) Select',
  SelectByKey = '[Entity] (Generic) Select by Key',
  Selected = '[Entity] (Generic) Selection',

  SelectMany = '[Entity] (Generic) Select Many',
  SelectMore = '[Entity] (Generic) Select More',
  SelectManyByKeys = '[Entity] (Generic) Select Many by Keys',
  SelectMoreByKeys = '[Entity] (Generic) Select More by Keys',
  SelectedMany = '[Entity] (Generic) Selection of Many',
  SelectedMore = '[Entity] (Generic) Selection of More',

  Deselect = '[Entity] (Generic) Deselect',
  Deselected = '[Entity] (Generic) Deselection',

  DeselectMany = '[Entity] (Generic) Deselect of Many',
  DeselectManyByKeys = '[Entity] (Generic) Deselect of Many by Keys',
  DeselectAll = '[Entity] (Generic) Deselect of All',
  DeselectedMany = '[Entity] (Generic) Deselection of Many',

  Edit = '[Entity] (Generic) Edit',
  Edited = '[Entity] (Generic) Edited',
  Change = '[Entity] (Generic) Change',
  Changed = '[Entity] (Generic) Changed',
  EndEdit = '[Entity] (Generic) Edit: End',
  EditEnded = '[Entity] (Generic) Edit: Ended'
}

/**
 * Entity class
 */
export interface IEntityInfo {
  modelName: string;
  pluralName?: string;
  uriName?: string;
  modelType: new () => any;
}

export type TNew<TModel> = new () => TModel;

export interface ICorrelatedAction {
  correlationId: string;
}

export interface IEntityAction extends Action, ICorrelatedAction {
  actionType: string;
  info: IEntityInfo;
}

// tslint:disable
const uuid = (a?, b?) => {
  for (
    b = a = '';
    a++ < 36;
    b += (a * 51) & 52 ? (a ^ 15 ? 8 ^ (Math.random() * (a ^ 20 ? 16 : 4)) : 4).toString(16) : '-'
  );
  return b;
};

// tslint:enable

/**
 * Structure for all of this library's actions
 */
export abstract class EntityAction<TModel> implements IEntityAction {
  type: string;
  info: IEntityInfo;

  protected constructor(type: TNew<TModel>, public actionType: string, public correlationId: string = uuid()) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

const setInfo = (type: any): IEntityInfo => {
  const instance = new type();
  const opts = (type[ENTITY_OPTS_PROP] || { modelName: instance.constructor.name }) as IEntityOptions;
  const modelName = opts.modelName;
  checkKeyName(type, modelName);
  return {
    modelType: type,
    modelName,
    pluralName: opts.pluralName,
    uriName: opts.uriName
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
  constructor(type: new () => TModel, public keys: any, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Load, correlationId);
  }
}

export class LoadSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, correlationId?: string) {
    super(type, EntityActionTypes.LoadSuccess, correlationId);
  }
}

export class LoadFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadFailure, correlationId);
  }
}

/**
 * Loads many instances of an entity (updating existing state), corresponding to HTTP GET /entity operation
 */
export class LoadMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadMany, correlationId);
  }
}

export class LoadManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], correlationId?: string) {
    super(type, EntityActionTypes.LoadManySuccess, correlationId);
  }
}

export class LoadManyFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadManyFailure, correlationId);
  }
}

/**
 * Loads all instance of an entity (replacing existing state), corresponding to HTTP GET /entity operation
 */
export class LoadAll<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadAll, correlationId);
  }
}

export class LoadAllSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], correlationId?: string) {
    super(type, EntityActionTypes.LoadAllSuccess, correlationId);
  }
}

export class LoadAllFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadAllFailure, correlationId);
  }
}

/**
 * Loads a single page of entities, corresponding to HTTP GET /entity?page&size operation
 */
export class LoadPage<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public page: Page, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadPage, correlationId);
  }
}

export class LoadPageSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public pageInfo: IPageInfo, correlationId?: string) {
    super(type, EntityActionTypes.LoadPageSuccess, correlationId);
  }
}

export class LoadPageFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadPageFailure, correlationId);
  }
}

/**
 * Loads a range of entities, corresponding to HTTP GET /entity?start&end|first&last|skip&take operation
 */
export class LoadRange<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public range: Range, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadRange, correlationId);
  }
}

export class LoadRangeSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public rangeInfo: IRangeInfo, correlationId?: string) {
    super(type, EntityActionTypes.LoadRangeSuccess, correlationId);
  }
}

export class LoadRangeFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, correlationId?: string) {
    super(type, EntityActionTypes.LoadRangeFailure, correlationId);
  }
}

/**
 * Creates a single entity, corresponding to HTTP POST operation
 */
export class Create<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Create, correlationId);
  }
}

export class CreateSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, correlationId?: string) {
    super(type, EntityActionTypes.CreateSuccess, correlationId);
  }
}

export class CreateFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, correlationId?: string) {
    super(type, EntityActionTypes.CreateFailure, correlationId);
  }
}

/**
 * Creates many entities, corresponding to HTTP POST operation
 */
export class CreateMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.CreateMany, correlationId);
  }
}

export class CreateManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], correlationId?: string) {
    super(type, EntityActionTypes.CreateManySuccess, correlationId);
  }
}

export class CreateManyFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, correlationId?: string) {
    super(type, EntityActionTypes.CreateManyFailure, correlationId);
  }
}

/**
 * Updates a single entity, corresponding to HTTP PATCH operation.
 *
 * PATCH: Update just the supplied attributes of the entity
 */
export class Update<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Update, correlationId);
  }
}

export class UpdateSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, correlationId?: string) {
    super(type, EntityActionTypes.UpdateSuccess, correlationId);
  }
}

export class UpdateFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, correlationId?: string) {
    super(type, EntityActionTypes.UpdateFailure, correlationId);
  }
}

/**
 * Updates many entities, corresponding to HTTP PATCH operation.
 *
 * PATCH: Update just the supplied attributes of the entities
 */
export class UpdateMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.UpdateMany, correlationId);
  }
}

export class UpdateManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], correlationId?: string) {
    super(type, EntityActionTypes.UpdateManySuccess, correlationId);
  }
}

export class UpdateManyFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, correlationId?: string) {
    super(type, EntityActionTypes.UpdateManyFailure, correlationId);
  }
}

/**
 * Replaces a single entity, corresponding to HTTP PUT operation.
 *
 * PUT: Replace the entity with the one supplied in the request
 */
export class Replace<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Replace, correlationId);
  }
}

export class ReplaceSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, correlationId?: string) {
    super(type, EntityActionTypes.ReplaceSuccess, correlationId);
  }
}

export class ReplaceFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, correlationId?: string) {
    super(type, EntityActionTypes.ReplaceFailure, correlationId);
  }
}

/**
 * Replaces many entities, corresponding to HTTP PUT operation.
 *
 * PUT: Replace the entities with the ones supplied in the request
 */
export class ReplaceMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.ReplaceMany, correlationId);
  }
}

export class ReplaceManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], correlationId?: string) {
    super(type, EntityActionTypes.ReplaceManySuccess, correlationId);
  }
}

export class ReplaceManyFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, correlationId?: string) {
    super(type, EntityActionTypes.ReplaceManyFailure, correlationId);
  }
}

/**
 * Deletes a single entity, corresponding to HTTP DELETE operation
 */
export class Delete<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.Delete, correlationId);
  }
}

export class DeleteSuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, correlationId?: string) {
    super(type, EntityActionTypes.DeleteSuccess, correlationId);
  }
}

export class DeleteFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteFailure, correlationId);
  }
}

/**
 * Deletes many entities, corresponding to HTTP DELETE operation
 */
export class DeleteMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], public criteria?: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteMany, correlationId);
  }
}

export class DeleteManySuccess<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], correlationId?: string) {
    super(type, EntityActionTypes.DeleteManySuccess, correlationId);
  }
}

export class DeleteManyFailure<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public error: any, correlationId?: string) {
    super(type, EntityActionTypes.DeleteManyFailure, correlationId);
  }
}

/**
 * Clears all entities for this model from state
 */
export class Clear<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, correlationId?: string) {
    super(type, EntityActionTypes.Clear, correlationId);
  }
}

/**
 * Selects a single entity in the store by the entity model
 */
export class Select<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel, correlationId?: string) {
    super(type, EntityActionTypes.Select, correlationId);

    if (entity == null) {
      throw new Error('[NGRX-AE] ! SelectByKey requires an entity.');
    }
  }
}

/**
 * Selects a single entity in the store by the entity key
 */
export class SelectByKey<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entityKey: EntityIdentity, correlationId?: string) {
    super(type, EntityActionTypes.SelectByKey, correlationId);

    if (entityKey == null) {
      throw new Error('[NGRX-AE] ! SelectByKey requires an entity key.');
    }
  }
}

/**
 * Selects many entities in the store by the entity models
 */
export class SelectMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], correlationId?: string) {
    super(type, EntityActionTypes.SelectMany, correlationId);

    if (!Array.isArray(entities)) {
      throw new Error('[NGRX-AE] ! SelectMany action requires an array of entities.');
    }
  }
}

/**
 * Selects more entities in the store by the entity models
 */
export class SelectMore<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], correlationId?: string) {
    super(type, EntityActionTypes.SelectMore, correlationId);

    if (!Array.isArray(entities)) {
      throw new Error('[NGRX-AE] ! SelectMore action requires an array of entities.');
    }
  }
}

/**
 * Selects many entities in the store by the entity keys
 */
export class SelectManyByKeys<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entitiesKeys: EntityIdentity[], correlationId?: string) {
    super(type, EntityActionTypes.SelectManyByKeys, correlationId);

    if (!Array.isArray(entitiesKeys)) {
      throw new Error('[NGRX-AE] ! SelectManyByKeys action requires an array of entity keys.');
    }
  }
}

/**
 * Selects more entities in the store by the entity keys
 */
export class SelectMoreByKeys<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entitiesKeys: EntityIdentity[], correlationId?: string) {
    super(type, EntityActionTypes.SelectMoreByKeys, correlationId);

    if (!Array.isArray(entitiesKeys)) {
      throw new Error('[NGRX-AE] ! SelectMoreByKeys action requires an array of entity keys.');
    }
  }
}

/**
 * Indicates the selection of a single entity in the store
 */
export class Selected<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: TModel | EntityIdentity, correlationId?: string) {
    super(type, EntityActionTypes.Selected, correlationId);
  }
}

/**
 * Indicates the selection of many entities in the store
 */
export class SelectedMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: Array<TModel | EntityIdentity>, correlationId?: string) {
    super(type, EntityActionTypes.SelectedMany, correlationId);

    if (!Array.isArray(entities)) {
      throw new Error('[NGRX-AE] ! SelectedMany action requires an array of entities or keys.');
    }
  }
}

/**
 * Indicates the selection of more entities in the store
 */
export class SelectedMore<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: Array<TModel | EntityIdentity>, correlationId?: string) {
    super(type, EntityActionTypes.SelectedMore, correlationId);

    if (!Array.isArray(entities)) {
      throw new Error('[NGRX-AE] ! SelectedMore action requires an array of entities or keys.');
    }
  }
}

/**
 * De-selects a single entity in the store
 */
export class Deselect<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, correlationId?: string) {
    super(type, EntityActionTypes.Deselect, correlationId);
  }
}

/**
 * De-selects many entities in the store
 */
export class DeselectMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: TModel[], correlationId?: string) {
    super(type, EntityActionTypes.DeselectMany, correlationId);

    if (!Array.isArray(entities)) {
      throw new Error('[NGRX-AE] ! DeselectMany action requires an array of entities.');
    }
  }
}

/**
 * De-selects many entities in the store by entity keys
 */
export class DeselectManyByKeys<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entitiesKeys: EntityIdentity[], correlationId?: string) {
    super(type, EntityActionTypes.DeselectManyByKeys, correlationId);

    if (!Array.isArray(entitiesKeys)) {
      throw new Error('[NGRX-AE] ! DeselectManyByKeys action requires an array of entity keys.');
    }
  }
}

/**
 * De-selects all entities in the store
 */
export class DeselectAll<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, correlationId?: string) {
    super(type, EntityActionTypes.DeselectAll, correlationId);
  }
}

/**
 * Indicates the de-selection of a single entity in the store
 */
export class Deselected<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, correlationId?: string) {
    super(type, EntityActionTypes.Deselected, correlationId);
  }
}

/**
 * Indicates the de-selection of many entities in the store
 */
export class DeselectedMany<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entities: Array<TModel | EntityIdentity>, correlationId?: string) {
    super(type, EntityActionTypes.DeselectedMany, correlationId);

    if (!Array.isArray(entities)) {
      throw new Error('[NGRX-AE] ! DeselectedMany action requires an array of entities or keys.');
    }
  }
}

/**
 * Tracks an entity as being edited in the store
 */
export class Edit<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: Partial<TModel>, correlationId?: string) {
    super(type, EntityActionTypes.Edit, correlationId);
  }
}

/**
 * Indicates an entity is being tracked as edited in the store
 */
export class Edited<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: Partial<TModel>, correlationId?: string) {
    super(type, EntityActionTypes.Edited, correlationId);
  }
}

/**
 * Indicates a change is occurring to the edited entity in the store
 */
export class Change<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: Partial<TModel>, correlationId?: string) {
    super(type, EntityActionTypes.Change, correlationId);
  }
}

/**
 * Indicates a change has occurred to the edited entity in the store
 */
export class Changed<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, public entity: Partial<TModel>, correlationId?: string) {
    super(type, EntityActionTypes.Changed, correlationId);
  }
}

/**
 * Ends editing of currently edited entity and clears it from state
 */
export class EndEdit<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, correlationId?: string) {
    super(type, EntityActionTypes.EndEdit, correlationId);
  }
}

/**
 * Indicates editing of currently edited entity has ended
 */
export class EditEnded<TModel> extends EntityAction<TModel> {
  constructor(type: new () => TModel, correlationId?: string) {
    super(type, EntityActionTypes.EditEnded, correlationId);
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
  | DeselectedMany<TModel>
  | Edit<TModel>
  | Edited<TModel>
  | Change<TModel>
  | Changed<TModel>
  | EndEdit<TModel>
  | EditEnded<TModel>;

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
  action instanceof DeselectedMany ||
  action instanceof Edit ||
  action instanceof Edited ||
  action instanceof Change ||
  action instanceof Changed ||
  action instanceof EndEdit ||
  action instanceof EditEnded;

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
    // console.log('ofEntityType action', JSON.stringify(action, undefined, 2), 'setType');
    // allowedActionTypes.forEach(type => console.log('setType', setType(type, action.info), '===', action.type));
    return isEntityActionInstance(action)
      ? action.info.modelType === entity && allowedActionTypes.some(type => setType(type, action.info) === action.type)
      : false;
  });
}

export function fromEntityActions<T extends EntityAction<any>>(
  actions$: Actions,
  entity: Array<new () => any>,
  ...allowedActionTypes: EntityActionTypes[]
): Observable<Action> {
  const entityActions = entity.map(e => actions$.pipe(ofEntityType(e, ...allowedActionTypes)));
  return merge(...entityActions);
}
