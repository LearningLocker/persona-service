import OverwriteIdentifierOptions from '../serviceFactory/options/OverwriteIdentifierOptions';
import OverwriteIdentifierResult from '../serviceFactory/results/OverwriteIdentifierResult';
import Config from './Config';

export default (config: Config) =>
  async (opts: OverwriteIdentifierOptions): Promise<OverwriteIdentifierResult> => {
    return config.repo.overwriteIdentifier(opts);
  };
