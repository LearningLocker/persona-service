import SetIdentifierPersonaOptions from '../repoFactory/options/SetIdentifierPersonaOptions';
import SetIdentifierPersonaResult from '../repoFactory/Results/SetIdentifierPersonaResult';
import Config from './Config';
declare const _default: (config: Config) => ({organisation, persona, ...opts}: SetIdentifierPersonaOptions) => Promise<SetIdentifierPersonaResult>;
export default _default;
