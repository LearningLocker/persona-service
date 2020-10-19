import GetAttributesOptions from '../serviceFactory/options/GetAttributesOptions';
import GetAttributesResult from '../serviceFactory/results/GetAttributesResult';
import Config from './Config';

export default (config: Config) =>
  async (opts: GetAttributesOptions): Promise<GetAttributesResult> =>
    config.repo.getAttributes(opts);
