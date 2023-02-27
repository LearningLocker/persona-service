import type Identifier from '../models/Identifier';
import type GetIdentifiersOptions from '../repoFactory/options/GetIdentifiersOptions';
import type GetIdentifiersResult from '../repoFactory/results/GetIdentifiersResult';
import type Config from './Config';
import pagination from './utils/pagination';

export default (config: Config) => {
  return async (opts: GetIdentifiersOptions): Promise<GetIdentifiersResult> =>
    await pagination(config, 'personaIdentifiers')<Identifier>(opts);
};
