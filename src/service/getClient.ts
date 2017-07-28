import GetClientOptions from '../serviceFactory/options/GetClientOptions';
import GetClientResult from '../serviceFactory/results/GetClientResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetClientOptions): Promise<GetClientResult> => {
    return config.repo.getClient(opts);
  };
};
