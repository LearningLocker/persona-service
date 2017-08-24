import CreateUpdateIdentifierPersonaOptions from '../serviceFactory/options/CreateUpdateIdentifierPersonaOptions';
import CreateUpdateIdentifierPersonaResult from '../serviceFactory/results/CreateUpdateIdentifierPersonaResult';
import Config from './Config';
declare const _default: (config: Config) => ({organisation, ifi, personaName}: CreateUpdateIdentifierPersonaOptions) => Promise<CreateUpdateIdentifierPersonaResult>;
export default _default;
