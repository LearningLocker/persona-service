import * as stringToStream from 'string-to-stream';
import GetProfileOptions from '../serviceFactory/options/GetProfileOptions';
import GetProfileResult from '../serviceFactory/results/GetProfileResult';
import Config from './Config';
import getIdentifierByIfi from './utils/getIdentifierByIfi';

export default (config: Config) => {
  return async (opts: GetProfileOptions): Promise<GetProfileResult> => {
    const personaIdentifier = await getIdentifierByIfi(config, opts.agent);
    const profileId = opts.profileId;
    const profile = await config.repo.getProfileContent({ personaIdentifier, profileId });
    const content = (
      profile.contentType === 'application/json'
      ? stringToStream(JSON.stringify(profile.content))
      : stringToStream(profile.content)
    );

    return { content };
  };
};
