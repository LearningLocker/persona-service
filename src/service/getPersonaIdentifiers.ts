// tslint:disable-next-line:no-unused
import _GetPersonaIdentifiersOptions from '../serviceFactory/options/GetPersonaIdentifiersOptions';
// tslint:disable-next-line:no-unused
import _GetPersonaIdentifiersResult from '../serviceFactory/results/GetPersonaIdentifiersResult';
import Config from './Config';

export default (config: Config) => config.repo.getPersonaIdentifiers;
