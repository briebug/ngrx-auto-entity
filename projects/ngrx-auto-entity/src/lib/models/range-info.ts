export type RangeValue = string | number | Date;

export interface IStartEndRange {
  start: RangeValue;
  end: RangeValue;
}

export interface IFirstLastRange {
  first: RangeValue;
  last: RangeValue;
}

export interface ISkipTakeRange {
  skip: number;
  take: number;
}

export type Range = IStartEndRange | IFirstLastRange | ISkipTakeRange;

export interface IRangeInfo {
  range: Range;
  totalCount: number;
}
