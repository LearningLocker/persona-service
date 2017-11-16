import GetPersonasOptions from '../repoFactory/options/GetPersonasOptions';
// tslint:disable-next-line:no-unused
import GetPersonasResult from '../repoFactory/results/GetPersonasResult';
// tslint:disable-next-line:no-unused
import ServiceGetPersonasResult from '../serviceFactory/results/GetPersonasResult';
import Config from './Config';
import mongoFilteringInMemory from './utils/mongoFilteringInMemory';

export default (config: Config) => {
  return async ({
    organisation,
    filter = {},
  }: GetPersonasOptions): Promise<GetPersonasResult> => {
    const personas = mongoFilteringInMemory({
      ...filter,
      organisation,
    })(config.state.personas);

    return {
      personas,
    };
  };
};
