import NoModel from 'jscommons/dist/errors/NoModel';
import GetProfilesOptions from '../serviceFactory/options/GetProfilesOptions';
import GetProfilesResult from '../serviceFactory/results/GetProfilesResult';
import Config from './Config';
import getIfiFromAgent from './utils/getIfiFromAgent';

export default (config: Config) => {
  return async (opts: GetProfilesOptions): Promise<GetProfilesResult> => {
    try {
      // Finds Identifier using Agent.
      const ifi = getIfiFromAgent(opts.agent);
      const personaIdentifier = (await config.repo.getIdentifierByIfi({ ifi })).identifierId;

      // Finds Profiles using Identifier.
      const profileIds = (await config.repo.getProfiles({ personaIdentifier })).profileIds;

      return { profileIds };
    } catch (err) {
      if (err !== null && err !== undefined && err.constructor === NoModel) {
        return { profileIds: [] };
      }
      throw err;
    }
  };
};
