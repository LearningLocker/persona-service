import DeleteProfileOptions from '../serviceFactory/options/DeleteProfileOptions';
import Config from './Config';
import getIdentifierByIfi from './utils/getIdentifierByIfi';

export default (config: Config) => {
  return async (opts: DeleteProfileOptions): Promise<void> => {
    const personaIdentifier = await getIdentifierByIfi(config, opts.agent);
    const profileId = opts.profileId;
    await config.repo.deleteProfile({ personaIdentifier, profileId });
  };
};
