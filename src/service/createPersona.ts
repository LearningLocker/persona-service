import type CreatePersonaOptions from '../serviceFactory/options/CreatePersonaOptions';
import type CreatePersonaResult from '../serviceFactory/results/CreatePersonaResult';
import type Config from './Config';

export default (config: Config) =>
  async (opts: CreatePersonaOptions): Promise<CreatePersonaResult> => {
    return await config.repo.createPersona(opts);
  };
