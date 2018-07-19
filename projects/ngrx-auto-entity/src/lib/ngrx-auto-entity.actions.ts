import { Action } from '@ngrx/store';
import { pascalCase } from 'change-case';
import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export enum EntityActionTypes {
  Load = '[Entity] Generic Load',
  LoadSuccess = '[Entity] Generic Load: Success',
  LoadFailure = '[Entity] Generic Load: Failure',

  LoadMany = '[Entity] Generic Load Many',
  LoadManySuccess = '[Entity] Generic Load Many: Success',
  LoadManyFailure = '[Entity] Generic Load Many: Failure',

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

  constructor(type: { new (): TModel }, public keys: any) {
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
 * Loads many entities, corresponding to HTTP GET /entity operation
 */
export class LoadMany<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.LoadMany;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public page: number = 0, public size: number = Number.MAX_SAFE_INTEGER) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

export class LoadManySuccess<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.LoadManySuccess;
  info: IEntityInfo;

  constructor(type: { new (): TModel }, public entities: TModel[]) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

export class LoadManyFailure<TModel> implements EntityAction {
  type: string;
  actionType = EntityActionTypes.LoadManyFailure;
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

  constructor(type: { new (): TModel }, public entity: TModel) {
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

  constructor(type: { new (): TModel }, public entity: TModel) {
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

  constructor(type: { new (): TModel }, public entity: TModel) {
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
        action instanceof LoadMany ||
        action instanceof LoadManySuccess ||
        action instanceof LoadManyFailure ||
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
