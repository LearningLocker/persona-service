import GetPersonasOptions from '../serviceFactory/options/GetPersonasOptions';
import GetPersonasResult from '../serviceFactory/results/GetPersonasResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetPersonasOptions): Promise<GetPersonasResult> => {
    const personas = await config.repo.getPersonas(opts);
    return {
      personas,
    };
  };
};
