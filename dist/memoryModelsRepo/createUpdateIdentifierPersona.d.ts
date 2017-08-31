import CreateUpdateIdentifierPersonaOptions from '../repoFactory/options/CreateUpdateIdentifierPersonaOptions';
import CreateUpdateIdentifierPersonaResult from '../repoFactory/results/CreateUpdateIdentifierPersonaResult';
import Config from './Config';
declare const createUpdateIdentifierPersona: (config: Config) => ({organisation, ifi, personaName}: CreateUpdateIdentifierPersonaOptions) => Promise<CreateUpdateIdentifierPersonaResult>;
export default createUpdateIdentifierPersona;
