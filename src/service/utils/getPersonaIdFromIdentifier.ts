import { delay } from 'bluebird';
import UnassignedPersonaOnIdentifier from '../../errors/UnassignedPersonaOnIdentifier';
import logger from '../../logger';
import ClientModel from '../../models/ClientModel';
import Identifier from '../../models/Identifier';
import Config from '../Config';

const DEFAULT_RETRIES = 3;

interface GetPersonaIdWithRetryOptions {
  readonly client: ClientModel;
  readonly config: Config;
  readonly identifierId: string;
  readonly retryCount?: number;
}

const getPersonaIdWithRetry = async (opts: GetPersonaIdWithRetryOptions): Promise<string> => {
  const {
    client,
    config,
    identifierId,
    retryCount = DEFAULT_RETRIES,
  } = opts;
  const {identifier} = await config.repo.getIdentifier({
    client,
    id: identifierId,
  });

  if (identifier.persona === undefined && retryCount > 0) {
    const theDelay = 100;
    await delay(theDelay);
    logger.warn('uploadproflies retrying finding identifier persona');
    return getPersonaIdWithRetry({
      ...opts,
      retryCount: retryCount - 1,
    });
  } else if (identifier.persona !== undefined) {
    return identifier.persona;
  } else {
    throw new UnassignedPersonaOnIdentifier();
  }
};

export interface GetPersonaIdFromIdentifierOptions {
  client: ClientModel;
  config: Config;
  identifier: Identifier;
  wasCreated: boolean;
}
const getPersonaIdFromIdentifier = async ({
  client,
  config,
  identifier,
  wasCreated,
}: GetPersonaIdFromIdentifierOptions): Promise<string> => {
  if (wasCreated) {
    const {persona} = await config.repo.createPersona({ client });
    await config.repo.setIdentifierPersona({
      id: identifier.id,
      persona: persona.id,
    });
    return persona.id;
  } else if (!wasCreated && identifier.persona !== undefined) {
    return identifier.persona;
  } else /* if (!wasCreated && primaryIdentifier === undefined) */ {
    // Shouldn't happen, but just in case, retry 3 times, with backoff

    return await getPersonaIdWithRetry({
      client,
      config,
      identifierId: identifier.id,
    });
  }
};

export default getPersonaIdFromIdentifier;
