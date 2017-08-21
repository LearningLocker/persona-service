import { first, last } from 'lodash';
import { ObjectID } from 'mongodb';
import NoCursorBackwardsDirection from '../../errors/NoCursorBackwardsDirection';
import BaseModel from '../../models/BaseModel';
import { cursorToFilter, modelToCursor } from '../../repoFactory/utils/cursor';
import GetOptions, { CursorDirection } from '../../serviceFactory/utils/GetOptions';
import PaginationResult from '../../serviceFactory/utils/PaginationResult';
import Config from '../Config';

export default (config: Config, collectionName: string) => {
  return async <T extends BaseModel>({
    filter,
    limit,
    maxScan,
    maxTimeMS,
    cursor,
    direction,
    organisation,
    project,
    sort,
    hint,
  }: GetOptions): Promise<PaginationResult<T>> => {

    if (direction === CursorDirection.BACKWARDS && cursor === undefined) {
      throw new NoCursorBackwardsDirection();
    }

    const collection = (await config.db).collection(collectionName);

    const theFilter = {
      ...filter,
      ...cursorToFilter({
        cursor,
        direction,
        sort,
      }),
      organisation: new ObjectID(organisation),
    };

    const mongoCursor = collection.find() // tslint:disable-line:deprecation
      .filter(theFilter)
      .sort(sort)
      .project(project)
      .limit(limit + 1)
      .maxTimeMS(maxTimeMS)
      .maxScan(maxScan)
    ;

    const mongoCursor2 = ((hint2, cursor3) => {
      if (hint2 !== undefined) {
        return cursor3.hint(hint2);
      }
      return cursor3;
    })(hint, mongoCursor);

    const result = await mongoCursor2.toArray();
    const returnResult = result.slice(0, limit);

    const edges = returnResult.map((document) => ({
      cursor: modelToCursor({
        model: document,
        sort,
      }),
      node: document as T,
    }));

    const lastEdge = last(edges);
    const firstEdge = first(edges);

    const result2: PaginationResult<T> = {
      edges,
      pageInfo: {
        endCursor: lastEdge === undefined ? undefined : lastEdge.cursor,
        hasNextPage: (direction === CursorDirection.BACKWARDS && cursor !== undefined) ||
          direction === CursorDirection.FORWARDS && result.length > limit,
        hasPreviousPage: (direction === CursorDirection.FORWARDS && cursor !== undefined) ||
          direction === CursorDirection.BACKWARDS && result.length > limit,
        startCursor: firstEdge === undefined ? undefined : firstEdge.cursor,
      },
    };

    return result2;
  };
};
