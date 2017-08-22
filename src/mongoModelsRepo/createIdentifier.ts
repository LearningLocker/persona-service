import { ObjectID } from 'mongodb';
import CreateIdentifierOptions from '../repoFactory/options/CreateIdentifierOptions';
import CreateIdentifierResult from '../repoFactory/results/CreateIdentifierResult';
import Config from './Config';
import createOrUpdateIdentifier from './utils/createOrUpdateIdentifier';
import getIdentifierIfiFilter from './utils/getIdentifierIfiFilter';

export default (config: Config) => {
  return async ({persona, ...opts}: CreateIdentifierOptions): Promise<CreateIdentifierResult> => {

    // Filters on the IFI and organisation.
    const filter = getIdentifierIfiFilter(
      opts.ifi,
      opts.organisation,
    );

    // Sets properties when the Identifier is created (not found).
    // Docs: https://docs.mongodb.com/manual/reference/operator/update/setOnInsert/
    const update = {
      $setOnInsert: {
        ifi: opts.ifi,
        organisation: new ObjectID(opts.organisation),
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
