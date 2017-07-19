import GetProfilesOptions from '../repoFactory/options/GetProfilesOptions';
import GetProfilesResult from '../repoFactory/results/GetProfilesResult';
import Config from './Config';
import matchProfileIdentifier from './utils/matchProfileIdentifier';

export default (config: Config) => {
  return async (opts: GetProfilesOptions): Promise<GetProfilesResult> => {
    const client = opts.client;
    const personaIdentifier = opts.personaIdentifier;
    const matchingProfiles = config.state.agentProfiles.filter((profile) => {
      return matchProfileIdentifier({ client, personaIdentifier, profile });
    });

    const profileIds = matchingProfiles.map((profile) => {
      return profile.profileId;
    });

    return { profileIds };
  };
};
