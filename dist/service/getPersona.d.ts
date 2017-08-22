import GetPersonaOptions from '../serviceFactory/options/GetPersonaOptions';
import GetPersonaResult from '../serviceFactory/results/GetPersonaResult';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetPersonaOptions) => Promise<GetPersonaResult>;
export default _default;
