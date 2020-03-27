import { ObjectID } from 'mongodb';
import Persona from '../models/Persona';
import CreatePersonaOptions from '../repoFactory/options/CreatePersonaOptions';
import CreatePersonaResult from '../repoFactory/results/CreatePersonaResult';
import Config from './Config';
import { PERSONAS_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async (opts: CreatePersonaOptions): Promise<CreatePersonaResult> => {
    const collection = (await config.db).collection(PERSONAS_COLLECTION);
    const personaId = new ObjectID();

    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#insertOne
    // Docs: http://bit.ly/insertOneWriteOpResult
    const opResult = await collection.insertOne({
      _id: personaId,
      name: opts.name || personaId.toString(),
      organisation: new ObjectID(opts.organisation),
    }, {});

    // Formats the persona to be returned.
    const persona: Persona = {
      id: opResult.insertedId.toString(),
      name: opts.name || personaId.toString(),
      organisation: opts.organisation,
    };

    return { persona };
  };
};
