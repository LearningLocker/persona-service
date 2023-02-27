import { ObjectId } from 'mongodb';
import type OverwriteIdentifierOptions from '../repoFactory/options/OverwriteIdentifierOptions';
import type OverwriteIdentifierResult from '../repoFactory/results/OverwriteIdentifierResult';
import type Config from './Config';
import createOrUpdateIdentifier from './utils/createOrUpdateIdentifier';
import getIdentifierIfiFilter from './utils/getIdentifierIfiFilter';
import getPersonaById from './utils/getPersonaById';

export default (config: Config) => {
  return async ({
    persona,
    organisation,
    ifi,
  }: OverwriteIdentifierOptions): Promise<OverwriteIdentifierResult> => {
    // check persona exists
    await getPersonaById(config)({ organisation, personaId: persona });

    // Filters on the IFI and organisation.
    const filter = getIdentifierIfiFilter(ifi, organisation);

    // Sets properties when the Identifier is created (not found).
    // Docs: https://docs.mongodb.com/manual/reference/operator/update/setOnInsert/
    const update = {
      $set: {
        locked: false,
        persona: new ObjectId(persona),
      },
      $setOnInsert: {
        ifi,
        organisation: new ObjectId(organisation),
      },
      $unset: {
        lockedAt: '',
      },
    };

    return await createOrUpdateIdentifier(config)({
      filter,
      update,
      upsert: true,
    });
  };
};
