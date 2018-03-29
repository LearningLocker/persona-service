import NoModel from 'jscommons/dist/errors/NoModel';
import * as promiseRetry from 'promise-retry';
import Locked from '../errors/Locked';
import CreateUpdateIdentifierPersonaOptions // tslint:disable-line:import-spacing
  from '../repoFactory/options/CreateUpdateIdentifierPersonaOptions';
import GetIdentifierOptions from '../repoFactory/options/GetIdentifierOptions';
import CreateUpdateIdentifierPersonaResult // tslint:disable-line:import-spacing
  from '../repoFactory/results/CreateUpdateIdentifierPersonaResult';
import GetIdentifierResult from '../repoFactory/results/GetIdentifierResult';
import Lockable from '../repoFactory/utils/Lockable';
import Config from './Config';
import createPersona from './createPersona';
import getTheIdentifier from './getIdentifier';
import getIdentifierByIfi from './getIdentifierByIfi';
import setIdentifierPersona from './setIdentifierPersona';
import createIdentifier from './utils/createIdentifier';

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

    const { persona } = await createPersona(config)({
      name: personaName,
      organisation,
    });

    const { identifier: updatedIdentifier } = await setIdentifierPersona(config)({
      id: identifier.id,
      organisation,
      persona: persona.id,
    });

    return {
      identifier: updatedIdentifier,
      identifierId: identifier.id,
      personaId: persona.id,
      wasCreated,
    };
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
      const {identifier: foundIdentifier, locked} = await getIdentifier({
        id: identifierId,
        organisation,
      });

      if ( locked === true ) {
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
        identifier: foundIdentifier,
        identifierId,
        personaId: foundIdentifier.persona,
        wasCreated: false,
      };

    } catch (err) {
      if (err instanceof NoModel) {
        return create(config)({
          ifi,
          organisation,
          personaName,
        });
      }
      throw err;
    }

  };

type TheCreateUpdateIdentifierPersonaOptions = CreateUpdateIdentifierPersonaOptions & {
  readonly getIdentifier?: (opts: GetIdentifierOptions) => Promise<GetIdentifierResult & Lockable>;
};

const retryCreateUpdateIdentifierPersona = (config: Config) =>
  async (opts: TheCreateUpdateIdentifierPersonaOptions):
  Promise<CreateUpdateIdentifierPersonaResult> => {

  const createUpdateIdentifierPersonaFn = createUpdateIdentifierPersona(config);

  return promiseRetry<CreateUpdateIdentifierPersonaResult>(async (retry) => {
    try {
      return await createUpdateIdentifierPersonaFn(opts);
    } catch (err) {
      /* istanbul ignore else */
      if (err instanceof Locked) {
        return retry(err);
      }
      /* istanbul ignore next */
      throw err;
    }
  }, {
    maxTimeout: 300,
    minTimeout: 30,
    retries: 3,
  });
};

export default retryCreateUpdateIdentifierPersona; // tslint:disable-line:max-file-line-count
