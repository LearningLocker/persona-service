import DeleteProfileOptions from '../serviceFactory/options/DeleteProfileOptions';
import Config from './Config';
import checkProfileWriteScopes from './utils/checkProfileWriteScopes';
import getIdentifierByIfi from './utils/getIdentifierByIfi';

export default (config: Config) => {
  return async (opts: DeleteProfileOptions): Promise<void> => {
    const client = opts.client;
    checkProfileWriteScopes(client.scopes);

    const agent = opts.agent;
    const personaIdentifier = await getIdentifierByIfi({ agent, client, config });
    const profileId = opts.profileId;
    const deleteResult = await config.repo.deleteProfile({
      client,
      personaIdentifier,
      profileId,
    });

    if (deleteResult.contentType !== 'application/json') {
      await config.repo.deleteProfileContent({
        key: deleteResult.id,
      });
    }
  };
};
