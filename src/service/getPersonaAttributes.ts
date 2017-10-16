import GetPersonaAttributesOptions from '../serviceFactory/options/GetPersonaAttributesOptions';
import GetPersonaAttributesResult from '../serviceFactory/results/GetPersonaAttributesResult';
import Config from './Config';

export default (config: Config) =>
  async (opts: GetPersonaAttributesOptions): Promise<GetPersonaAttributesResult> => {
    return config.repo.getPersonaAttributes(opts);
  };
