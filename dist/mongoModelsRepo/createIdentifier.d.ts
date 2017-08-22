import CreateIdentifierOptions from '../repoFactory/options/CreateIdentifierOptions';
import CreateIdentifierResult from '../repoFactory/results/CreateIdentifierResult';
import Config from './Config';
declare const _default: (config: Config) => ({persona, ...opts}: CreateIdentifierOptions) => Promise<CreateIdentifierResult>;
export default _default;
