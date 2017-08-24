import GetIdentifierOptions from '../repoFactory/options/GetIdentifierOptions';
import GetIdentifierResult from '../repoFactory/results/GetIdentifierResult';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetIdentifierOptions) => Promise<GetIdentifierResult>;
export default _default;
