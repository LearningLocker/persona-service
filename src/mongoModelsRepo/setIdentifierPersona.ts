import NoModel from 'jscommons/dist/errors/NoModel';
import { ObjectID } from 'mongodb';
import SetIdentifierPersonaOptions from '../repoFactory/options/SetIdentifierPersonaOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: SetIdentifierPersonaOptions) => {
    const collection = (await config.db).collection('personaIdentifiers');

    const filter = {
      _id: new ObjectID(opts.id),
    };

    const update = {
      $set: {
        persona: opts.persona,
      },
    };

    // Updates the Identifier if it exists.
    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#updateOne
    // Docs: http://bit.ly/updateWriteOpResult
    const updateResult = await collection.updateOne(filter, update, {
      upsert: false, // Does not create the Identifier when it doesn't exist.
    });

    // Determines if the Identifier was updated.
    // Docs: https://docs.mongodb.com/manual/reference/command/getLastError/#getLastError.n
    const updatedDocuments = updateResult.matchedCount;
    if (updatedDocuments === 0) {
      /* istanbul ignore next */
      throw new NoModel('Persona Identifier');
    }
  };
};
