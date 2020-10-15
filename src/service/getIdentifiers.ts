// tslint:disable-next-line:no-unused
import Identifier from '../models/Identifier';
import GetIdentifiersOptions from '../serviceFactory/options/GetIdentifiersOptions';
import GetIdentifiersResult from '../serviceFactory/results/GetIdentifiersResult';
// tslint:disable-next-line:no-unused
// FIXME: remove unused values
import GetOptions, { DEFAULT_LIMIT, Hint } from '../serviceFactory/utils/GetOptions';
// tslint:disable-next-line:no-unused
import PaginationResult from '../serviceFactory/utils/PaginationResult';
import Config from './Config';

export default (config: Config) =>
  async (opts: GetIdentifiersOptions): Promise<GetIdentifiersResult> =>
    config.repo.getIdentifiers(opts);
