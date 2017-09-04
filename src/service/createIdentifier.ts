import CreateIdentifierOptions from '../serviceFactory/options/CreateIdentifierOptions';
import CreateIdentifierResult from '../serviceFactory/results/CreateIdentifierResult';
import Config from './Config';

// Deprecated: use createUpdateIdentifierPersona
export default (config: Config) =>
  async (opts: CreateIdentifierOptions): Promise<CreateIdentifierResult> => {
    return config.repo.createIdentifier(opts);
  };
