import type GetIdentifierOptions from '../serviceFactory/options/GetIdentifierOptions';
import type GetIdentifierResult from '../serviceFactory/results/GetIdentifierResult';
import type Config from './Config';

export default (config: Config) => {
  return async (opts: GetIdentifierOptions): Promise<GetIdentifierResult> => {
    return await config.repo.getIdentifier(opts);
  };
};
