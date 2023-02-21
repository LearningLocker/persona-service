import type Attribute from '../models/Attribute';
import type GetAttributesOptions from '../repoFactory/options/GetAttributesOptions';
import type GetAttributesResult from '../repoFactory/results/GetAttributesResult';
import type Config from './Config';
import pagination from './utils/pagination';

export default (config: Config) => {
  return async (opts: GetAttributesOptions): Promise<GetAttributesResult> =>
    await pagination(config, 'personaAttributes')<Attribute>(opts);
};
