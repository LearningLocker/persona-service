import { ObjectID } from 'mongodb';
import PersonaNotSetAndUnlocked from '../../errors/PersonaNotSetAndUnlocked';
import Identifier from '../../models/Identifier';
import Ifi from '../../models/Ifi';
import Lockable from '../../repoFactory/utils/Lockable';
import Config from '../Config';
import createOrUpdateIdentifier from './createOrUpdateIdentifier';
import getIdentifierIfiFilter from './getIdentifierIfiFilter';

export interface Options {
  readonly organisation: string;
  readonly ifi: Ifi;
  readonly persona?: string;
}

export interface Result {
  readonly identifier: Identifier;
  readonly wasCreated: boolean;
}

export default (config: Config) => {
  return async ({
    persona,
    locked = ((persona === undefined) ? true : false),
    organisation,
    ifi,
  }: Options & Lockable): Promise<Result> => {

    if (!locked && persona === undefined) {
      throw new PersonaNotSetAndUnlocked();
    }

    // check if persona exists, error if not

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
        persona: new ObjectID(persona),
      },
    };

    return createOrUpdateIdentifier(config)({
      filter,
      update,
      upsert: true,
    });
  };
};
