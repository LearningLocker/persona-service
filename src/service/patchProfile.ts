import { isPlainObject } from 'lodash';
import * as streamToString from 'stream-to-string';
import PatchProfileOptions from '../serviceFactory/options/PatchProfileOptions';
import Config from './Config';
import getIfiFromAgent from './utils/getIfiFromAgent';

export default (config: Config) => {
  return async (opts: PatchProfileOptions): Promise<void> => {
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

    // Patches the content if the content is JSON.
    if (opts.contentType !== 'application/json') {
      throw new Error();
    }

    const content = JSON.parse(await streamToString(opts.content));
    if (!isPlainObject(content)) {
      throw new Error();
    }

    await config.repo.patchProfile({
      content,
      contentType: opts.contentType,
      personaIdentifier: identifierId,
      profileId: opts.profileId,
    });
    return;
  };
};
