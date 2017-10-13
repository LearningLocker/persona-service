import GetInfoByPersonaOptions from '../serviceFactory/options/GetInfoByPersonaOptions';
import GetInfoByPersonaResult from '../serviceFactory/results/GetInfoByPersonaResult';
import Config from './Config';

export default (config: Config) =>
  async (opts: GetInfoByPersonaOptions): Promise<GetInfoByPersonaResult> => {
    return config.repo.getInfoByPersona(opts);
  };
