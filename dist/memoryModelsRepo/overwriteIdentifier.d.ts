import OverwriteIdentifierOptions from '../repoFactory/options/OverwriteIdentifierOptions';
import OverwriteIdentifierResult from '../repoFactory/results/OverwriteIdentifierResult';
import Config from './Config';
declare const _default: (config: Config) => ({organisation, ifi, persona, locked}: OverwriteIdentifierOptions) => Promise<OverwriteIdentifierResult>;
export default _default;
