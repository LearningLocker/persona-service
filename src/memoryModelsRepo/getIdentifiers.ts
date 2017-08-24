import Identifier from '../models/Identifier';
import GetIdentifiersOptions from '../repoFactory/options/GetIdentifiersOptions';
import GetIdentifiersResult from '../repoFactory/results/GetIdentifiersResult';
// tslint:disable-next-line:no-unused
import GetOptions from '../serviceFactory/utils/GetOptions';
// tslint:disable-next-line:no-unused
import PaginationResult from '../serviceFactory/utils/PaginationResult';
import Config from './Config';
import pagination from './utils/pagination';

export default (
  config: Config,
) => {
  return async (opts: GetIdentifiersOptions): Promise<GetIdentifiersResult> =>
    pagination(config, 'personaIdentifiers')<Identifier>(opts);
};
