import NoModel from 'jscommons/dist/errors/NoModel';
import GetProfileContentOptions from '../repoFactory/options/GetProfileContentOptions';
import GetProfileContentResult from '../repoFactory/results/GetProfileContentResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetProfileContentOptions): Promise<GetProfileContentResult> => {
    const matchingProfiles = config.state.agentProfiles.filter((storedProfile) => {
      return (
        storedProfile.personaIdentifier === opts.personaIdentifier &&
        storedProfile.profileId === opts.profileId
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
