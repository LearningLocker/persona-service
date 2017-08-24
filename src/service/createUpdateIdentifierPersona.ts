import NoModel from 'jscommons/dist/errors/NoModel';
import Locked from '../errors/Locked';
import CreateUpdateIdentifierPersonaOptions // tslint:disable-line:import-spacing
  from '../serviceFactory/options/CreateUpdateIdentifierPersonaOptions';
import CreateUpdateIdentifierPersonaResult // tslint:disable-line:import-spacing
  from '../serviceFactory/results/CreateUpdateIdentifierPersonaResult';
import Config from './Config';
import service from './index';

const create = (config: Config) =>
  async ({organisation, ifi, personaName}: CreateUpdateIdentifierPersonaOptions):
  Promise<CreateUpdateIdentifierPersonaResult> => {
    const { identifier } = await config.repo.createIdentifier({
      ifi,
      locked: true,
      organisation,
    });

    const { persona } = await service(config).createPersona({
      name: personaName,
      organisation,
    });

    config.repo.setIdentifierPersona({
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

export default (config: Config) =>
  async ({
    organisation,
    ifi,
    personaName,
  }: CreateUpdateIdentifierPersonaOptions): Promise<CreateUpdateIdentifierPersonaResult> => {

    // find the ifi
    try { // Identifier exists, so do nothing.
      const { identifierId } = await service(config).getIdentifierByIfi({
        ifi,
        organisation,
      });
      const {identifier: foundIdentifier, locked} = await config.repo.getIdentifier({
        id: identifierId,
        organisation,
      });

      if ( locked ) {
        // We are locked, wait for unlock
        throw new Locked();
      }

      // Shouldn't happen, as persona should always be set
      if (foundIdentifier.persona === undefined) {
        throw new Error('Identifier should have a persona');
      }

      // What should happen if persona name is different ???

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
