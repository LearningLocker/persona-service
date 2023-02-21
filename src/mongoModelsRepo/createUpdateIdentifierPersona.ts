import NoModel from 'jscommons/dist/errors/NoModel';
import { ObjectID } from 'mongodb';
import * as promiseRetry from 'promise-retry';

import { ExpiredLock } from '../errors/ExpiredLock';
import Locked from '../errors/Locked';
import type CreateUpdateIdentifierPersonaOptions from '../repoFactory/options/CreateUpdateIdentifierPersonaOptions';
import type GetIdentifierOptions from '../repoFactory/options/GetIdentifierOptions';
import type CreateUpdateIdentifierPersonaResult from '../repoFactory/results/CreateUpdateIdentifierPersonaResult';
import type GetIdentifierResult from '../repoFactory/results/GetIdentifierResult';
import type Lockable from '../repoFactory/utils/Lockable';
import type Config from './Config';
import getTheIdentifier from './getIdentifier';
import getIdentifierByIfi from './getIdentifierByIfi';
import createIdentifier from './utils/createIdentifier';
import createOrUpdateIdentifier from './utils/createOrUpdateIdentifier';
import { createPersonaAndAddToIdentifier } from './utils/createPersonaAndAddToIdentifier';

type TheCreateUpdateIdentifierPersonaOptions = CreateUpdateIdentifierPersonaOptions & {
  readonly getIdentifier?: (opts: GetIdentifierOptions) => Promise<GetIdentifierResult & Lockable>;
};

const create = (config: Config) =>
  async ({
    organisation,
    ifi,
    personaName,
  }: CreateUpdateIdentifierPersonaOptions):
  Promise<CreateUpdateIdentifierPersonaResult> => {
    const { identifier, wasCreated } = await createIdentifier(config)({
      ifi,
      organisation,
    });

    if (!wasCreated) {
      // something else has created this identifier.
      throw new Locked(identifier);
    }

    return await createPersonaAndAddToIdentifier(config)({
      identifier,
      personaName,
    });
  };

const createUpdateIdentifierPersona = (config: Config) =>
  async ({
    organisation,
    ifi,
    personaName,
    getIdentifier = getTheIdentifier(config), // for testing.
  }: TheCreateUpdateIdentifierPersonaOptions): Promise<CreateUpdateIdentifierPersonaResult> => {
    // find the ifi
    try { // Identifier exists, so do nothing.
      const { identifierId } = await getIdentifierByIfi(config)({
        ifi,
        organisation,
      });
      const { identifier: foundIdentifier, locked } = await getIdentifier({
        id: identifierId,
        organisation,
      });

      if (locked === true) {
        // We are locked, wait for unlock
        throw new Locked(foundIdentifier);
      }

      // Shouldn't happen, as persona should always be set if unlocked.
      /* istanbul ignore next */
      if (foundIdentifier.persona === undefined) {
        throw new Error('Identifier should have a persona');
      }

      // What should happen if persona name is different ???
      // currently it doesn't get updated

      return {
        identifierId,
        identifier: foundIdentifier,
        personaId: foundIdentifier.persona,
        wasCreated: false,
      };
    } catch (err) {
      if (err instanceof NoModel) {
        return await create(config)({
          ifi,
          organisation,
          personaName,
        });
      }
      if (err instanceof ExpiredLock) {
        const {
          identifier: expiredIdentifier,
          ignorePersonaId,
        } = err;

        const { identifier: identifierWithoutPersona } = await createOrUpdateIdentifier(config)({
          filter: {
            _id: new ObjectID(expiredIdentifier.id),
            organisation: new ObjectID(organisation),
          },
          update: {
            $set: { lockedAt: new Date() },
            ...(
              ignorePersonaId
                ? { $unset: { persona: '' } }
                : {}
            ),
          },
          upsert: false,
        });

        return await createPersonaAndAddToIdentifier(config)({
          identifier: identifierWithoutPersona,
          personaName,
        });
      }

      throw err;
    }
  };

const retryCreateUpdateIdentifierPersona = (config: Config) =>
  async (opts: TheCreateUpdateIdentifierPersonaOptions):
  Promise<CreateUpdateIdentifierPersonaResult> => {
    const createUpdateIdentifierPersonaFn = createUpdateIdentifierPersona(config);

    return await promiseRetry<CreateUpdateIdentifierPersonaResult>(
      async (retry) => {
        try {
          const res = await createUpdateIdentifierPersonaFn(opts);

          return res;
        } catch (err) {
          /* istanbul ignore else */
          if (err instanceof Locked) {
            return await retry(err);
          }
          /* istanbul ignore next */
          throw err;
        }
      },
      {
        maxTimeout: 300,
        minTimeout: 30,
        retries: 3,
      },
    );
  };

export default retryCreateUpdateIdentifierPersona;
