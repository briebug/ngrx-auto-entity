export type RangeValue = string | number | Date;

export interface IStartEndRange {
  /** The start of the range */
  start: RangeValue;
  /** Then end of the range */
  end: RangeValue;
}

export interface IFirstLastRange {
  /** First entity identity or date in the range */
  first: RangeValue;
  /** Last entity identity or date in the range */
  last: RangeValue;
}

export interface ISkipTakeRange {
  /** Number of entities to skip */
  skip: number;
  /** Number of entities to take */
  take: number;
}

export type Range = IStartEndRange | IFirstLastRange | ISkipTakeRange;

export interface IRangeInfo {
  /** The range associated with the data */
  range: Range;
  /** Total number of entities */
  totalCount: number;
}
