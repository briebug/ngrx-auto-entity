import { EntityActionTypes } from '../actions/action-types';
import {
  ALL_EFFECTS_EXCLUSION,
  CURD_EFFECTS_EXCLUSION,
  EXTRA_EFFECTS_EXCLUSION,
  IEffectExclusions,
  LOAD_EFFECTS_EXCLUSION
} from './effect-exclusions';

export const except =
  (effects?) =>
  (...actions: EntityActionTypes[]): IEffectExclusions => ({
    ...(effects || {}),
    ...actions.reduce((acc, action) => ({ ...acc, [action]: false }), {})
  });

export const matching = (...actions: EntityActionTypes[]): IEffectExclusions => ({
  ...actions.reduce((acc, action) => ({ ...acc, [action]: true }), {})
});

export const all = Object.freeze({
  ...ALL_EFFECTS_EXCLUSION,
  except: except(ALL_EFFECTS_EXCLUSION)
});

export const extra = Object.freeze({
  ...EXTRA_EFFECTS_EXCLUSION,
  except: except(EXTRA_EFFECTS_EXCLUSION)
});

export const loads = Object.freeze({
  ...LOAD_EFFECTS_EXCLUSION,
  except: except(LOAD_EFFECTS_EXCLUSION)
});

export const curd = Object.freeze({
  ...CURD_EFFECTS_EXCLUSION,
  except: except(CURD_EFFECTS_EXCLUSION)
});
