import * as streamToString from 'stream-to-string';
import OverwriteProfileOptions from '../serviceFactory/options/OverwriteProfileOptions';
import Config from './Config';
import checkProfileWriteScopes from './utils/checkProfileWriteScopes';
import createEtag from './utils/createEtag';
import getIfiFromAgent from './utils/getIfiFromAgent';
import validateAgent from './utils/validateAgent';

export default (config: Config) => {
  return async (opts: OverwriteProfileOptions) => {
    const client = opts.client;
    checkProfileWriteScopes(client.scopes);

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
    const etag = createEtag();
    const jsonContent = (
      opts.contentType === 'application/json'
      ? JSON.parse(await streamToString(opts.content))
      : undefined
    );
    const overwriteProfileResult = await config.repo.overwriteProfile({
      client,
      content: jsonContent,
      contentType: opts.contentType,
      etag,
      ifMatch: opts.ifMatch,
      ifNoneMatch: opts.ifNoneMatch,
      personaIdentifier: identifierId,
      profileId: opts.profileId,
    });

    if (opts.contentType !== 'application/json') {
      await config.repo.storeProfileContent({
        content: opts.content,
        key: overwriteProfileResult.id,
      });
    }

    return;
  };
};
