import { ObjectID } from 'mongodb';
import type Persona from '../models/Persona';
import type CreatePersonaOptions from '../repoFactory/options/CreatePersonaOptions';
import type CreatePersonaResult from '../repoFactory/results/CreatePersonaResult';
import type Config from './Config';
import { PERSONAS_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async (opts: CreatePersonaOptions): Promise<CreatePersonaResult> => {
    const collection = (await config.db).collection(PERSONAS_COLLECTION);

    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#insertOne
    // Docs: http://bit.ly/insertOneWriteOpResult
    const opResult = await collection.insertOne({
      name: opts.name,
      organisation: new ObjectID(opts.organisation),
    }, {});

    // Formats the persona to be returned.
    const persona: Persona = {
      id: opResult.insertedId.toString(),
      name: opts.name,
      organisation: opts.organisation,
    };

    return { persona };
  };
};
