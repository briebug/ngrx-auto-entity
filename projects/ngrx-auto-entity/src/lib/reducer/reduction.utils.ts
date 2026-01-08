import { camelCase } from '../../util/case';
import { iif, isUndefined, map, noop, compose, throwError } from '../../util/func';
import { IEntityAction } from '../actions/entity-action';
import { getKey } from '../decorators/key-util';
import { EntityIdentity } from '../types/entity-identity';
import { IEntityDictionary, IEntityState } from '../util/entity-state';
import { FEATURE_AFFINITY } from '../util/util-tokens';

export function stateNameFromAction(action: IEntityAction): string {
  return camelCase(action.info.modelName);
}

export function featureNameFromAction(action: IEntityAction): string {
  return (action.info.modelType as any)[FEATURE_AFFINITY];
}

export function setNewState(featureName: string | undefined, stateName: string, state: any, newState: IEntityState<any>) {
  const nextState = featureName
    ? { ...state, [featureName]: { ...state[featureName], [stateName]: newState } }
    : { ...state, [stateName]: newState };
  return nextState;
}

export const safeGetKey = <TModel>(action: IEntityAction, entity: TModel): EntityIdentity =>
  compose(
    map(() => getKey(action, entity)),
    iif(
      isUndefined,
      throwError(
        `[NGRX-AE] ! Entity key for '${action.info.modelName}' could not be found on this entity instance! Make sure your entity is properly decorated with the necessary key metadata. State will NOT be updated due to misconfiguration of your entity.`
      ),
      key => key
    )
  )(null);

export const cloneEntities = (original: any | null) => (original != null ? { ...original } : {});

export const cloneIds = (ids: EntityIdentity[] | null) => (ids != null ? [...ids] : []);

export const mergeSingle = <TModel>(currentEntities: IEntityDictionary<TModel>, entityKey: EntityIdentity, newEntity: TModel) => (
  (currentEntities[entityKey] = newEntity), currentEntities
);

export const mergeMany = <TModel>(currentEntities: IEntityDictionary<TModel>, newEntities: TModel[], action: IEntityAction) =>
  newEntities.reduce((entities, entity) => ((entities[safeGetKey(action, entity)] = entity), entities), currentEntities);

export const deleteSingle = <TModel>(currentEntities: IEntityDictionary<TModel>, entityKey: EntityIdentity) => (
  delete currentEntities[entityKey], currentEntities
);

export const deleteMany = <TModel>(currentEntities: IEntityDictionary<TModel>, entityKeys: EntityIdentity[]) => (
  entityKeys.forEach(entityKey => delete currentEntities[entityKey]), currentEntities
);

export const pushSingle = (currentIds: EntityIdentity[], entityKey: EntityIdentity) => (currentIds.push(entityKey), currentIds);

export const pushMany = <TModel>(currentIds: EntityIdentity[], newEntities: TModel[], action: IEntityAction) => (
  currentIds.push(...newEntities.map(entity => safeGetKey(action, entity))), currentIds
);

export const combineUnique = <TModel>(
  currentIds: EntityIdentity[],
  currentEntities: IEntityDictionary<TModel>,
  modifiedEntities: TModel[],
  action: IEntityAction
) => {
  const newIds = modifiedEntities.map(entity => safeGetKey(action, entity)).filter(key => !(key in currentEntities));
  currentIds.push(...newIds);
  return currentIds;
};

export const has = (array: unknown[], value: unknown) => array.indexOf(value) > -1;

export const pushIfMissing = <TModel>(
  currentEntities: IEntityDictionary<TModel>,
  currentIds: EntityIdentity[],
  entityKey: EntityIdentity
) => (entityKey in currentEntities ? noop() : currentIds.push(entityKey));

export const pushUnique = <TModel>(currentEntities: IEntityDictionary<TModel>, currentIds: EntityIdentity[], entityKey: EntityIdentity) => (
  pushIfMissing(currentEntities, currentIds, entityKey), currentIds
);

export const pushManyUnique = <TModel>(
  currentEntities: IEntityDictionary<TModel>,
  currentIds: EntityIdentity[],
  entityKeys: EntityIdentity[]
) => (entityKeys.forEach(entityKey => pushIfMissing(currentEntities, currentIds, entityKey)), currentIds);

export const warnMissingPageInfo = (action: IEntityAction) =>
  console.log(
    `[NGRX-AE] Page information for '${action.info.modelName}' was not provided! Page info should be returned from your entity service's loadPage() method. State WILL be updated, however the current page and total entity count information will be incorrect.`
  );

export const warnMissingRangeInfo = (action: IEntityAction) =>
  console.log(
    `[NGRX-AE] Range information for '${action.info.modelName}' was not provided! Range info should be returned from your entity service's loadPage() method. State WILL be updated, however the current page and total entity count information will be incorrect.`
  );
