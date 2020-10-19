import Attribute from '../models/Attribute';
import GetAttributesOptions from '../repoFactory/options/GetAttributesOptions';
import GetAttributesResult from '../repoFactory/results/GetAttributesResult';
import Config from './Config';
import pagination from './utils/pagination';

export default (config: Config) => {
  return async (opts: GetAttributesOptions): Promise<GetAttributesResult> =>
    pagination(config, 'personaAttributes')<Attribute>(opts);
};
