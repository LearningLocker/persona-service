import type GetPersonaOptions from '../repoFactory/options/GetPersonaOptions';
import type GetPersonaResult from '../repoFactory/results/GetPersonaResult';
import type Config from './Config';
import getPersonaById from './utils/getPersonaById';

export default (config: Config) => {
  return async (opts: GetPersonaOptions): Promise<GetPersonaResult> => {
    return await getPersonaById(config)(opts);
  };
};
