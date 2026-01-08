import { IEntityInfo } from '@briebug/ngrx-auto-entity';
import { Observable, retry } from 'rxjs';
import { EntityCriteria, EntityParent, QueryCriteria, RetryCriteria } from './critera.model';

export const EmptyKey = null;

export const buildParentPaths = (parents: EntityParent | undefined): string =>
  parents != null
    ? Object.keys(parents)
        .map(parent => `/${parent}${parents[parent] === EmptyKey ? '' : `/${parents[parent]}`}`)
        .reduce((path, parent) => path + parent, '')
    : '';

export const buildEntityPath = (info: IEntityInfo, key?: any, criteria?: EntityCriteria): string =>
  `/${info.uriName || info.pluralName || info.modelName.toLowerCase()}${
    key ? `/${key}` : criteria && criteria.param ? `/${criteria.param}` : ''
  }`;

export const buildSimpleQueryParam = (queryCriteria: QueryCriteria, param: string) => `${param}=${queryCriteria[param]}`;

export const renderJoinedArrayQueryParams = (values: any[], param: string) => values.map(value => `${param}=${value}`).join('&');

export const buildJoinedArrayQueryParamSet = (queryCriteria: QueryCriteria, param: string) =>
  Array.isArray(queryCriteria[param])
    ? renderJoinedArrayQueryParams(queryCriteria[param], param.substring(1))
    : typeof queryCriteria[param] === 'string'
    ? renderJoinedArrayQueryParams(queryCriteria[param].split(','), param.substring(1))
    : buildSimpleQueryParam(queryCriteria, param.substring(1));

export const buildQueryString = (queryCriteria: QueryCriteria | undefined): string =>
  queryCriteria != null
    ? Object.keys(queryCriteria)
        .map(param =>
          param.startsWith('&') ? buildJoinedArrayQueryParamSet(queryCriteria, param) : buildSimpleQueryParam(queryCriteria, param)
        )
        .join('&')
    : '';

export const buildUrl = (host: string, info: IEntityInfo, criteria: EntityCriteria = {}, key: any = null): string => {
  const parentPaths = buildParentPaths(criteria.parents);
  const entityPath = buildEntityPath(info, key, criteria);
  const query = buildQueryString(criteria.query);
  const version = criteria.version ? `/v${criteria.version}` : '';

  const url = `${host}${version}${parentPaths}${entityPath}${query ? `?${query}` : ''}`;

  return url;
};

export const resolveRetryCriteria = <T>(
  obs: Observable<T>,
  retryCriteria: boolean | RetryCriteria | undefined,
  defaultCriteria: RetryCriteria = {}
) =>
  retryCriteria
    ? typeof retryCriteria === 'boolean'
      ? obs.pipe(retry({ count: defaultCriteria?.maxRetries || 3, delay: defaultCriteria?.delay || 1000 }))
      : obs.pipe(
          retry({
            count: retryCriteria.maxRetries || defaultCriteria?.maxRetries || 3,
            delay: retryCriteria.delay || defaultCriteria?.delay || 1000
          })
        )
    : obs;
