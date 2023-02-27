import type UpdatePersonaOptions from '../serviceFactory/options/UpdatePersonaOptions';
import type UpdatePersonaResult from '../serviceFactory/results/UpdatePersonaResult';
import type Config from './Config';

export default (config: Config) =>
  async (opts: UpdatePersonaOptions): Promise<UpdatePersonaResult> => {
    return await config.repo.updatePersona(opts);
  };
