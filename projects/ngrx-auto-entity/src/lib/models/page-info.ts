export interface IPage {
  /** Page number */
  page: number;
  /** Page size */
  size: number;
}

export type Page = IPage;

export interface IPageInfo {
  /** The page associated with the data */
  page: Page;
  /** Total number of pages */
  totalCount: number;
}
