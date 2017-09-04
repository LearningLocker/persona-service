import CreateUpdateIdentifierPersonaOptions from '../repoFactory/options/CreateUpdateIdentifierPersonaOptions';
import CreateUpdateIdentifierPersonaResult from '../repoFactory/results/CreateUpdateIdentifierPersonaResult';
import MemoryConfig from './Config';
declare const createUpdateIdentifierPersona: (config: MemoryConfig) => ({organisation, ifi, personaName}: CreateUpdateIdentifierPersonaOptions) => Promise<CreateUpdateIdentifierPersonaResult>;
export default createUpdateIdentifierPersona;
