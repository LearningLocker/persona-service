import type GetPersonaCountOptions from '../serviceFactory/options/GetPersonaCountOptions';
import type GetPersonaCountResult from '../serviceFactory/results/GetPersonaCountResult';
import type Config from './Config';

export default (config: Config) => {
  return async (opts: GetPersonaCountOptions): Promise<GetPersonaCountResult> => {
    return await config.repo.getPersonaCount(opts);
  };
};
