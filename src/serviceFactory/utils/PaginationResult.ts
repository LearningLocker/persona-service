
export interface Edge<T> {
  readonly cursor: string;
  readonly node: T;
}

export interface PageInfo {
  readonly startCursor: string;
  readonly endCursor: string;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

export default interface PaginationResult<T> {
  readonly edges: Edge<T>[];
  readonly pageInfo: PageInfo;
}
