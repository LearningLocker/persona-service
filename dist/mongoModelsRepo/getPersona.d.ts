import GetPersonaOptions from '../repoFactory/options/GetPersonaOptions';
import GetPersonaResult from '../repoFactory/results/GetPersonaResult';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetPersonaOptions) => Promise<GetPersonaResult>;
export default _default;
