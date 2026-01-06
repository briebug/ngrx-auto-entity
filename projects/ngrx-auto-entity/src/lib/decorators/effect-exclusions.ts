import { EntityActionTypes } from '../actions/action-types';

/**
 * A map of entity action types to a boolean indicating whether the action's effect should be excluded
 */
export type IEffectExclusions = {
  readonly [action in any | EntityActionTypes]: boolean;
};

/** An IEffectExclusions including all entity selection actions */
export const EXTRA_EFFECTS_EXCLUSION = Object.freeze({
  [EntityActionTypes.Select]: true,
  [EntityActionTypes.SelectMany]: true,
  [EntityActionTypes.SelectByKey]: true,
  [EntityActionTypes.SelectManyByKeys]: true,
  [EntityActionTypes.Deselect]: true,
  [EntityActionTypes.DeselectMany]: true,
  [EntityActionTypes.DeselectManyByKeys]: true,
  [EntityActionTypes.DeselectAll]: true,
  [EntityActionTypes.Clear]: true
});

/** An IEffectExclusions including all entity CURD (Create, Update, Replace, Delete) actions */
export const CURD_EFFECTS_EXCLUSION = Object.freeze({
  [EntityActionTypes.Create]: true,
  [EntityActionTypes.CreateMany]: true,
  [EntityActionTypes.Update]: true,
  [EntityActionTypes.UpdateMany]: true,
  [EntityActionTypes.Upsert]: true,
  [EntityActionTypes.UpsertMany]: true,
  [EntityActionTypes.Replace]: true,
  [EntityActionTypes.ReplaceMany]: true,
  [EntityActionTypes.Delete]: true,
  [EntityActionTypes.DeleteMany]: true,
  [EntityActionTypes.DeleteByKey]: true,
  [EntityActionTypes.DeleteManyByKeys]: true
});

/** An IEffectExclusions including all entity load actions */
export const LOAD_EFFECTS_EXCLUSION = Object.freeze({
  [EntityActionTypes.Load]: true,
  [EntityActionTypes.LoadAll]: true,
  [EntityActionTypes.LoadMany]: true,
  [EntityActionTypes.LoadPage]: true,
  [EntityActionTypes.LoadRange]: true
});

/** An IEffectExclusions including all entity actions */
export const ALL_EFFECTS_EXCLUSION = Object.freeze({
  ...LOAD_EFFECTS_EXCLUSION,
  ...CURD_EFFECTS_EXCLUSION,
  ...EXTRA_EFFECTS_EXCLUSION
});
