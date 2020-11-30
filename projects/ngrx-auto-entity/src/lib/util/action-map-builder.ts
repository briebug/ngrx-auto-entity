import { TNew } from '../actions/model-constructor';
import {
  createLoadAllAction,
  createLoadAllFailureAction,
  createLoadAllIfNecessaryAction,
  createLoadAllSuccessAction
} from '../factories/load-all-factories';
import {
  createLoadAction,
  createLoadFailureAction,
  createLoadIfNecessaryAction,
  createLoadSuccessAction
} from '../factories/load-factories';
import {
  createLoadManyAction,
  createLoadManyFailureAction,
  createLoadManyIfNecessaryAction,
  createLoadManySuccessAction
} from '../factories/load-many-factories';
import {
  createLoadPageAction,
  createLoadPageFailureAction,
  createLoadPageIfNecessaryAction,
  createLoadPageSuccessAction
} from '../factories/load-page-factories';
import {
  createLoadRangeAction,
  createLoadRangeFailureAction,
  createLoadRangeIfNecessaryAction,
  createLoadRangeSuccessAction
} from '../factories/load-range-factories';
import { IActionMap } from './action-map';

export const buildActionMap = <TModel>(Type: TNew<TModel>): IActionMap<TModel> => {
  class ActionFactoryResolver implements IActionMap<TModel> {
    get load() {
      return createLoadAction(Type);
    }

    get loadIfNecessary() {
      return createLoadIfNecessaryAction(Type);
    }

    get loadSuccess() {
      return createLoadSuccessAction(Type);
    }

    get loadFailure() {
      return createLoadFailureAction(Type);
    }

    get loadAll() {
      return createLoadAllAction(Type);
    }

    get loadAllIfNecessary() {
      return createLoadAllIfNecessaryAction(Type);
    }

    get loadAllSuccess() {
      return createLoadAllSuccessAction(Type);
    }

    get loadAllFailure() {
      return createLoadAllFailureAction(Type);
    }

    get loadMany() {
      return createLoadManyAction(Type);
    }

    get loadManyIfNecessary() {
      return createLoadManyIfNecessaryAction(Type);
    }

    get loadManySuccess() {
      return createLoadManySuccessAction(Type);
    }

    get loadManyFailure() {
      return createLoadManyFailureAction(Type);
    }

    get loadPage() {
      return createLoadPageAction(Type);
    }

    get loadPageIfNecessary() {
      return createLoadPageIfNecessaryAction(Type);
    }

    get loadPageSuccess() {
      return createLoadPageSuccessAction(Type);
    }

    get loadPageFailure() {
      return createLoadPageFailureAction(Type);
    }

    get loadRange() {
      return createLoadRangeAction(Type);
    }

    get loadRangeIfNecessary() {
      return createLoadRangeIfNecessaryAction(Type);
    }

    get loadRangeSuccess() {
      return createLoadRangeSuccessAction(Type);
    }

    get loadRangeFailure() {
      return createLoadRangeFailureAction(Type);
    }
  }

  const actionMap = new ActionFactoryResolver();
  return actionMap;
};
