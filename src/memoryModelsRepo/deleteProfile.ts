import NoModel from 'jscommons/dist/errors/NoModel';
import DeleteProfileOptions from '../repoFactory/options/DeleteProfileOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeleteProfileOptions): Promise<void> => {
    const storedProfiles = config.state.agentProfiles;
    const remainingProfiles = storedProfiles.filter((storedProfile) => {
      return !(
        storedProfile.personaIdentifier === opts.personaIdentifier &&
        storedProfile.profileId === opts.profileId
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
