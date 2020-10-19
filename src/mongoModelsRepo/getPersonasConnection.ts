import Persona from '../models/Persona';
import GetPersonasConnectionOptions from '../repoFactory/options/GetPersonasConnectionOptions';
import GetPersonasConnectionResult from '../repoFactory/results/GetPersonasConnectionResult';
import Config from './Config';
import pagination from './utils/pagination';

export default (config: Config) => {
  return async (opts: GetPersonasConnectionOptions): Promise<GetPersonasConnectionResult> =>
    pagination(config, 'personas')<Persona>(opts);
};
