// tslint:disable-next-line:no-unused
import Identifier from '../models/Persona';
import GetPersonasOptions from '../serviceFactory/options/GetPersonasOptions';
import GetPersonasResult from '../serviceFactory/results/GetPersonasResult';
// tslint:disable-next-line:no-unused
import GetOptions, { Hint } from '../serviceFactory/utils/GetOptions';
// tslint:disable-next-line:no-unused
import PaginationResult from '../serviceFactory/utils/PaginationResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetPersonasOptions): Promise<GetPersonasResult> => {

    return config.repo.getPersonas({...opts});
  };
};
