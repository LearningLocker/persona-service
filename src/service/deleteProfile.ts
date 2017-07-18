import DeleteProfileOptions from '../serviceFactory/options/DeleteProfileOptions';
import Config from './Config';
import getIfiFromAgent from './utils/getIfiFromAgent';
import validateAgent from './utils/validateAgent';

export default (config: Config) => {
  return async (opts: DeleteProfileOptions): Promise<void> => {
    // Validates agent.
    validateAgent(opts.agent, ['agent']);

    // Finds Identifier using Agent.
    const ifi = getIfiFromAgent(opts.agent);
    const personaIdentifier = (await config.repo.getIdentifierByIfi({ ifi })).identifierId;

    // Get profile content.
    const profileId = opts.profileId;
    await config.repo.deleteProfile({ personaIdentifier, profileId });
  };
};
