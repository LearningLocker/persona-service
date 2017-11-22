import _GetPersonaAttributeCountOptions from // tslint:disable-line:import-spacing no-unused
'../serviceFactory/options/GetPersonaAttributeCountOptions';
import _GetPersonaAttributeCountResult from // tslint:disable-line:import-spacing no-unused
'../serviceFactory/results/GetPersonaAttributeCountResult';
import Config from './Config';

export default (config: Config) => config.repo.getPersonaAttributeCount;
