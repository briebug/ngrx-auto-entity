import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { EntityAction, EntityActionTypes } from '../actions';
import { ENTITY_OPTS_PROP } from './entity-tokens';

export type IEffectExclusions = {
  readonly [action in any | EntityActionTypes]: boolean;
};

export interface IEffectExcept {
  except?: (...actions: EntityActionTypes[]) => IEffectExclusions;
}

export interface IEntityTransformer {
  fromServer?: (data: any) => any;
  toServer?: (entity: any) => any;
}

export interface IEntityOptions {
  modelName: string;
  uriName?: string;
  pluralName?: string;
  comparer?: (a, b) => number;
  transform?: IEntityTransformer[];
  excludeEffects?: IEffectExclusions | IEffectExcept;
}

const EXTRA_EFFECTS_EXCLUSION = Object.freeze({
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

const CURD_EFFECTS_EXCLUSION = Object.freeze({
  [EntityActionTypes.Create]: true,
  [EntityActionTypes.CreateMany]: true,
  [EntityActionTypes.Update]: true,
  [EntityActionTypes.UpdateMany]: true,
  [EntityActionTypes.Replace]: true,
  [EntityActionTypes.ReplaceMany]: true,
  [EntityActionTypes.Delete]: true,
  [EntityActionTypes.DeleteMany]: true,
  [EntityActionTypes.DeleteByKey]: true,
  [EntityActionTypes.DeleteManyByKeys]: true
});

const LOAD_EFFECTS_EXCLUSION = Object.freeze({
  [EntityActionTypes.Load]: true,
  [EntityActionTypes.LoadAll]: true,
  [EntityActionTypes.LoadMany]: true,
  [EntityActionTypes.LoadPage]: true,
  [EntityActionTypes.LoadRange]: true
});

const ALL_EFFECTS_EXCLUSION = Object.freeze({
  ...LOAD_EFFECTS_EXCLUSION,
  ...CURD_EFFECTS_EXCLUSION,
  ...EXTRA_EFFECTS_EXCLUSION
});

export const except = (effects?) => (...actions: EntityActionTypes[]): IEffectExclusions => ({
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

export function Entity(options: IEntityOptions) {
  return function entityDecorator(constructor: any) {
    const descriptor = Object.create(null);
    descriptor.value = options;
    Object.defineProperty(constructor, ENTITY_OPTS_PROP, descriptor);

    return constructor;
  };
}

export const shouldApplyEffect = <TModel, TAction extends EntityAction<TModel>>() => (source: Observable<TAction>) =>
  source.pipe(
    filter(({ actionType, info }) => !((info.modelType[ENTITY_OPTS_PROP] || {}).excludeEffects || {})[actionType])
  );
