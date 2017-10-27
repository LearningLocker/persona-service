import {
  Dictionary,
  filter as loFilter,
  first,
  includes,
  keys,
  last,
  List,
  Many,
  map,
  orderBy,
  result,
  values,
} from 'lodash';
import NoCursorBackwardsDirection from '../../errors/NoCursorBackwardsDirection';
import BaseModel from '../../models/BaseModel';
import { cursorToFilter , modelToCursor } from '../../repoFactory/utils/cursor';
import GetOptions, { CursorDirection, Sort } from '../../serviceFactory/utils/GetOptions';
import PaginationResult from '../../serviceFactory/utils/PaginationResult';
import Config from '../Config';

export const doSort = <T>(sort: Sort, collection: T[] ): T[] => {

  const listCollection: List<T> = collection;

  return orderBy<T>(
    listCollection,
    keys(sort) as Many<string>,
    values(sort).map((ord) => ord === 1 ? true : false),
  );
};

export const doesMatch = <T>(
  theItem: T,
  theFilter: object,
  operator: '$or'|'$and' = '$and',
  path: string[] = [],
): boolean => {

  const theResult: boolean[] = map(
    theFilter as Dictionary<object>,
    (filter, key: string|number) => {

      if (typeof key === 'string' && key.startsWith('$')) {
        switch (key) {
          case '$eq':
            /* istanbul ignore next */
            if (filter instanceof Object) {
              throw new Error('Unexpected object');
            }
            return result<T>(theItem, path.join('.')) === filter;
          case '$lt':
            /* istanbul ignore next */
            if (filter instanceof Object) {
              throw new Error('Unexpected object');
            }
            return result<T>(theItem, path.join('.')) < filter;
          case '$gt':
            /* istanbul ignore next */
            if (filter instanceof Object) {
              throw new Error('Unexpected object');
            }

            return result<T>(theItem, path.join('.')) > filter;
          case '$or':
            const out = doesMatch(theItem, filter, '$or', path);
            return out;
          case '$and':
            return doesMatch(theItem, filter, '$and', path);
          /* istanbul ignore next */
          default:
            throw new Error('Unhandled case');
        }
      }

      const newPath = typeof key === 'string' ? path.concat(key) : path;

      if (result(filter, newPath.join('.'), filter) instanceof Object) {
        return doesMatch(theItem, result(filter, newPath.join('.'), filter), '$and', newPath);
      }
      return result<T>(theItem, newPath.join('.')) === filter;
    },
  );

  if (operator === '$and' && includes(theResult, false)) {
    return false;
  }
  if (operator === '$or' && !includes(theResult, true)) {
    return false;
  }
  return true;
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

    const filterResult = loFilter(sortedCollection, ((identifier) => {
      const out = doesMatch<T>(identifier, theFilter);
      return out;
    }));

    const result2 = filterResult.slice(0, limit + 1);

    const returnResult = result2.slice(0, limit);

    const edges = returnResult.map((document) => ({
      cursor: modelToCursor({
        model: document,
        sort,
      }),
      node: document, // as T,
    }));

    const lastEdge = last(edges);
    const firstEdge = first(edges);

    const result3: PaginationResult<T> = {
      edges,
      pageInfo: {
        endCursor: lastEdge === undefined ? undefined : lastEdge.cursor,
        hasNextPage: (direction === CursorDirection.BACKWARDS && cursor !== undefined) ||
          direction === CursorDirection.FORWARDS && result2.length > limit,
        hasPreviousPage: (direction === CursorDirection.FORWARDS && cursor !== undefined) ||
          direction === CursorDirection.BACKWARDS && result2.length > limit,
        startCursor: firstEdge === undefined ? undefined : firstEdge.cursor,
      },
    };

    return result3;
  };
}; // tslint:disable-line:max-file-line-count
