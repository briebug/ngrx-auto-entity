import { Action } from '@ngrx/store';
import { pascalCase } from 'change-case';
import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IPageInfo, IRangeInfo, Page, Range } from './models';

export enum EntityActionTypes {
  Load = '[Entity] Generic Load',
  LoadSuccess = '[Entity] Generic Load: Success',
  LoadFailure = '[Entity] Generic Load: Failure',

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

  Update = '[Entity] Generic Update',
  UpdateSuccess = '[Entity] Generic Update: Success',
  UpdateFailure = '[Entity] Generic Update: Failure',

  Delete = '[Entity] Generic Delete',
  DeleteSuccess = '[Entity] Generic Delete: Success',
  DeleteFailure = '[Entity] Generic Delete: Failure'
}

/**
 * Entity class
 */
export interface IEntityInfo {
  modelName: string;
  modelType: { new (): any };
}

/**
 * Structure for all of this library's actions
 */
export class EntityAction implements Action {
  type: string;
  actionType: string;
  info: IEntityInfo;
}

const setInfo = (type: any): IEntityInfo => {
  return {
    modelType: type,
    modelName: new type().constructor.name
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
export class Load<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.Load;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public keys: any, public relationKeys?: any) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

export class LoadSuccess<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.LoadSuccess;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public entity: TModel) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

export class LoadFailure<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.LoadFailure;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public error: any) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

/**
 * Loads all instance of an entity, corresponding to HTTP GET /entity operation
 */
export class LoadAll<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.LoadAll;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public relationKeys?: any) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

export class LoadAllSuccess<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.LoadAllSuccess;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public entities: TModel[]) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

export class LoadAllFailure<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.LoadAllFailure;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public error: any) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

/**
 * Loads a single page of entities, corresponding to HTTP GET /entity?page&size operation
 */
export class LoadPage<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.LoadPage;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public page: Page, public relationKeys?: any) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

export class LoadPageSuccess<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.LoadPageSuccess;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public entities: TModel[], public pageInfo: IPageInfo) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

export class LoadPageFailure<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.LoadPageFailure;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public error: any) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

/**
 * Loads a range of entities, corresponding to HTTP GET /entity?start&end|first&last|skip&take operation
 */
export class LoadRange<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.LoadRange;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public range: Range, public relationKeys?: any) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

export class LoadRangeSuccess<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.LoadRangeSuccess;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public entities: TModel[], public rangeInfo: IRangeInfo) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

export class LoadRangeFailure<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.LoadRangeFailure;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public error: any) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

/**
 * Creates a single entity, corresponding to HTTP POST operation
 */
export class Create<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.Create;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public entity: TModel, public relationKeys?: any) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

export class CreateSuccess<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.CreateSuccess;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public entity: TModel) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

export class CreateFailure<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.CreateFailure;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public error: any) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

/**
 * Updates a single entity, corresponding to HTTP PUT or PATCH operation.
 *
 * PUT: Replace the entity with the one supplied in the request
 * PATCH: Update just the supplied attributes of the entity
 */
export class Update<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.Update;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public entity: TModel, public relationKeys?: any) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

export class UpdateSuccess<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.UpdateSuccess;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public entity: TModel) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

export class UpdateFailure<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.UpdateFailure;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public error: any) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

/**
 * Deletes a single entity, corresponding to HTTP DELETE operation
 */
export class Delete<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.Delete;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public entity: TModel, public relationKeys?: any) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

export class DeleteSuccess<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.DeleteSuccess;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public entity: TModel) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

export class DeleteFailure<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.DeleteFailure;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public error: any) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

export type EntityActions<TModel> =
  | Load<TModel>
  | LoadFailure<TModel>
  | LoadSuccess<TModel>
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
  | Update<TModel>
  | UpdateFailure<TModel>
  | UpdateSuccess<TModel>
  | Delete<TModel>
  | DeleteFailure<TModel>
  | DeleteSuccess<TModel>;

/**
 * Operator to filter actions by an entity action type or multiple action types.
 *
 * @param allowedActionTypes One or more action type string constants
 */
export function ofEntityAction<T extends EntityAction>(
  ...allowedActionTypes: EntityActionTypes[]
): OperatorFunction<Action, T> {
  return filter(
    (action: EntityAction): action is T => {
      return action instanceof Load ||
        action instanceof LoadSuccess ||
        action instanceof LoadFailure ||
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
        action instanceof Update ||
        action instanceof UpdateSuccess ||
        action instanceof UpdateFailure ||
        action instanceof Delete ||
        action instanceof DeleteSuccess ||
        action instanceof DeleteFailure
        ? allowedActionTypes.some(type => setType(type, action.info) === action.type)
        : false;
    }
  );
}

/**
 * Operator to filter actions by an entity and action type or multiple action types.
 *
 * @param entity The entity class
 * @param allowedActionTypes One or more action type string constants
 */
export function ofEntityType<TModel, T extends EntityAction>(
  entity: { new (): TModel },
  ...allowedActionTypes: EntityActionTypes[]
): OperatorFunction<Action, T> {
  return filter(
    (action: EntityAction): action is T => {
      if (
        action instanceof Load ||
        action instanceof LoadSuccess ||
        action instanceof LoadFailure ||
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
        action instanceof Update ||
        action instanceof UpdateSuccess ||
        action instanceof UpdateFailure ||
        action instanceof Delete ||
        action instanceof DeleteSuccess ||
        action instanceof DeleteFailure
      ) {
        return (
          action.info.modelType === entity &&
          allowedActionTypes.some(type => setType(type, action.info) === action.type)
        );
      }
      return false;
    }
  );
}
