import Attribute from '../models/Attribute';
import GetAttributesOptions from '../repoFactory/options/GetAttributesOptions';
import GetAttributesResult from '../repoFactory/results/GetAttributesResult';
// tslint:disable-next-line:no-unused
import GetOptions from '../serviceFactory/utils/GetOptions';
// tslint:disable-next-line:no-unused
import PaginationResult from '../serviceFactory/utils/PaginationResult';
import Config from './Config';
import pagination from './utils/pagination';

export default (
  config: Config,
) => {
  return async (opts: GetAttributesOptions): Promise<GetAttributesResult> =>
    pagination(config, 'personaAttributes')<Attribute>(opts);
};
