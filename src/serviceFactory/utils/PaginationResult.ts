
export interface Edge<T> {
  readonly cursor: string;
  readonly node: T;
}

export interface PageInfo {
  readonly startCursor: string | undefined;
  readonly endCursor: string | undefined;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

export default interface PaginationResult<T> {
  readonly edges: Edge<T>[];
  readonly pageInfo: PageInfo;
}
