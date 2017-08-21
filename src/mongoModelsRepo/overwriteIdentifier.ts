import { ObjectID } from 'mongodb';
import OverwriteIdentifierOptions from '../repoFactory/options/OverwriteIdentifierOptions';
import OverwriteIdentifierResult from '../repoFactory/results/OverwriteIdentifierResult';
import Config from './Config';
import createOrUpdateIdentifier from './utils/createOrUpdateIdentifier';
import getIdentifierIfiFilter from './utils/getIdentifierIfiFilter';

export default (config: Config) => {
  return async ({
    persona,
    ...opts,
  }: OverwriteIdentifierOptions): Promise<OverwriteIdentifierResult> => {

    // Filters on the IFI and organisation.
    const filter = getIdentifierIfiFilter(opts.ifi, opts.organisation);

    // Sets properties when the Identifier is created (not found).
    // Docs: https://docs.mongodb.com/manual/reference/operator/update/setOnInsert/
    const update = {
      $set: {
        persona: new ObjectID(persona),
      },
      $setOnInsert: {
        ifi: opts.ifi,
        organisation: new ObjectID(opts.organisation),
      },
    };

    return createOrUpdateIdentifier(config)({
      filter,
      persona,
      update,
    });
  };
};
