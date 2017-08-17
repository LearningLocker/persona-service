import Identifier from '../models/Identifier';
import GetIdentifiersOptions from '../repoFactory/options/GetIdentifiersOptions';
import GetIdentifiersResult from '../repoFactory/results/GetIdentifiersResult';
import GetOptions, { CursorDirection } from '../serviceFactory/utils/GetOptions';
import PaginationResult from '../serviceFactory/utils/PaginationResult';
import Config from './Config';

export default (
  _config: Config,
) => {
  return async ({
    /*filter,
    limit,
    maxScan,
    maxTimeMS,
    cursor,
    direction,
    organisation,
    project,
    sort = { _id: 1 },
    hint,*/
  }: GetIdentifiersOptions): Promise<GetIdentifiersResult> => {

    // TODO
    const theNode: Identifier = {
      id: '1',
      ifi: {
        key: 'mbox',
        value: 'test@test.com',
      },
      organisation: 'ht2',
    };

    return {
      edges: [{
        cursor: 'abcde',
        node: theNode,
      }],
      pageInfo: {
        endCursor: 'end',
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: 'start',
      },
    };
  };
};
