import CreatePersonaOptions from '../serviceFactory/options/CreatePersonaOptions';
import CreatePersonaResult from '../serviceFactory/results/CreatePersonaResult';
import Config from './Config';
declare const _default: (config: Config) => (opts: CreatePersonaOptions) => Promise<CreatePersonaResult>;
export default _default;
