import type CreateIdentifierOptions from '../serviceFactory/options/CreateIdentifierOptions';
import type CreateIdentifierResult from '../serviceFactory/results/CreateIdentifierResult';
import type Config from './Config';

// Deprecated: use createUpdateIdentifierPersona
export default (config: Config) =>
  async (opts: CreateIdentifierOptions): Promise<CreateIdentifierResult> => {
    return await config.repo.createIdentifier(opts);
  };
