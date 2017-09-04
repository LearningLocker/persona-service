import CreateIdentifierOptions from '../repoFactory/options/CreateIdentifierOptions';
import CreateIdentifierResult from '../repoFactory/results/CreateIdentifierResult';
import Lockable from '../repoFactory/utils/Lockable';
import Config from './Config';
declare const _default: (config: Config) => ({persona, locked, organisation, ifi}: CreateIdentifierOptions & Lockable) => Promise<CreateIdentifierResult>;
export default _default;
