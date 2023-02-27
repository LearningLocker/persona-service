import type GetPersonasConnectionOptions from '../serviceFactory/options/GetPersonasConnectionOptions';
import type GetPersonasConnectionResult from '../serviceFactory/results/GetPersonasConnectionResult';
import type Config from './Config';

export default (config: Config) =>
  async (opts: GetPersonasConnectionOptions): Promise<GetPersonasConnectionResult> =>
    await config.repo.getPersonasConnection(opts);
