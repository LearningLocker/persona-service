import NoModel from 'jscommons/dist/errors/NoModel';
import { MongoError } from 'mongodb';
import Identifier from '../../models/Identifier';
import OverwriteIdentifierResult from '../../repoFactory/results/OverwriteIdentifierResult';
import Config from '../Config';
import { PERSONA_IDENTIFIERS_COLLECTION } from './constants/collections';

export interface CreateOrUpdateIdentifierOptions {
  readonly filter: object;
  readonly update: object;
  readonly upsert: boolean;
}

const createOrUpdateIdentifier = (config: Config) => async ({
  filter,
  update,
  upsert,
}: CreateOrUpdateIdentifierOptions): Promise<OverwriteIdentifierResult> => {
  try {
    const collection = (await config.db).collection(PERSONA_IDENTIFIERS_COLLECTION);
    // Uses findOneAndUpdate as a findOneOrCreate to avoid concurrency issues.
    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate
    // Docs: http://bit.ly/findAndModifyWriteOpResult
    // Update JM 2018-09-12
    // findOneAndupdate is NOT atomic! https://stackoverflow.com/a/37485551
    const opResult = await collection.findOneAndUpdate(filter, update, {
      returnOriginal: false, // Ensures the updated document is returned.
      upsert, // Creates the identifier when it's not found.
    });

    // upsert === false and no model has been found.
    if (opResult.lastErrorObject.updatedExisting === false && opResult.lastErrorObject.n === 0) {
      throw new NoModel('Persona Identifier');
    }

    // Formats the document into an identifier to be returned.
    const document = opResult.value;

     /* istanbul ignore next */ // service should never be being passed a null persona
    const personaString = document.persona ? document.persona.toString() : null;
    const identifier: Identifier = {
      id: document._id.toString(),
      ifi: document.ifi,
      organisation: document.organisation.toString(),
      persona: personaString,
    };

    // Determines if the identifier was created or found.
    // Docs: https://docs.mongodb.com/manual/reference/command/getLastError/#getLastError.n
    const wasCreated = opResult.lastErrorObject.upserted !== undefined;
    return { identifier, wasCreated };
  } catch (err) {
    // if we catch a duplicate error, we can be sure to find it next time round
    const DUPLICATE_DOCUMENT_CODE = 11000;
    if (err instanceof MongoError && err.code === DUPLICATE_DOCUMENT_CODE) {
      /* istanbul ignore next */
      return createOrUpdateIdentifier(config)({filter, update, upsert});
    }
    throw err;
  }
};

export default createOrUpdateIdentifier;
