import CreateUpdateIdentifierPersonaOptions from '../serviceFactory/options/CreateUpdateIdentifierPersonaOptions';
import CreateUpdateIdentifierPersonaResult from '../serviceFactory/results/CreateUpdateIdentifierPersonaResult';
import Config from './Config';
declare const retryCreateUpdateIdentifierPersona: (config: Config) => (opts: CreateUpdateIdentifierPersonaOptions) => Promise<CreateUpdateIdentifierPersonaResult>;
export default retryCreateUpdateIdentifierPersona;
