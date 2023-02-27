import type OverwriteIdentifierOptions from '../serviceFactory/options/OverwriteIdentifierOptions';
import type OverwriteIdentifierResult from '../serviceFactory/results/OverwriteIdentifierResult';
import type Config from './Config';

export default (config: Config) =>
  async (opts: OverwriteIdentifierOptions): Promise<OverwriteIdentifierResult> => {
    return await config.repo.overwriteIdentifier(opts);
  };
