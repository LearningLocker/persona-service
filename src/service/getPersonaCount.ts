import GetPersonaCountOptions from '../serviceFactory/options/GetPersonaCountOptions';
import GetPersonaCountResult from '../serviceFactory/results/GetPersonaCountResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetPersonaCountOptions): Promise<GetPersonaCountResult> => {
    return config.repo.getPersonaCount(opts);
  };
};
