import CreateInfoOptions from '../serviceFactory/options/CreateInfoOptions';
import CreateInfoResult from '../serviceFactory/results/CreateInfoResult';
import Config from './Config';

export default (config: Config) =>
  async (opts: CreateInfoOptions): Promise<CreateInfoResult> => {
    return config.repo.createInfo(opts);
  };
