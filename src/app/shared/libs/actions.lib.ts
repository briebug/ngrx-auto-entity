import { ICorrelatedAction } from '@briebug/ngrx-auto-entity';
import { ActionCreator, TypedAction } from '@ngrx/store/src/models';
import uuidv4 from 'uuidv4';

// TODO: Find a way to integrate NgRx's createAction function into this
export function createCorrelatedAction<T extends string, P extends object>(
  type: T,
  config: { _as: 'props'; _p: P }
): ActionCreator<T, (props: P) => P & TypedAction<T> & ICorrelatedAction> {
  return Object.defineProperty(
    (props: P): P & TypedAction<T> & ICorrelatedAction => {
      return {
        ...props,
        type,
        correlationId: uuidv4()
      };
    },
    'type',
    { value: type, writable: false }
  );
}
