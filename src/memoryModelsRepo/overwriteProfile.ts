import OverwriteProfileOptions from '../repoFactory/options/OverwriteProfileOptions';
import OverwriteProfileResult from '../repoFactory/results/OverwriteProfileResult';
import Config from './Config';
import createProfile from './utils/createProfile';
import matchUniqueProfile from './utils/matchUniqueProfile';

export default (config: Config) => {
  return async (opts: OverwriteProfileOptions): Promise<OverwriteProfileResult> => {
    // Overwrites the content if the profile does already exist.
    let existingId: string|undefined;
    config.state.agentProfiles = config.state.agentProfiles.map((storedProfile) => {
      const isMatch = matchUniqueProfile(storedProfile, opts.personaIdentifier, opts.profileId);

      if (!isMatch) {
        return storedProfile;
      }

      existingId = storedProfile.id;
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
    if (existingId === undefined) {
      const createdProfile = createProfile(config, opts);
      return { id: createdProfile.id };
    }

    return { id: existingId };
  };
};
