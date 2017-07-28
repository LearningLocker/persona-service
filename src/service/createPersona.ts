import CreatePersonaOptions from '../serviceFactory/options/CreatePersonaOptions';
import CreatePersonaResult from '../serviceFactory/results/CreatePersonaResult';
import Config from './Config';

export default (config: Config) =>
  async (opts: CreatePersonaOptions): Promise<CreatePersonaResult> => {
    return config.repo.createPersona(opts);
  };
