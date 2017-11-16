import GetPersonaIdentifiersOptions from // tslint:disable-line:import-spacing
  '../repoFactory/options/GetPersonaIdentifiersOptions';
import GetPersonaIdentifiersResult from // tslint:disable-line:import-spacing
  '../repoFactory/results/GetPersonaIdentifiersResult';
// tslint:disable-next-line:no-unused
import _GetPersonaIdentifiersOptions from // tslint:disable-line:import-spacing
  '../serviceFactory/options/GetPersonaIdentifiersOptions';
// tslint:disable-next-line:no-unused
import _GetPersonaIdentifiersResult from // tslint:disable-line:import-spacing
  '../serviceFactory/results/GetPersonaIdentifiersResult';
import Config from './Config';
import mongoFilteringInMemory from './utils/mongoFilteringInMemory';

export default (config: Config) => {
  return async ({
    organisation,
    persona,
    filter = {},
  }: GetPersonaIdentifiersOptions): Promise<GetPersonaIdentifiersResult> => {
    const personaFilter = persona ? { persona } : {};

    const identifiers = mongoFilteringInMemory({
      ...filter,
      ...personaFilter,
      organisation,
    })(config.state.personaIdentifiers);

    return {
      identifiers,
    };
  };
};
