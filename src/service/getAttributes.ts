// tslint:disable-next-line:no-unused
import Attribute from '../models/Attribute';
import GetAttributesOptions from '../serviceFactory/options/GetAttributesOptions';
import GetAttributesResult from '../serviceFactory/results/GetAttributesResult';
// tslint:disable-next-line:no-unused
import GetOptions, { DEFAULT_LIMIT, Hint } from '../serviceFactory/utils/GetOptions';
// tslint:disable-next-line:no-unused
import PaginationResult from '../serviceFactory/utils/PaginationResult';
import Config from './Config';

// FIXME: remove values
export default (config: Config) =>
  async (opts: GetAttributesOptions): Promise<GetAttributesResult> =>
    config.repo.getAttributes(opts);
