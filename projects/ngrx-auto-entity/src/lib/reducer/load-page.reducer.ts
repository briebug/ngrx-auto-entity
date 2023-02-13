import { EntityActionTypes } from '../actions/action-types';
import { LoadPageSuccess } from '../actions/load-page-actions';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { mergeMany, safeGetKey, setNewState, warnMissingPageInfo } from './reduction.utils';

export const loadPageReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.LoadPage: {
      const newState: IEntityState<any> = {
        ...entityState,
        tracking: {
          ...entityState.tracking,
          isLoading: true
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.LoadPageFailure: {
      const newState: IEntityState<any> = {
        ...entityState,
        tracking: {
          ...entityState.tracking,
          isLoading: false
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityActionTypes.LoadPageSuccess: {
      const loadPageEntities = (action as LoadPageSuccess<any>).entities;
      const loadedIds = loadPageEntities.map(entity => safeGetKey(action, entity));
      const pageInfo = (action as LoadPageSuccess<any>).pageInfo;
      if (!pageInfo) {
        warnMissingPageInfo(action);
      }

      const newState: IEntityState<any> = {
        ...entityState,
        entities: mergeMany({}, loadPageEntities, action),
        ids: loadedIds,
        paging: {
          ...entityState.tracking,
          currentPage: pageInfo.page,
          totalPageableCount: pageInfo.totalCount
        },
        tracking: {
          ...entityState.tracking,
          isLoading: false,
          loadedAt: Date.now()
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
  }
};
