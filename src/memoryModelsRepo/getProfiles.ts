import GetProfilesOptions from '../repoFactory/options/GetProfilesOptions';
import GetProfilesResult from '../repoFactory/results/GetProfilesResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetProfilesOptions): Promise<GetProfilesResult> => {
    const matchingProfiles = config.state.agentProfiles.filter((storedProfile) => {
      return storedProfile.personaIdentifier === opts.personaIdentifier;
    });

    const profileIds = matchingProfiles.map((storedProfile) => {
      return storedProfile.profileId;
    });

    return { profileIds };
  };
};
