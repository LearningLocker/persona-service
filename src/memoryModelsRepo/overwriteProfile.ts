import OverwriteProfileOptions from '../repoFactory/options/OverwriteProfileOptions';
import Config from './Config';
import createProfile from './utils/createProfile';
import matchUniqueProfile from './utils/matchUniqueProfile';

export default (config: Config) => {
  return async (opts: OverwriteProfileOptions): Promise<void> => {
    // Overwrites the content if the profile does already exist.
    let isExistingProfile = false;
    config.state.agentProfiles = config.state.agentProfiles.map((storedProfile) => {
      const isMatch = matchUniqueProfile(storedProfile, opts.personaIdentifier, opts.profileId);

      if (!isMatch) {
        return storedProfile;
      }

      isExistingProfile = true;
      return {
        ...storedProfile,

        // Overwrites the content and contentType.
        content: opts.content,
        contentType: opts.contentType,

        // Updates updatedAt time.
        updatedAt: new Date(),
      };
    });

    // Creates the Profile if the profile doesn't already exist.
    if (!isExistingProfile) {
      createProfile(config, opts);
    }
  };
};
