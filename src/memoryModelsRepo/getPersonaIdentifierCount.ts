import GetPersonaCountOptions from '../repoFactory/options/GetPersonaCountOptions';
import GetPersonaCountResult from '../repoFactory/results/GetPersonaCountResult';
// tslint:disable-next-line:no-unused
import _GetPersonaCountOptions from '../serviceFactory/options/GetPersonaCountOptions';
// tslint:disable-next-line:no-unused
import _GetPersonaCountResult from '../serviceFactory/results/GetPersonaCountResult';
import Config from './Config';
import mongoFilteringInMemory from './utils/mongoFilteringInMemory';

export default (
  config: Config,
) => {
  return async ({
    filter,
    organisation,
  }: GetPersonaCountOptions): Promise<GetPersonaCountResult> => {

    const count = mongoFilteringInMemory({
      ...filter,
      organisation,
    })(config.state.personaIdentifiers).length;

    return {
      count,
    };
  };
};
