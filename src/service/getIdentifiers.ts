// tslint:disable-next-line:no-unused
import Identifier from '../models/Identifier';
import GetIdentifiersOptions from '../serviceFactory/options/GetIdentifiersOptions';
import GetIdentifiersResult from '../serviceFactory/results/GetIdentifiersResult';
// tslint:disable-next-line:no-unused
import GetOptions, { Hint } from '../serviceFactory/utils/GetOptions';
// tslint:disable-next-line:no-unused
import PaginationResult from '../serviceFactory/utils/PaginationResult';
import Config from './Config';
// import validateHint from './utils/validateHint';

export default (config: Config) => {
  return async (opts: GetIdentifiersOptions): Promise<GetIdentifiersResult> => {
    // validateHint(opts.hint);

    return config.repo.getIdentifiers({...opts});
  };
};
