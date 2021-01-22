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
  createDeleteByKeyAction,
  createDeleteByKeyFailureAction,
  createDeleteByKeySuccessAction,
  createDeleteManyByKeysAction,
  createDeleteManyByKeysFailureAction,
  createDeleteManyByKeysSuccessAction
} from '../factories/delete-by-key-factories';
import {
  createDeleteAction,
  createDeleteFailureAction,
  createDeleteManyAction,
  createDeleteManyFailureAction,
  createDeleteManySuccessAction,
  createDeleteSuccessAction
} from '../factories/delete-factories';
import {
  createDeselectAction,
  createDeselectAllAction,
  createDeselectedAction,
  createDeselectedManyAction,
  createDeselectManyAction,
  createDeselectManyByKeysAction
} from '../factories/deselection-factories';
import {
  createChangeAction,
  createChangedAction,
  createEditAction,
  createEditByKeyAction,
  createEditedAction,
  createEditedByKeyAction,
  createEditEndedAction,
  createEditNewAction,
  createEndEditAction
} from '../factories/edit-factories';
import { createClearAction } from '../factories/factories';
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
  createSelectAction,
  createSelectByKeyAction,
  createSelectedAction,
  createSelectedManyAction,
  createSelectedMoreAction,
  createSelectManyAction,
  createSelectManyByKeysAction,
  createSelectMoreAction,
  createSelectMoreByKeysAction
} from '../factories/selection-factories';
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

    get clear() {
      return createClearAction(Type);
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

    get deleteByKey() {
      return createDeleteByKeyAction(Type);
    }

    get deleteByKeySuccess() {
      return createDeleteByKeySuccessAction(Type);
    }

    get deleteByKeyFailure() {
      return createDeleteByKeyFailureAction(Type);
    }

    get deleteManyByKeys() {
      return createDeleteManyByKeysAction(Type);
    }

    get deleteManyByKeysSuccess() {
      return createDeleteManyByKeysSuccessAction(Type);
    }

    get deleteManyByKeysFailure() {
      return createDeleteManyByKeysFailureAction(Type);
    }

    get deselect() {
      return createDeselectAction(Type);
    }

    get deselectMany() {
      return createDeselectManyAction(Type);
    }

    get deselectManyByKeys() {
      return createDeselectManyByKeysAction(Type);
    }

    get deselectAll() {
      return createDeselectAllAction(Type);
    }

    get deselected() {
      return createDeselectedAction(Type);
    }

    get deselectedMany() {
      return createDeselectedManyAction(Type);
    }

    get select() {
      return createSelectAction(Type);
    }

    get selectByKey() {
      return createSelectByKeyAction(Type);
    }

    get selectMany() {
      return createSelectManyAction(Type);
    }

    get selectMore() {
      return createSelectMoreAction(Type);
    }

    get selectManyByKeys() {
      return createSelectManyByKeysAction(Type);
    }

    get selectMoreByKeys() {
      return createSelectMoreByKeysAction(Type);
    }

    get selected() {
      return createSelectedAction(Type);
    }

    get selectedMany() {
      return createSelectedManyAction(Type);
    }

    get selectedMore() {
      return createSelectedMoreAction(Type);
    }

    get editNew() {
      return createEditNewAction(Type);
    }

    get edit() {
      return createEditAction(Type);
    }

    get editByKey() {
      return createEditByKeyAction(Type);
    }

    get edited() {
      return createEditedAction(Type);
    }

    get editedByKey() {
      return createEditedByKeyAction(Type);
    }

    get change() {
      return createChangeAction(Type);
    }

    get changed() {
      return createChangedAction(Type);
    }

    get endEdit() {
      return createEndEditAction(Type);
    }

    get editEnded() {
      return createEditEndedAction(Type);
    }
  }

  const actionMap = new ActionFactoryResolver();
  return actionMap;
};
