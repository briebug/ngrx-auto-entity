import { mapToCurrentPage, mapToCurrentRange, mapToTotalPageable } from './paging.selectors';

describe('mapToCurrentPage', () => {
  it('should return undefined if not paging', () => {
    const current = mapToCurrentPage(undefined);
    expect(current).toBeUndefined();
  });

  it('should return page info of current page when paging', () => {
    const current = mapToCurrentPage({
      currentPage: {
        page: 2,
        size: 12
      }
    });
    expect(current).toEqual({
      page: 2,
      size: 12
    });
  });
});

describe('mapToCurrentRange', () => {
  it('should return undefined if not ranging', () => {
    const current = mapToCurrentRange(undefined);
    expect(current).toBeUndefined();
  });

  it('should return start/end range info of current range when ranging', () => {
    const current = mapToCurrentRange({
      currentRange: {
        start: 15,
        end: 30
      }
    });
    expect(current).toEqual({
      start: 15,
      end: 30
    });
  });

  it('should return first/last range info of current range when ranging', () => {
    const current = mapToCurrentRange({
      currentRange: {
        first: 9,
        last: 74
      }
    });
    expect(current).toEqual({
      first: 9,
      last: 74
    });
  });

  it('should return skip/take range info of current range when ranging', () => {
    const current = mapToCurrentRange({
      currentRange: {
        skip: 5,
        take: 10
      }
    });
    expect(current).toEqual({
      skip: 5,
      take: 10
    });
  });
});

describe('mapToTotalPageable', () => {
  it('should return 0 if not paging', () => {
    const current = mapToTotalPageable(undefined);
    expect(current).toBe(0);
  });

  it('should return 0 if total pageable not tracked', () => {
    const current = mapToTotalPageable({});
    expect(current).toBe(0);
  });

  it('should return total number of pageable records if paging', () => {
    const current = mapToTotalPageable({
      totalPageableCount: 1230
    });
    expect(current).toBe(1230);
  });
});
