import NoModel from 'jscommons/dist/errors/NoModel';
import GetProfileOptions from '../repoFactory/options/GetProfileOptions';
import GetProfileResult from '../repoFactory/results/GetProfileResult';
import Config from './Config';
import matchProfileIdentifier from './utils/matchProfileIdentifier';

export default (config: Config) => {
  return async (opts: GetProfileOptions): Promise<GetProfileResult> => {
    const client = opts.client;
    const personaIdentifier = opts.personaIdentifier;
    const matchingProfiles = config.state.agentProfiles.filter((profile) => {
      return (
        matchProfileIdentifier({ client, personaIdentifier, profile }) &&
        profile.profileId === opts.profileId
      );
    });

    const isExistingIfi = matchingProfiles.length !== 0;
    if (!isExistingIfi) {
      /* istanbul ignore next */
      throw new NoModel('Agent Profile');
    }

    const { id, content, contentType } = matchingProfiles[0];
    return { id, content, contentType };
  };
};
