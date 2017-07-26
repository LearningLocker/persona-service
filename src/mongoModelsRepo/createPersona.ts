import { ObjectID } from 'mongodb';
import Persona from '../models/Persona';
import CreatePersonaOptions from '../repoFactory/options/CreatePersonaOptions';
import CreatePersonaResult from '../repoFactory/results/CreatePersonaResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: CreatePersonaOptions): Promise<CreatePersonaResult> => {
    const collection = (await config.db).collection('personas');

    const docToInsert = {
      name: opts.name,
      organisation: new ObjectID(opts.client.organisation),
    };

    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#insertOne
    // Docs: http://bit.ly/insertOneWriteOpResult
    const opResult = await collection.insertOne(docToInsert, {});

    // Formats the persona to be returned.
    const persona: Persona = {
      id: opResult.insertedId.toString(),
      name: opts.name,
      organisation: opts.client.organisation,
    };

    return { persona };
  };
};
