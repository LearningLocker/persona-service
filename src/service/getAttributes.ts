import type GetAttributesOptions from '../serviceFactory/options/GetAttributesOptions';
import type GetAttributesResult from '../serviceFactory/results/GetAttributesResult';
import type Config from './Config';

export default (config: Config) =>
  async (opts: GetAttributesOptions): Promise<GetAttributesResult> =>
    await config.repo.getAttributes(opts);
