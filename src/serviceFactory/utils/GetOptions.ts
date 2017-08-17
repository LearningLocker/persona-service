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
  readonly limit: number;
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

const DEFAULT_LIMIT = 10;
const MAX_TIME_MS = process.env.MAX_TIME_MS
  ? Number(process.env.MAX_TIME_MS)
  : 0;
const MAX_SCAN = process.env.MAX_SCAN ? Number(process.env.MAX_SCAN) : 0;

export const applyDefaultOptions = ({
  limit = DEFAULT_LIMIT,
  maxTimeMS = MAX_TIME_MS,
  maxScan = MAX_SCAN,
  ...opts,
}: GetOptions): GetOptions => {
  return {
    ...opts,
    limit,
    maxScan,
    maxTimeMS,
  };
};

export default interface GetOptions extends PaginationOptions, FilterOptions, RepoOptions {}
