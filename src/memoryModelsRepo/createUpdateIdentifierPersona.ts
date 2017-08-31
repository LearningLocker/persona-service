import NoModel from 'jscommons/dist/errors/NoModel';
import CreateUpdateIdentifierPersonaOptions // tslint:disable-line:import-spacing
  from '../repoFactory/options/CreateUpdateIdentifierPersonaOptions';
import CreateUpdateIdentifierPersonaResult // tslint:disable-line:import-spacing
  from '../repoFactory/results/CreateUpdateIdentifierPersonaResult';
import Config from './Config';
import createIdentifier from './createIdentifier';
import createPersona from './createPersona';
import getIdentifier from './getIdentifier';
import getIdentifierByIfi from './getIdentifierByIfi';
import setIdentifierPersona from './setIdentifierPersona';

const create = (config: Config) =>
  async ({
    organisation,
    ifi,
    personaName,
  }: CreateUpdateIdentifierPersonaOptions):
  Promise<CreateUpdateIdentifierPersonaResult> => {
    const { identifier } = await createIdentifier(config)({
      ifi,
      organisation,
    });

    const { persona } = await createPersona(config)({
      name: personaName,
      organisation,
    });

    await setIdentifierPersona(config)({
      id: identifier.id,
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
      const { identifierId } = await getIdentifierByIfi(config)({
        ifi,
        organisation,
      });
      const {identifier: foundIdentifier} = await getIdentifier(config)({
        id: identifierId,
        organisation,
      });

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
      /* istanbul ignore else */
      if (err instanceof NoModel) {
        return create(config)({
          ifi,
          organisation,
          personaName,
        });
      }
      /* istanbul ignore next */
      throw err;
    }

  };

export default createUpdateIdentifierPersona; // tslint:disable-line:max-file-line-count
