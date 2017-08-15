import { ObjectID } from 'mongodb';
import Identifier from '../models/Identifier';
import GetIdentifiersOptions from '../repoFactory/options/GetIdentifiersOptions';
import GetIdentifiersResult from '../repoFactory/results/GetIdentifiersResult';
import GetOptions, { CursorDirection } from '../serviceFactory/utils/GetOptions';
import PaginationResult from '../serviceFactory/utils/PaginationResult';
import Config from './Config';

export const cursorToFilter = ({
}: {
  readonly cursor: string;
  readonly sort: object;
  readonly direction: CursorDirection;
}): object => {
  return {};
};

export default (config: Config) => {
  return async ({
    filter,
    limit,
    maxScan,
    maxTimeMS,
    cursor,
    direction,
    organisation,
    project,
    sort = { _id: 1 },
    hint,
  }: GetIdentifiersOptions): Promise<GetIdentifiersResult> => {
    const collection = (await config.db).collection('personaIdentifiers');

    // TODO
    // Start from cursor ???
    const result = await collection.find({})
    .filter({
      ...filter,
      ...cursorToFilter({
        cursor,
        direction,
        sort,
      })
      organisation: new ObjectID(organisation),
    })
    .sort(sort)
    .project(project)
    .limit(limit)
    .hint(hint)
    .maxTimeMS(maxTimeMS)
    .maxScan(maxScan)
    .toArray()
    ;

    console.log('001 getIdentifiers; result', result);

    const edges = result.map((document) => ({
      cursor: 'abcdefg', // TODO
      node: document as Identifier,
    }));

    const result2: GetIdentifiersResult = {
      edges,
      pageInfo: {
        endCursor: 'def', // TODO
        hasNextPage: true,
        hasPreviousPage: false,
        startCursor: 'abc',
      },
    };

    return result2;
  };
};
