import GetIdentifierOptions from '../serviceFactory/options/GetIdentifierOptions';
import GetIdentifierResult from '../serviceFactory/results/GetIdentifierResult';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetIdentifierOptions) => Promise<GetIdentifierResult>;
export default _default;
