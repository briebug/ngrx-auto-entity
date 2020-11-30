import { TNew } from '../actions/model-constructor';
import {
  createCreateAction,
  createCreateFailureAction,
  createCreateManyAction,
  createCreateManyFailureAction,
  createCreateManySuccessAction,
  createCreateSuccessAction
} from '../factories/create-factories';
import {
  createDeleteAction,
  createDeleteFailureAction,
  createDeleteManyAction,
  createDeleteManyFailureAction,
  createDeleteManySuccessAction,
  createDeleteSuccessAction
} from '../factories/delete-factories';
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
import {
  createReplaceAction,
  createReplaceFailureAction,
  createReplaceManyAction,
  createReplaceManyFailureAction,
  createReplaceManySuccessAction,
  createReplaceSuccessAction
} from '../factories/replace-factories';
import {
  createUpdateAction,
  createUpdateFailureAction,
  createUpdateManyAction,
  createUpdateManyFailureAction,
  createUpdateManySuccessAction,
  createUpdateSuccessAction
} from '../factories/update-factories';
import {
  createUpsertAction,
  createUpsertFailureAction,
  createUpsertManyAction,
  createUpsertManyFailureAction,
  createUpsertManySuccessAction,
  createUpsertSuccessAction
} from '../factories/upsert-factories';
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

    get create() {
      return createCreateAction(Type);
    }

    get createSuccess() {
      return createCreateSuccessAction(Type);
    }

    get createFailure() {
      return createCreateFailureAction(Type);
    }

    get createMany() {
      return createCreateManyAction(Type);
    }

    get createManySuccess() {
      return createCreateManySuccessAction(Type);
    }

    get createManyFailure() {
      return createCreateManyFailureAction(Type);
    }

    get update() {
      return createUpdateAction(Type);
    }

    get updateSuccess() {
      return createUpdateSuccessAction(Type);
    }

    get updateFailure() {
      return createUpdateFailureAction(Type);
    }

    get updateMany() {
      return createUpdateManyAction(Type);
    }

    get updateManySuccess() {
      return createUpdateManySuccessAction(Type);
    }

    get updateManyFailure() {
      return createUpdateManyFailureAction(Type);
    }

    get upsert() {
      return createUpsertAction(Type);
    }

    get upsertSuccess() {
      return createUpsertSuccessAction(Type);
    }

    get upsertFailure() {
      return createUpsertFailureAction(Type);
    }

    get upsertMany() {
      return createUpsertManyAction(Type);
    }

    get upsertManySuccess() {
      return createUpsertManySuccessAction(Type);
    }

    get upsertManyFailure() {
      return createUpsertManyFailureAction(Type);
    }

    get replace() {
      return createReplaceAction(Type);
    }

    get replaceSuccess() {
      return createReplaceSuccessAction(Type);
    }

    get replaceFailure() {
      return createReplaceFailureAction(Type);
    }

    get replaceMany() {
      return createReplaceManyAction(Type);
    }

    get replaceManySuccess() {
      return createReplaceManySuccessAction(Type);
    }

    get replaceManyFailure() {
      return createReplaceManyFailureAction(Type);
    }

    get delete() {
      return createDeleteAction(Type);
    }

    get deleteSuccess() {
      return createDeleteSuccessAction(Type);
    }

    get deleteFailure() {
      return createDeleteFailureAction(Type);
    }

    get deleteMany() {
      return createDeleteManyAction(Type);
    }

    get deleteManySuccess() {
      return createDeleteManySuccessAction(Type);
    }

    get deleteManyFailure() {
      return createDeleteManyFailureAction(Type);
    }
  }

  const actionMap = new ActionFactoryResolver();
  return actionMap;
};
