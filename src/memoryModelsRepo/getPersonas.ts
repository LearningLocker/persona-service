import GetPersonasOptions from '../repoFactory/options/GetPersonasOptions';
// tslint:disable-next-line:no-unused
import GetPersonasResult from '../repoFactory/results/GetPersonasResult';
// tslint:disable-next-line:no-unused
import ServiceGetPersonasResult from '../serviceFactory/results/GetPersonasResult';
import Config from './Config';
import mongoFilteringInMemory from './utils/mongoFilteringInMemory';

export default (config: Config) => {
  return async (opts: GetPersonasOptions): Promise<GetPersonasResult> => {
    const filter = {
      ...opts.filter,
      organisation: opts.organisation,
    };

    const personas = mongoFilteringInMemory(filter)(config.state.personas);

    return {
      personas,
    };
  };
};
