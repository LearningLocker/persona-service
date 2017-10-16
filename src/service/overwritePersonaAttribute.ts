import OverwritePersonaAttributeOptions from // tslint:disable-line:import-spacing
  '../serviceFactory/options/OverwritePersonaAttributeOptions';
import OverwritePersonaAttributeResult from // tslint:disable-line:import-spacing
  '../serviceFactory/results/OverwritePersonaAttributeResult';
import Config from './Config';

export default (config: Config) =>
  async (opts: OverwritePersonaAttributeOptions): Promise<OverwritePersonaAttributeResult> => {
    return config.repo.overwritePersonaAttribute(opts);
  };
