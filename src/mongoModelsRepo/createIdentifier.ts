import { MongoError, ObjectID } from 'mongodb';
import Conflict from '../errors/Conflict';
import CreateIdentifierOptions from '../repoFactory/options/CreateIdentifierOptions';
import CreateIdentifierResult from '../repoFactory/results/CreateIdentifierResult';
import Config from './Config';
import { PERSONA_IDENTIFIERS_COLLECTION } from './utils/constants/collections';
import { DUPLICATE_KEY } from './utils/constants/errorcodes';
import getPersonaById from './utils/getPersonaById';

export default (config: Config) => {
  return async ({
    persona,
    organisation,
    ifi,
  }: CreateIdentifierOptions): Promise<CreateIdentifierResult> => {
    const collection = (await config.db).collection(PERSONA_IDENTIFIERS_COLLECTION);

    // check persona exists
    await getPersonaById(config)({ organisation, personaId: persona });

    try {
      const result = await collection.insertOne({
        ifi,
        organisation: new ObjectID(organisation),
        persona: new ObjectID(persona),
      });
      const identifierId = result.insertedId.toString();
      const identifier = {
        id: identifierId,
        ifi,
        organisation,
        persona,
      };

      return { identifier };
    } catch (err) {
      if (err instanceof MongoError && err.code === DUPLICATE_KEY) {
        throw new Conflict();
      }
      throw err;
    }
  };
};
