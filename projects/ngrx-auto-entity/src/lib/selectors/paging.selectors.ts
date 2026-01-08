import { Page, Range } from '../models';
import { IEntityPaging } from '../util/entity-state';

// prettier-ignore
export const mapToCurrentPage =
  (paging: IEntityPaging | undefined): Page | undefined =>
    !paging ? undefined : paging.currentPage;

// prettier-ignore
export const mapToCurrentRange =
  (paging: IEntityPaging | undefined): Range | undefined =>
    !paging ? undefined : paging.currentRange;

// prettier-ignore
export const mapToTotalPageable =
  (paging: IEntityPaging | undefined): number =>
    !paging ? 0 : paging.totalPageableCount || 0;
