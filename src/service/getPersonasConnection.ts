// tslint:disable-next-line:no-unused
import Identifier from '../models/Persona';
import GetPersonasConnectionOptions from '../serviceFactory/options/GetPersonasConnectionOptions';
import GetPersonasConnectionResult from '../serviceFactory/results/GetPersonasConnectionResult';
// tslint:disable-next-line:no-unused
import GetOptions, { DEFAULT_LIMIT, Hint } from '../serviceFactory/utils/GetOptions';
// tslint:disable-next-line:no-unused
import PaginationResult from '../serviceFactory/utils/PaginationResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetPersonasConnectionOptions): Promise<GetPersonasConnectionResult> => {
    return config.repo.getPersonasConnection({
      limit: DEFAULT_LIMIT,
      ...opts,
    });
  };
};
