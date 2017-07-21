import * as stringToStream from 'string-to-stream';
import GetProfileOptions from '../serviceFactory/options/GetProfileOptions';
import GetProfileResult from '../serviceFactory/results/GetProfileResult';
import Config from './Config';
import checkProfileReadScopes from './utils/checkProfileReadScopes';
import getIdentifierByIfi from './utils/getIdentifierByIfi';

export default (config: Config) => {
  return async (opts: GetProfileOptions): Promise<GetProfileResult> => {
    checkProfileReadScopes(opts.client.scopes);
    const personaIdentifier = await getIdentifierByIfi({
      agent: opts.agent,
      client: opts.client,
      config,
    });
    const profile = await config.repo.getProfile({
      client: opts.client,
      personaIdentifier,
      profileId: opts.profileId,
    });

    if (profile.content !== undefined) {
      return {
        content: stringToStream(JSON.stringify(profile.content)),
        etag: profile.etag,
        updatedAt: profile.updatedAt,
      };
    }

    const profileContentResult = await config.repo.getProfileContent({
      key: profile.id,
    });
    return {
      content: profileContentResult.content,
      etag: profile.etag,
      updatedAt: profile.updatedAt,
    };
  };
};
