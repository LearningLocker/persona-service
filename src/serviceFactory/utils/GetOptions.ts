export enum CursorDirection {
  FORWARDS,
  BACKWARDS,
}

export type Hint = string | {
  readonly [hintKey: string]: (-1 | 1);
};

export interface Sort {
  readonly [sortKey: string]: (-1 | 1);
}

export interface PaginationOptions {
  readonly limit?: number;
  readonly cursor?: string;
  readonly direction: CursorDirection;
  readonly sort: Sort;
}

export interface FilterOptions {
  readonly organisation: string;
  readonly filter: object;
  readonly project: object;
}

export interface RepoOptions {
  readonly maxTimeMS: number;
  readonly maxScan: number;
  readonly hint?: Hint;
}

export const DEFAULT_LIMIT = 10;

export default interface GetOptions extends PaginationOptions, FilterOptions, RepoOptions {}
