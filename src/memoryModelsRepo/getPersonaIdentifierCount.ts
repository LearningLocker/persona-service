import GetPersonaIdentifierCountOptions from // tslint:disable-line:import-spacing
  '../repoFactory/options/GetPersonaIdentifierCountOptions';
import GetPersonaIdentifierCountResult from // tslint:disable-line:import-spacing
  '../repoFactory/results/GetPersonaIdentifierCountResult';
// tslint:disable-next-line:no-unused import-spacing
import _GetPersonaIdentifierCountOptions from
  '../serviceFactory/options/GetPersonaIdentifierCountOptions';
// tslint:disable-next-line:no-unused import-spacing
import _GetPersonaIdentifierCountResult from
  '../serviceFactory/results/GetPersonaIdentifierCountResult';
import Config from './Config';
import mongoFilteringInMemory from './utils/mongoFilteringInMemory';

export default (
  config: Config,
) => {
  return async ({
    filter,
    organisation,
  }: GetPersonaIdentifierCountOptions): Promise<GetPersonaIdentifierCountResult> => {

    const count = mongoFilteringInMemory({
      ...filter,
      organisation,
    })(config.state.personaIdentifiers).length;

    return {
      count,
    };
  };
};
