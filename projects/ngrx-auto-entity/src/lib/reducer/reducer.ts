import { ActionReducer } from '@ngrx/store';
import { compose } from '../../util/func';
import { EntityActionTypes } from '../actions/action-types';
import { EntityActions } from '../actions/entity-actions-union';
import { IEntityState } from '../util/entity-state';
import { ENTITY_ACTION_REDUCER_MAP } from './entity-action-reducer.map';
import { featureNameFromAction, stateNameFromAction } from './reduction.utils';

export interface ReductionBasis {
  state: any;
  action: EntityActions<any>;
  stateName?: string;
  featureName?: string;
  entityState?: IEntityState<any>;
}

export type entityReducer = (basis: ReductionBasis) => any;

export const runReducer = (reducer: entityReducer) => (basis: ReductionBasis) => {
  try {
    return reducer(basis);
  } catch (err) {
    if (err.message && err.message.startsWith('[NGRX-AE]')) {
      console.error(err.message);
      return basis.state;
    }
    throw err;
  }
};

export const buildReducerParams = () => (params: ReductionBasis) => ({
  ...params,
  stateName: stateNameFromAction(params.action),
  featureName: featureNameFromAction(params.action)
});

export const findEntityState = () => ({ state, action, stateName, featureName }: ReductionBasis) => ({
  state,
  action,
  stateName,
  featureName,
  entityState: featureName ? state[featureName][stateName] : state[stateName]
});

export const defaultReducer = ({ state }) => state;

export const findEntityReducer = (action: EntityActions<any>) => ENTITY_ACTION_REDUCER_MAP[action.actionType] ?? defaultReducer;

export const applyEntityReducer = () => (params: ReductionBasis) => runReducer(findEntityReducer(params.action))(params);

export const autoEntityReducer = (reducer: ActionReducer<any>, state: any, action: EntityActions<any>) => {
  const nextState = Object.values(EntityActionTypes).includes(action.actionType)
    ? compose(buildReducerParams(), findEntityState(), applyEntityReducer())({ state, action })
    : state;

  return reducer(nextState, action);
};

