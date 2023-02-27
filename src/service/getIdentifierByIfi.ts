import type GetIdentifierByIfiOptions from '../serviceFactory/options/GetIdentifierByIfiOptions';
import type GetIdentifierByIfiResult from '../serviceFactory/results/GetIdentifierByIfiResult';
import type Config from './Config';

export default (config: Config) => {
  return async (opts: GetIdentifierByIfiOptions): Promise<GetIdentifierByIfiResult> =>
    await config.repo.getIdentifierByIfi(opts);
};
