import GetPersonasConnectionOptions from '../serviceFactory/options/GetPersonasConnectionOptions';
import GetPersonasConnectionResult from '../serviceFactory/results/GetPersonasConnectionResult';
import Config from './Config';

export default (config: Config) =>
  async (opts: GetPersonasConnectionOptions): Promise<GetPersonasConnectionResult> =>
    config.repo.getPersonasConnection(opts);
