// tslint:disable-next-line:no-unused
import Attribute from '../models/Attribute';
import GetAttributesOptions from '../serviceFactory/options/GetAttributesOptions';
import GetAttributesResult from '../serviceFactory/results/GetAttributesResult';
// tslint:disable-next-line:no-unused
import GetOptions, { DEFAULT_LIMIT, Hint } from '../serviceFactory/utils/GetOptions';
// tslint:disable-next-line:no-unused
import PaginationResult from '../serviceFactory/utils/PaginationResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetAttributesOptions): Promise<GetAttributesResult> => {

    return config.repo.getAttributes({
      ...opts,
    });
  };
};
