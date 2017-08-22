import GetIfisByPersonaOptions from '../serviceFactory/options/GetIfisByPersonaOptions';
import GetIfisByPersonaResult from '../serviceFactory/results/GetIfisByPersonaResult';
import Config from './Config';
declare const _default: (config: Config) => ({persona: personaId, ...opts}: GetIfisByPersonaOptions) => Promise<GetIfisByPersonaResult>;
export default _default;
