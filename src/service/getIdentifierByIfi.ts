import GetIdentifierByIfiOptions from '../serviceFactory/options/GetIdentifierByIfiOptions';
import GetIdentifierByIfiResult from '../serviceFactory/results/GetIdentifierByIfiResult';
import Config from './Config';

export default (config: Config) => {

  return async (opts: GetIdentifierByIfiOptions): Promise<GetIdentifierByIfiResult> =>
    config.repo.getIdentifierByIfi(opts);
};
