import NoModel from 'jscommons/dist/errors/NoModel';
import * as promiseRetry from 'promise-retry';
import Locked from '../errors/Locked';
import CreateUpdateIdentifierPersonaOptions // tslint:disable-line:import-spacing
  from '../serviceFactory/options/CreateUpdateIdentifierPersonaOptions';
import CreateUpdateIdentifierPersonaResult // tslint:disable-line:import-spacing
  from '../serviceFactory/results/CreateUpdateIdentifierPersonaResult';
import Config from './Config';

const create = (config: Config) =>
  async ({organisation, ifi, personaName}: CreateUpdateIdentifierPersonaOptions):
  Promise<CreateUpdateIdentifierPersonaResult> => {
    const { identifier } = await config.repo.createIdentifier({
      ifi,
      locked: true,
      organisation,
    });

    const { persona } = await config.repo.createPersona({
      name: personaName,
      organisation,
    });

    await config.repo.setIdentifierPersona({
      id: identifier.id,
      locked: false,
      organisation,
      persona: persona.id,
    });

    return {
      identifierId: identifier.id,
      personaId: persona.id,
    };
  };

const createUpdateIdentifierPersona = (config: Config) =>
  async ({
    organisation,
    ifi,
    personaName,
  }: CreateUpdateIdentifierPersonaOptions): Promise<CreateUpdateIdentifierPersonaResult> => {

    // find the ifi
    try { // Identifier exists, so do nothing.
      const { identifierId } = await config.repo.getIdentifierByIfi({
        ifi,
        organisation,
      });
      const {identifier: foundIdentifier, locked} = await config.repo.getIdentifier({
        id: identifierId,
        organisation,
      });

      if ( locked === true ) {
        // We are locked, wait for unlock
        throw new Locked();
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
        personaId: foundIdentifier.persona,
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

const retryCreateUpdateIdentifierPersona = (config: Config) =>
  async (opts: CreateUpdateIdentifierPersonaOptions):
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
