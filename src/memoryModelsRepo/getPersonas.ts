import GetPersonasOptions from '../repoFactory/options/GetPersonasOptions';
// tslint:disable-next-line:no-unused
import GetPersonasResult, { SingleResult } from '../repoFactory/results/GetPersonasResult';
import Config from './Config';
import mongoFilteringInMemory from './utils/mongoFilteringInMemory';

export default (config: Config) => {
  return async (opts: GetPersonasOptions): Promise<GetPersonasResult> => {
    const filter = {
      ...opts.filter,
      organisation: opts.organisation,
    };

    const documents = mongoFilteringInMemory(filter)<SingleResult>(config.state.personas);

    return documents;
  };
};
