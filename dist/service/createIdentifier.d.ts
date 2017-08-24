import CreateIdentifierOptions from '../serviceFactory/options/CreateIdentifierOptions';
import CreateIdentifierResult from '../serviceFactory/results/CreateIdentifierResult';
import Config from './Config';
declare const _default: (config: Config) => (opts: CreateIdentifierOptions) => Promise<CreateIdentifierResult>;
export default _default;
