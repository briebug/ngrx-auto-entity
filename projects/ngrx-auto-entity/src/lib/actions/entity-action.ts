import { Action } from '@ngrx/store';

import { uuid } from '../../util/uuid';
import { EntityActionTypes } from './action-types';
import { IEntityInfo } from './entity-info';
import { TNew } from './model-constructor';
import { setInfo, setType } from './util';

export interface ICorrelatedAction {
  correlationId: string;
}

export interface IEntityAction extends Action, ICorrelatedAction {
  actionType: EntityActionTypes;
  info: IEntityInfo;
}

/**
 * Structure for all of this library's actions
 */
export abstract class EntityAction<TModel> implements IEntityAction {
  type: string;
  info: IEntityInfo;

  protected constructor(type: TNew<TModel>, public actionType: EntityActionTypes, public correlationId: string = uuid()) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}
