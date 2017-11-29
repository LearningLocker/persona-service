import UpdatePersonaOptions from '../serviceFactory/options/UpdatePersonaOptions';
// tslint:disable-next-line:no-unused
import _UpdatePersonaOptions from // tslint:disable-line:import-spacing
  '../serviceFactory/options/UpdatePersonaOptions';
// tslint:disable-next-line:no-unused
import _UpdatePersonaResult from // tslint:disable-line:import-spacing
  '../serviceFactory/results/UpdatePersonaResult';
import UpdatePersonaResult from '../serviceFactory/results/UpdatePersonaResult';
import Config from './Config';

export default (config: Config) =>
  async (opts: UpdatePersonaOptions): Promise<UpdatePersonaResult> => {
    return config.repo.updatePersona(opts);
  };
