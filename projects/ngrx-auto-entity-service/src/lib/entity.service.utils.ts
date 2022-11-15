import { IEntityInfo } from '@briebug/ngrx-auto-entity';
import { Observable, retry } from 'rxjs';
import { EntityCriteria, RetryCriteria } from './critera.model';

export const EmptyKey = null;

export const buildParentPaths = (criteria: EntityCriteria): string =>
  Object.keys((criteria && criteria.parents) || {})
    .map(parent => `/${parent}${criteria.parents[parent] === EmptyKey ? '' : `/${criteria.parents[parent]}`}`)
    .reduce((path, parent) => path + parent, '');

export const buildEntityPath = (info: IEntityInfo, key?: any, criteria?: EntityCriteria): string =>
  `/${info.uriName || info.pluralName || info.modelName.toLowerCase()}${
    key ? `/${key}` : criteria && criteria.param ? `/${criteria.param}` : ''
  }`;

export const buildSimpleQueryParam = (criteria: EntityCriteria, param: string) => `${param}=${criteria.query[param]}`;

export const renderJoinedArrayQueryParams = (values: any[], param: string) => values.map(value => `${param}=${value}`).join('&');

export const buildJoinedArrayQueryParamSet = (criteria: EntityCriteria, param: string) =>
  Array.isArray(criteria.query[param])
    ? renderJoinedArrayQueryParams(criteria.query[param] as any[], param.substring(1))
    : typeof criteria.query[param] === 'string'
      ? renderJoinedArrayQueryParams((criteria.query[param] as string).split(','), param.substring(1))
      : buildSimpleQueryParam(criteria, param.substring(1));

export const buildQueryString = (criteria: EntityCriteria): string =>
  criteria && criteria.query
    ? Object.keys(criteria.query)
      .map(param => (param.startsWith('&') ? buildJoinedArrayQueryParamSet(criteria, param) : buildSimpleQueryParam(criteria, param)))
      .join('&')
    : '';

export const buildUrl = (host: string, info: IEntityInfo, criteria?: EntityCriteria, key: any = null): string => {
  const parentPaths = buildParentPaths(criteria);
  const entityPath = buildEntityPath(info, key, criteria);
  const query = buildQueryString(criteria);
  const version = criteria?.version ? `/v${criteria.version}` : '';

  const url = `${host}${version}${parentPaths}${entityPath}${query ? `?${query}` : ''}`;

  return url;
};

export const resolveRetryCriteria = <T>(obs: Observable<T>, retryCriteria: boolean | RetryCriteria, defaultCriteria?: RetryCriteria) =>
  retryCriteria
    ? typeof retryCriteria === 'boolean'
      ? obs.pipe(retry({count: defaultCriteria?.maxRetries || 3, delay: defaultCriteria?.delay || 1000}))
      : obs.pipe(
        retry({
          count: retryCriteria.maxRetries || defaultCriteria?.maxRetries || 3,
          delay: retryCriteria.delay || defaultCriteria?.delay || 1000,
        }),
      )
    : obs;
