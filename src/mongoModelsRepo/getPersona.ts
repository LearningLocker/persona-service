import GetPersonaOptions from '../repoFactory/options/GetPersonaOptions';
import GetPersonaResult from '../repoFactory/results/GetPersonaResult';
import Config from './Config';
import getPersonaById from './utils/getPersonaById';

export default (config: Config) => {
  return async (opts: GetPersonaOptions): Promise<GetPersonaResult> => {
    return getPersonaById(config)(opts);
  };
};
