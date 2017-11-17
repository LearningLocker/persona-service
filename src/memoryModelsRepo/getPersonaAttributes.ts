import GetPersonaAttributesOptions from // tslint:disable-line:import-spacing
  '../repoFactory/options/GetPersonaAttributesOptions';
import GetPersonaAttributesResult from // tslint:disable-line:import-spacing
  '../repoFactory/results/GetPersonaAttributesResult';
// tslint:disable-next-line:no-unused
import _GetPersonaAttributesOptions from // tslint:disable-line:import-spacing
  '../serviceFactory/options/GetPersonaAttributesOptions';
// tslint:disable-next-line:no-unused
import _GetPersonaAttributesResult from // tslint:disable-line:import-spacing
  '../serviceFactory/results/GetPersonaAttributesResult';
import Config from './Config';
import mongoFilteringInMemory from './utils/mongoFilteringInMemory';

export default (config: Config) => {
  return async ({
    organisation,
    personaId,
    filter = {},
  }: GetPersonaAttributesOptions): Promise<GetPersonaAttributesResult> => {
    // tslint:disable-next-line:strict-boolean-expressions
    const personaFilter = personaId ? { personaId } : {};

    const attributes = mongoFilteringInMemory({
      ...filter,
      ...personaFilter,
      organisation,
    })(config.state.personaAttributes);

    return {
      attributes,
    };
  };
};
