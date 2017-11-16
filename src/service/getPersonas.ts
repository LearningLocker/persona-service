// tslint:disable-next-line:no-unused
import GetPersonasOptions from '../repoFactory/options/GetPersonasOptions';
// tslint:disable-next-line:no-unused
import GetPersonasResult from '../serviceFactory/results/GetPersonasResult';
import Config from './Config';

export default (config: Config) => config.repo.getPersonas;
