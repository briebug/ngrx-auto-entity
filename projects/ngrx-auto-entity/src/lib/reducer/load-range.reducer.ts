import { EntityActionTypes } from '../actions/action-types';
import { LoadRangeSuccess } from '../actions/load-range-actions';
import { IEntityState } from '../util/entity-state';
import { ReductionBasis } from './reducer';
import { cloneEntities, cloneIds, mergeMany, pushMany, setNewState, warnMissingRangeInfo } from './reduction.utils';

export const loadRangeReducer = ({ state, action, stateName, featureName, entityState }: ReductionBasis) => {
  switch (action.actionType) {
    case EntityActionTypes.LoadRange: {
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
    case EntityActionTypes.LoadRangeFailure: {
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
    case EntityActionTypes.LoadRangeSuccess: {
      const loadRangeEntities = (action as LoadRangeSuccess<any>).entities;
      const entities = cloneEntities(entityState.entities);
      const ids = cloneIds(entityState.ids);
      const rangeInfo = (action as LoadRangeSuccess<any>).rangeInfo;
      if (!rangeInfo) {
        warnMissingRangeInfo(action);
      }

      const newState: IEntityState<any> = {
        ...entityState,
        entities: mergeMany(entities, loadRangeEntities, action),
        ids: pushMany(ids, loadRangeEntities, action),
        tracking: {
          ...entityState.tracking,
          isLoading: false,
          loadedAt: Date.now()
        },
        paging: {
          ...entityState.paging,
          currentRange: rangeInfo.range,
          totalPageableCount: rangeInfo.totalCount
        }
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
  }
};
