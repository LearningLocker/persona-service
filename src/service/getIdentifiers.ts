import type GetIdentifiersOptions from '../serviceFactory/options/GetIdentifiersOptions';
import type GetIdentifiersResult from '../serviceFactory/results/GetIdentifiersResult';
import type Config from './Config';

export default (config: Config) =>
  async (opts: GetIdentifiersOptions): Promise<GetIdentifiersResult> =>
    await config.repo.getIdentifiers(opts);
