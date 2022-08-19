import { camelCase } from '../../util/case';
import { iif, isUndefined, map, noop, compose, throwError } from '../../util/func';
import { IEntityAction } from '../actions/entity-action';
import { getKey } from '../decorators/key-util';
import { EntityIdentity } from '../types/entity-identity';
import { IEntityState } from '../util/entity-state';
import { FEATURE_AFFINITY } from '../util/util-tokens';

export function stateNameFromAction(action: IEntityAction): string {
  return camelCase(action.info.modelName);
}

export function featureNameFromAction(action: IEntityAction): string {
  return (action.info.modelType as any)[FEATURE_AFFINITY];
}

export function setNewState(featureName: string, stateName: string, state, newState: IEntityState<any>) {
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
        // eslint-disable-next-line max-len
        `[NGRX-AE] ! Entity key for \'${action.info.modelName}\' could not be found on this entity instance! Make sure your entity is properly decorated with the necessary key metadata. State will NOT be updated due to misconfiguration of your entity.`
      ),
      key => key
    )
  )(null);

export const cloneEntities = (original: any | null) => (!!original ? { ...original } : {});

export const cloneIds = (ids: EntityIdentity[] | null) => (!!ids ? [...ids] : []);

export const mergeSingle = (currentEntities, entityKey, newEntity) => ((currentEntities[entityKey] = newEntity), currentEntities);

export const mergeMany = (currentEntities, newEntities, action) =>
  newEntities.reduce((entities, entity) => ((entities[safeGetKey(action, entity)] = entity), entities), currentEntities);

export const deleteSingle = (currentEntities, entityKey) => (delete currentEntities[entityKey], currentEntities);

export const deleteMany = (currentEntities, entityKeys) => (
  entityKeys.forEach(entityKey => delete currentEntities[entityKey]), currentEntities
);

export const pushSingle = (currentIds, entityKey) => (currentIds.push(entityKey), currentIds);

export const pushMany = (currentIds, newEntities, action) => (
  currentIds.push.apply(
    currentIds,
    newEntities.map(entity => safeGetKey(action, entity))
  ),
  currentIds
);

export const combineUnique = (currentIds, currentEntities, modifiedEntities, action) => {
  const newIds = modifiedEntities.map(entity => safeGetKey(action, entity)).filter(key => !(key in currentEntities));
  currentIds.push.apply(currentIds, newIds);
  return currentIds;
};

export const has = (array, value) => array.indexOf(value) > -1;

export const pushIfMissing = (currentEntities, currentIds, entityKey) =>
  entityKey in currentEntities ? noop() : currentIds.push(entityKey);

export const pushUnique = (currentEntities, currentIds, entityKey) => (pushIfMissing(currentEntities, currentIds, entityKey), currentIds);

export const pushManyUnique = (currentEntities, currentIds, entityKeys) => (
  entityKeys.forEach(entityKey => pushIfMissing(currentEntities, currentIds, entityKey)), currentIds
);

export const warnMissingPageInfo = (action: IEntityAction) =>
  console.log(
    // eslint-disable-next-line max-len
    `[NGRX-AE] Page information for '${action.info.modelName}' was not provided! Page info should be returned from your entity service's loadPage() method. State WILL be updated, however the current page and total entity count information will be incorrect.`
  );

export const warnMissingRangeInfo = (action: IEntityAction) =>
  console.log(
    // eslint-disable-next-line max-len
    `[NGRX-AE] Range information for '${action.info.modelName}' was not provided! Range info should be returned from your entity service's loadPage() method. State WILL be updated, however the current page and total entity count information will be incorrect.`
  );
