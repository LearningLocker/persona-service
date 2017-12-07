import NoModel from 'jscommons/dist/errors/NoModel';
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

  const collection = (await config.db).collection(PERSONA_IDENTIFIERS_COLLECTION);

  // Uses findOneAndUpdate as a findOneOrCreate to avoid concurrency issues.
  // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate
  // Docs: http://bit.ly/findAndModifyWriteOpResult
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
};

export default createOrUpdateIdentifier;
