import * as rulr from 'rulr';
import * as streamToString from 'stream-to-string';
import * as xapi from 'xapi-validation/dist/factory';
import IfiCountWarning from 'xapi-validation/dist/warnings/IfiCountWarning';
import NoIfiWarning from 'xapi-validation/dist/warnings/NoIfiWarning';
import OverwriteProfileOptions from '../serviceFactory/options/OverwriteProfileOptions';
import Config from './Config';
import getIfiFromAgent from './utils/getIfiFromAgent';

const validateAgent = rulr.maybe(rulr.composeRules([
  rulr.restrictToSchema({
    account: rulr.optional(xapi.account),
    mbox: rulr.optional(xapi.mailto),
    mbox_sha1sum: rulr.optional(xapi.sha1),
    openid: rulr.optional(xapi.iri),
  }),
  (data, path) => {
    const keys = Object.keys(data);
    if (keys.length > 1) {
      return [new IfiCountWarning(data, path, keys)];
    }
    if (keys.length === 0) {
      return [new NoIfiWarning(data, path)];
    }
    return [];
  },
]));

export default (config: Config) => {
  return async (opts: OverwriteProfileOptions) => {
    // Validates agent.
    validateAgent(opts.agent, ['agent']);

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
    const contentString = await streamToString(opts.content);
    const content = (
      opts.contentType === 'application/json'
      ? JSON.parse(contentString)
      : contentString
    );
    await config.repo.overwriteProfile({
      content,
      contentType: opts.contentType,
      personaIdentifier: identifierId,
      profileId: opts.profileId,
    });

    return;
  };
};
