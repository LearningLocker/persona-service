import { ObjectID } from 'mongodb';
import Identifier from '../models/Identifier';
import OverwriteIdentifierOptions from '../repoFactory/options/OverwriteIdentifierOptions';
import OverwriteIdentifierResult from '../repoFactory/results/OverwriteIdentifierResult';
import Config from './Config';
import getIdentifierIfiFilter from './utils/getIdentifierIfiFilter';

export default (config: Config) => {
  return async (opts: OverwriteIdentifierOptions): Promise<OverwriteIdentifierResult> => {
    const collection = (await config.db).collection('personaIdentifiers');

    // Filters on the IFI and organisation.
    const filter = getIdentifierIfiFilter(opts.ifi, opts.client.organisation);

    // Sets properties when the Identifier is created (not found).
    // Docs: https://docs.mongodb.com/manual/reference/operator/update/setOnInsert/
    const update = {
      $set: {
        persona: new ObjectID(opts.personaId),
      },
      $setOnInsert: {
        ifi: opts.ifi,
        organisation: new ObjectID(opts.client.organisation),
      },
    };

    // Uses findOneAndUpdate as a findOneOrCreate to avoid concurrency issues.
    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate
    // Docs: http://bit.ly/findAndModifyWriteOpResult
    const opResult = await collection.findOneAndUpdate(filter, update, {
      returnOriginal: false, // Ensures the updated document is returned.
      upsert: true, // Creates the identifier when it's not found.
    });

    // Formats the document into an identifier to be returned.
    const document = opResult.value;
    const identifier: Identifier = {
      id: document._id.toString(),
      ifi: document.ifi,
      organisation: document.organisation.toString(),
      persona: opts.personaId,
    };

    // Determines if the identifier was created or found.
    // Docs: https://docs.mongodb.com/manual/reference/command/getLastError/#getLastError.n
    const wasCreated = opResult.lastErrorObject.upserted !== undefined;

    return { identifier, wasCreated };
  };
};
