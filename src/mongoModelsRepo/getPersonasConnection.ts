import type Persona from '../models/Persona';
import type GetPersonasConnectionOptions from '../repoFactory/options/GetPersonasConnectionOptions';
import type GetPersonasConnectionResult from '../repoFactory/results/GetPersonasConnectionResult';
import type Config from './Config';
import pagination from './utils/pagination';

export default (config: Config) => {
  return async (opts: GetPersonasConnectionOptions): Promise<GetPersonasConnectionResult> =>
    await pagination(config, 'personas')<Persona>(opts);
};
