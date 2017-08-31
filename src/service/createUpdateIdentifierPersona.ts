import CreateUpdateIdentifierPersonaOptions // tslint:disable-line:import-spacing
  from '../serviceFactory/options/CreateUpdateIdentifierPersonaOptions';
import CreateUpdateIdentifierPersonaResult // tslint:disable-line:import-spacing
  from '../serviceFactory/results/CreateUpdateIdentifierPersonaResult';
import Config from './Config';

export default (config: Config) =>
  async (opts: CreateUpdateIdentifierPersonaOptions):
  Promise<CreateUpdateIdentifierPersonaResult> => {
    return config.repo.createUpdateIdentifierPersona(opts);
  };
