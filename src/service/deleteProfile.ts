import DeleteProfileOptions from '../serviceFactory/options/DeleteProfileOptions';
import Config from './Config';
import getIdentifierByIfi from './utils/getIdentifierByIfi';

export default (config: Config) => {
  return async (opts: DeleteProfileOptions): Promise<void> => {
    const agent = opts.agent;
    const client = opts.client;
    const personaIdentifier = await getIdentifierByIfi({ agent, client, config });
    const profileId = opts.profileId;
    await config.repo.deleteProfile({ client, personaIdentifier, profileId });
  };
};
