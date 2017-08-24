import GetIfisByPersonaOptions from '../repoFactory/options/GetIfisByPersonaOptions';
import GetIfisByPersonaResult from '../repoFactory/results/GetIfisByPersonaResult';
import Config from './Config';
declare const _default: (config: Config) => ({organisation, ...opts}: GetIfisByPersonaOptions) => Promise<GetIfisByPersonaResult>;
export default _default;
