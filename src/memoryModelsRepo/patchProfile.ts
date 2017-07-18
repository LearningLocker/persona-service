import { isPlainObject } from 'lodash';
import NonJsonObject from '../errors/NonJsonObject';
import PatchProfileOptions from '../repoFactory/options/PatchProfileOptions';
import Config from './Config';
import createProfile from './utils/createProfile';
import matchUniqueProfile from './utils/matchUniqueProfile';

export default (config: Config) => {
  return async (opts: PatchProfileOptions): Promise<void> => {
    // Patches the content if the profile does already exist.
    let isExistingProfile = false;
    config.state.agentProfiles = config.state.agentProfiles.map((storedProfile) => {
      const isMatch = matchUniqueProfile(storedProfile, opts.personaIdentifier, opts.profileId);
      const isJson = (
        isMatch &&
        storedProfile.contentType === 'application/json' &&
        isPlainObject(storedProfile.content)
      );

      if (!isMatch) {
        return storedProfile;
      }

      isExistingProfile = true;
      if (!isJson) {
        throw new NonJsonObject();
      }

      return {
        ...storedProfile,

        // Merges top-level properties in content.
        content: {
          ...storedProfile.content,
          ...opts.content,
        },
      };
    });

    // Creates the Profile if the profile doesn't already exist.
    if (!isExistingProfile) {
      createProfile(config, opts);
    }
  };
};
