import { EntityActionTypes } from '../actions/action-types';
import { Change, Edit, EditByKey, EditNew } from '../actions/edit-actions';
import { getKey } from '../decorators/key-util';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { safeGetKey, setNewState } from './reduction.utils';

export const editsReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.EditNew: {
      const editEntity = (action as EditNew<any>).entity || {};
      if (!editEntity) {
        return state;
      }

      const newState: IEntityState<any> = {
        ...entityState,
        edits: {
          editedEntity: { ...editEntity }, // TODO: Figure out a deep clone option here!!
          isDirty: false
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.Edit: {
      const editEntity = (action as Edit<any>).entity;
      if (!editEntity) {
        return state;
      }

      const editedKey = safeGetKey(action, editEntity);
      const prevEditedKey = entityState.edits.editedEntity && getKey(action, entityState.edits.editedEntity);
      if (editedKey === prevEditedKey) {
        return state;
      }

      const newState: IEntityState<any> = {
        ...entityState,
        edits: {
          editedEntity: { ...editEntity }, // TODO: Figure out a deep clone option here!!
          isDirty: false
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.EditByKey: {
      const editedKey = (action as EditByKey<any>).key;
      const prevEditedKey = entityState.edits.editedEntity && getKey(action, entityState.edits.editedEntity);
      if (!editedKey || editedKey === prevEditedKey) {
        return state;
      }

      const editEntity = entityState.entities[editedKey];
      if (!editEntity) {
        return state;
      }

      const newState: IEntityState<any> = {
        ...entityState,
        edits: {
          editedEntity: { ...editEntity }, // TODO: Figure out a deep clone option here!!
          isDirty: false
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.Change: {
      const changeEntity = (action as Change<any>).entity;
      if (!changeEntity || !entityState.edits.editedEntity) {
        return state;
      }

      const newState: IEntityState<any> = {
        ...entityState,
        edits: {
          editedEntity: { ...changeEntity }, // TODO: Figure out a deep clone option here!!
          isDirty: true
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.EndEdit: {
      if (entityState.edits.editedEntity === undefined) {
        return state;
      }

      const newState: IEntityState<any> = {
        ...entityState,
        edits: {
          editedEntity: undefined,
          isDirty: undefined
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
  }
};
