import { Action } from '@ngrx/store';

import { uuid } from '../../util/uuid';
import { IEntityInfo } from './entity-info';
import { TNew } from './model-constructor';
import { setInfo, setType } from './util';

export interface ICorrelatedAction {
  correlationId: string;
}

export interface IEntityAction extends Action, ICorrelatedAction {
  actionType: string;
  info: IEntityInfo;
}

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
