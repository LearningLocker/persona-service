import GetIdentifierOptions from '../serviceFactory/options/GetIdentifierOptions';
import GetIdentifierResult from '../serviceFactory/results/GetIdentifierResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetIdentifierOptions): Promise<GetIdentifierResult> => {
    const { identifier } = await config.repo.getIdentifier(opts);
    return {
      identifier,
    };
  };
};
