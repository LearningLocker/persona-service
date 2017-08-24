import SetIdentifierPersonaOptions from '../repoFactory/options/SetIdentifierPersonaOptions';
import SetIdentifierPersonaResult from '../repoFactory/results/SetIdentifierPersonaResult';
import Config from './Config';
declare const _default: (config: Config) => ({id, organisation, persona, locked}: SetIdentifierPersonaOptions) => Promise<SetIdentifierPersonaResult>;
export default _default;
