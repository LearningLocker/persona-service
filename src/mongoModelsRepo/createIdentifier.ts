import { ObjectID } from 'mongodb';
import PersonaNotSetAndUnlocked from '../errors/PersonaNotSetAndUnlocked';
import CreateIdentifierOptions from '../repoFactory/options/CreateIdentifierOptions';
import CreateIdentifierResult from '../repoFactory/results/CreateIdentifierResult';
import Lockable from '../repoFactory/utils/Lockable';
import Config from './Config';
import createOrUpdateIdentifier from './utils/createOrUpdateIdentifier';
import getIdentifierIfiFilter from './utils/getIdentifierIfiFilter';

export default (config: Config) => {
  return async ({
    persona,
    locked = ((persona === undefined) ? true : false),
    organisation,
    ifi,
  }: CreateIdentifierOptions & Lockable): Promise<CreateIdentifierResult> => {

    if (!locked && persona === undefined) {
      throw new PersonaNotSetAndUnlocked();
    }

    // Filters on the IFI and organisation.
    const filter = getIdentifierIfiFilter(
      ifi,
      organisation,
    );

    // Sets properties when the Identifier is created (not found).
    // Docs: https://docs.mongodb.com/manual/reference/operator/update/setOnInsert/
    const update = {
      $setOnInsert: {
        ifi,
        locked,
        organisation: new ObjectID(organisation),
        persona: persona === undefined ? undefined : new ObjectID(persona),
      },
    };

    return createOrUpdateIdentifier(config)({
      filter,
      update,
      upsert: true,
    });
  };
};
