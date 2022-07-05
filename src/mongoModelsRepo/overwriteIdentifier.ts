import { ObjectID } from 'mongodb';
import OverwriteIdentifierOptions from '../repoFactory/options/OverwriteIdentifierOptions';
import OverwriteIdentifierResult from '../repoFactory/results/OverwriteIdentifierResult';
import Config from './Config';
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
        persona: new ObjectID(persona),
      },
      $setOnInsert: {
        ifi,
        organisation: new ObjectID(organisation),
      },
      $unset: {
        lockedAt: '',
      }
    };

    return createOrUpdateIdentifier(config)({
      filter,
      update,
      upsert: true,
    });
  };
};
