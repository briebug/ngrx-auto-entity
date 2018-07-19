import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';

export enum RouterActionType {
  back = '[Router] Back',
  forward = '[Router] Forward',
  go = '[Router] Go'
}

export class Back implements Action {
  readonly type = RouterActionType.back;
}

export class Forward implements Action {
  readonly type = RouterActionType.forward;
}

export class Go implements Action {
  readonly type = RouterActionType.go;

  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export type RouterActions = Go | Back | Forward;
