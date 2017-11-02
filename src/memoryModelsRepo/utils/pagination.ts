import {
  first,
  keys,
  last,
  List,
  Many,
  orderBy,
  values,
} from 'lodash';
import NoCursorBackwardsDirection from '../../errors/NoCursorBackwardsDirection';
import BaseModel from '../../models/BaseModel';
import { cursorToFilter , modelToCursor } from '../../repoFactory/utils/cursor';
import GetOptions, { CursorDirection, Sort } from '../../serviceFactory/utils/GetOptions';
import PaginationResult from '../../serviceFactory/utils/PaginationResult';
import Config from '../Config';
import mongoFilteringInMemory from './mongoFilteringInMemory';

export const doSort = <T>(sort: Sort, collection: T[] ): T[] => {

  const listCollection: List<T> = collection;

  return orderBy<T>(
    listCollection,
    keys(sort) as Many<string>,
    values(sort).map((ord) => ord === 1 ? true : false),
  );
};

export default (config: Config, collectionName: string) => {
  return async <T extends BaseModel>({
    filter,
    limit,
    cursor,
    direction,
    organisation,
    // project,
    sort,
  }: GetOptions): Promise<PaginationResult<T>> => {

    if (direction === CursorDirection.BACKWARDS && cursor === undefined) {
      throw new NoCursorBackwardsDirection();
    }

    const theFilter = {
      ...filter,
      ...cursorToFilter({
        cursor,
        direction,
        sort,
      }),
      organisation,
    };

    const collection: T[] =
      config.state[collectionName] as T[];

    const sortedCollection = doSort(sort, collection);

    const filterResult = mongoFilteringInMemory (theFilter)<T>(sortedCollection);

    const resultWithPlusOne = filterResult.slice(0, limit + 1);

    const returnResult = resultWithPlusOne.slice(0, limit);

    const edges = returnResult.map((document) => ({
      cursor: modelToCursor({
        model: document,
        sort,
      }),
      node: document, // as T,
    }));

    const lastEdge = last(edges);
    const firstEdge = first(edges);

    const resultWithPagination: PaginationResult<T> = {
      edges,
      pageInfo: {
        endCursor: lastEdge === undefined ? undefined : lastEdge.cursor,
        hasNextPage: (direction === CursorDirection.BACKWARDS && cursor !== undefined) ||
          direction === CursorDirection.FORWARDS && resultWithPlusOne.length > limit,
        hasPreviousPage: (direction === CursorDirection.FORWARDS && cursor !== undefined) ||
          direction === CursorDirection.BACKWARDS && resultWithPlusOne.length > limit,
        startCursor: firstEdge === undefined ? undefined : firstEdge.cursor,
      },
    };

    return resultWithPagination;
  };
}; // tslint:disable-line:max-file-line-count
