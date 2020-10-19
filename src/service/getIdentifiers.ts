import GetIdentifiersOptions from '../serviceFactory/options/GetIdentifiersOptions';
import GetIdentifiersResult from '../serviceFactory/results/GetIdentifiersResult';
import Config from './Config';

export default (config: Config) =>
  async (opts: GetIdentifiersOptions): Promise<GetIdentifiersResult> =>
    config.repo.getIdentifiers(opts);
