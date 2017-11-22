import CreateUpdateAttributePersonaOptions // tslint:disable-line:import-spacing
  from '../serviceFactory/options/CreateUpdateAttributePersonaOptions';
import CreateUpdateAttributePersonaResult // tslint:disable-line:import-spacing
  from '../serviceFactory/results/CreateUpdateAttributePersonaResult';
import Config from './Config';

export default (config: Config) =>
  async (opts: CreateUpdateAttributePersonaOptions):
  Promise<CreateUpdateAttributePersonaResult> => {
    return config.repo.createUpdateAttributePersona(opts);
  };
