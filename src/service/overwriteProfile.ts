import OverwriteProfileOptions from '../serviceFactory/options/OverwriteProfileOptions';
import Config from './Config';
import getIfiFromAgent from './utils/getIfiFromAgent';

export default (config: Config) => {
  return async (opts: OverwriteProfileOptions) => {
    // Finds or creates Identifier.
    const ifi = getIfiFromAgent(opts.agent);
    const createIdentifierResult = await config.repo.createIdentifier({ ifi });
    const identifierId = createIdentifierResult.identifier.id;
    const isCreatedIdentifier = createIdentifierResult.wasCreated;

    // Creates a Persona if the Identifier doesn't have one.
    if (isCreatedIdentifier) {
      const name = ifi.key === 'account' ? ifi.value.name : ifi.value;
      const persona = (await config.repo.createPersona({ name })).persona.id;
      await config.repo.setIdentifierPersona({ id: identifierId, persona });
    }

    // Update or create Profile.
    await config.repo.overwriteProfile({
      content: opts.content,
      personaIdentifier: identifierId,
      profileId: opts.profileId,
    });

    return;
  };
};
