import type CreateUpdateIdentifierPersonaOptions from '../serviceFactory/options/CreateUpdateIdentifierPersonaOptions';
import type CreateUpdateIdentifierPersonaResult from '../serviceFactory/results/CreateUpdateIdentifierPersonaResult';
import type Config from './Config';

export default (config: Config) =>
  async (opts: CreateUpdateIdentifierPersonaOptions):
  Promise<CreateUpdateIdentifierPersonaResult> => {
    return await config.repo.createUpdateIdentifierPersona(opts);
  };
