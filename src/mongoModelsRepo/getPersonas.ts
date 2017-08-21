import Persona from '../models/Persona';
import GetPersonasOptions from '../repoFactory/options/GetPersonasOptions';
import GetPersonasResult from '../repoFactory/results/GetPersonasResult';
// tslint:disable-next-line:no-unused
import GetOptions, { CursorDirection } from '../serviceFactory/utils/GetOptions';
// tslint:disable-next-line:no-unused
import PaginationResult from '../serviceFactory/utils/PaginationResult';
import Config from './Config';
import pagination from './utils/pagination';

export default (config: Config) => {
  return async (opts: GetPersonasOptions): Promise<GetPersonasResult> =>
    pagination(config, 'personas')<Persona>(opts);
};
