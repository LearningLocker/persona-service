import * as streamToString from 'stream-to-string';
import OverwriteProfileOptions from '../serviceFactory/options/OverwriteProfileOptions';
import Config from './Config';
import getIfiFromAgent from './utils/getIfiFromAgent';
import validateAgent from './utils/validateAgent';

export default (config: Config) => {
  return async (opts: OverwriteProfileOptions) => {
    const client = opts.client;

    // Validates agent.
    validateAgent(opts.agent, ['agent']);

    // Finds or creates Identifier.
    const ifi = getIfiFromAgent(opts.agent);
    const createIdentifierResult = await config.repo.createIdentifier({ client, ifi });
    const identifierId = createIdentifierResult.identifier.id;
    const isCreatedIdentifier = createIdentifierResult.wasCreated;

    // Creates a Persona if the Identifier doesn't have one.
    if (isCreatedIdentifier) {
      const name = ifi.key === 'account' ? ifi.value.name : ifi.value;
      const persona = (await config.repo.createPersona({ client, name })).persona.id;
      await config.repo.setIdentifierPersona({ id: identifierId, persona });
    }

    // Update or create Profile.
    const contentString = await streamToString(opts.content);
    const content = (
      opts.contentType === 'application/json'
      ? JSON.parse(contentString)
      : contentString
    );
    await config.repo.overwriteProfile({
      client,
      content,
      contentType: opts.contentType,
      personaIdentifier: identifierId,
      profileId: opts.profileId,
    });

    return;
  };
};
