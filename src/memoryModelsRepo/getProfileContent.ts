import NoModel from 'jscommons/dist/errors/NoModel';
import { defaultTo } from 'lodash';
import * as stringToStream from 'string-to-stream';
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

    const profileContent = matchingProfiles[0].content;
    const content = stringToStream(defaultTo<string>(profileContent, ''));
    return { content };
  };
};
