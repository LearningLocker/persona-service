// tslint:disable-next-line:no-unused
import ServiceGetPersonasOptions from '../serviceFactory/options/GetPersonasOptions';
// tslint:disable-next-line:no-unused
import ServiceGetPersonasResult from '../serviceFactory/results/GetPersonasResult';

import GetPersonasOptions from '../repoFactory/options/GetPersonasOptions';
import GetPersonasResult from '../repoFactory/results/GetPersonasResult';
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
