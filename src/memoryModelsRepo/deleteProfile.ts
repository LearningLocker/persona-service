import NoModel from 'jscommons/dist/errors/NoModel';
import DeleteProfileOptions from '../repoFactory/options/DeleteProfileOptions';
import Config from './Config';
import matchProfileIdentifier from './utils/matchProfileIdentifier';

export default (config: Config) => {
  return async (opts: DeleteProfileOptions): Promise<void> => {
    const storedProfiles = config.state.agentProfiles;
    const client = opts.client;
    const personaIdentifier = opts.personaIdentifier;
    const remainingProfiles = storedProfiles.filter((profile) => {
      return !(
        matchProfileIdentifier({ client, personaIdentifier, profile }) &&
        profile.profileId === opts.profileId
      );
    });

    const isExistingIfi = remainingProfiles.length < storedProfiles.length;
    if (!isExistingIfi) {
      /* istanbul ignore next */
      throw new NoModel('Agent Profile');
    }

    config.state.agentProfiles = remainingProfiles;
  };
};
