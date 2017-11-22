import _GetPersonaIdentifierCountOptions from // tslint:disable-line:import-spacing no-unused
  '../serviceFactory/options/GetPersonaIdentifierCountOptions';
import _GetPersonaIdentifierCountResult from // tslint:disable-line:import-spacing no-unused
  '../serviceFactory/results/GetPersonaIdentifierCountResult';
import Config from './Config';

export default (config: Config) => config.repo.getPersonaIdentifierCount;
