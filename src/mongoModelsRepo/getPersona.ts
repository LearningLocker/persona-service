import { defaultTo } from 'lodash';
import { ObjectID } from 'mongodb';
import NoModelWithId from '../errors/NoModelWithId';
import GetPersonaOptions from '../repoFactory/options/GetPersonaOptions';
import GetPersonaResult from '../repoFactory/results/GetPersonaResult';
import Config from './Config';
import { PERSONAS_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async (opts: GetPersonaOptions): Promise<GetPersonaResult> => {
    const collection = (await config.db).collection(PERSONAS_COLLECTION);

    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOne
    const document = await collection.findOne({
      _id: new ObjectID(opts.personaId),
      organisation: new ObjectID(opts.organisation),
    });

    if (document === null || document === undefined) {
      /* istanbul ignore next */
      throw new NoModelWithId('Persona', opts.personaId);
    }

    return {
      name: defaultTo<string|undefined>(document.name, undefined),
    };
  };
};
