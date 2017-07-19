import NoModel from 'jscommons/dist/errors/NoModel';
import GetProfileContentOptions from '../repoFactory/options/GetProfileContentOptions';
import GetProfileContentResult from '../repoFactory/results/GetProfileContentResult';
import Config from './Config';
import matchProfileIdentifier from './utils/matchProfileIdentifier';

export default (config: Config) => {
  return async (opts: GetProfileContentOptions): Promise<GetProfileContentResult> => {
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

    const { content, contentType } = matchingProfiles[0];
    return { content, contentType };
  };
};
