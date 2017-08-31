import GetIdentifierOptions from '../repoFactory/options/GetIdentifierOptions';
import GetIdentifierResult from '../repoFactory/results/GetIdentifierResult';
import Lockable from '../repoFactory/utils/Lockable';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetIdentifierOptions) => Promise<GetIdentifierResult & Lockable>;
export default _default;
