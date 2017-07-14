import GetProfileOptions from '../serviceFactory/options/GetProfileOptions';
import GetProfileResult from '../serviceFactory/results/GetProfileResult';
import Config from './Config';
import getIfiFromAgent from './utils/getIfiFromAgent';

export default (config: Config) => {
  return async (opts: GetProfileOptions): Promise<GetProfileResult> => {
    // Finds Identifier using Agent.
    const ifi = getIfiFromAgent(opts.agent);
    const personaIdentifier = (await config.repo.getIdentifierByIfi({ ifi })).identifierId;

    // Get profile content.
    const profileId = opts.profileId;
    const content = (await config.repo.getProfileContent({ profileId, personaIdentifier })).content;

    return { content };
  };
};
