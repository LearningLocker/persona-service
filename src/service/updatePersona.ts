import UpdatePersonaOptions from '../serviceFactory/options/UpdatePersonaOptions';
import UpdatePersonaResult from '../serviceFactory/results/UpdatePersonaResult';
import Config from './Config';

export default (config: Config) =>
  async (opts: UpdatePersonaOptions): Promise<UpdatePersonaResult> => {
    return config.repo.updatePersona(opts);
  };
