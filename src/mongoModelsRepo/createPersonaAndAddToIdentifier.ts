import { ObjectID } from 'mongodb';
import logger from '../logger';
import { CreatePersonaAndAddToIdentifierOptions } from '../repoFactory/options/CreatePersonaAndAddToIdentifierOptions.types';
import { CreatePersonaAndAddToIdentifierResult } from '../repoFactory/results/CreatePersonaAndAddToIdentifierResult.types';
import Config from './Config';
import createPersona from './createPersona';
import setIdentifierPersona from './setIdentifierPersona';
import createOrUpdateIdentifier from './utils/createOrUpdateIdentifier';

export const createPersonaAndAddToIdentifier = (config: Config) =>
  async ({
    identifier,
    personaName,
  }: CreatePersonaAndAddToIdentifierOptions):
  Promise<CreatePersonaAndAddToIdentifierResult> => {
    if (identifier.persona === undefined) {
      const { persona } = await createPersona(config)({
        name: personaName,
        organisation: identifier.organisation,
      });

      const { identifier: updatedIdentifier } = await setIdentifierPersona(config)({
        id: identifier.id,
        organisation: identifier.organisation,
        persona: persona.id,
      });

      return {
        identifier: updatedIdentifier,
        identifierId: updatedIdentifier.id,
        personaId: updatedIdentifier.persona,
        wasCreated: true,
      };
    } else {
      // Identifier has a persona, but is still locked. This shouldn't happen, but we will unlock it.
      const filter = {
        _id: new ObjectID(identifier.id),
        organisation: new ObjectID(identifier.organisation),
      };
      const update = {
        $set: { locked: false },
        $unset: { lockedAt: '' },
      };

      await createOrUpdateIdentifier(config)({
        filter,
        update,
        upsert: false,
      })

      return {
        identifier,
        identifierId: identifier.id,
        personaId: identifier.persona,
        wasCreated: false,
      };
    }
  };