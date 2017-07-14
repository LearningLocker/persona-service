import * as streamToString from 'stream-to-string';
import { v4 as uuid } from 'uuid';
import Profile from '../models/Profile';
import OverwriteProfileOptions from '../repoFactory/options/OverwriteProfileOptions';
import Config from './Config';
import matchUniqueProfile from './utils/matchUniqueProfile';

export default (config: Config) => {
  return async (opts: OverwriteProfileOptions): Promise<void> => {
    const content = opts.content === undefined ? undefined : await streamToString(opts.content);

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
        content,
      };
    });

    // Creates the Profile if the profile doesn't already exist.
    if (!isExistingProfile) {
      const profile: Profile = {
        content,
        id: uuid(),
        organisation: '',
        personaIdentifier: opts.personaIdentifier,
        profileId: opts.profileId,
      };
      config.state.agentProfiles = [
        ...config.state.agentProfiles,
        profile,
      ];
    }
  };
};
