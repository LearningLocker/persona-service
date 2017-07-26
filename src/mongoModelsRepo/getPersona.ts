import NoModel from 'jscommons/dist/errors/NoModel';
import { defaultTo } from 'lodash';
import { ObjectID } from 'mongodb';
import GetPersonaOptions from '../repoFactory/options/GetPersonaOptions';
import GetPersonaResult from '../repoFactory/results/GetPersonaResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetPersonaOptions): Promise<GetPersonaResult> => {
    const collection = (await config.db).collection('personas');

    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOne
    const document = await collection.findOne({
      _id: new ObjectID(opts.personaId),
    });

    if (document === null || document === undefined) {
      /* istanbul ignore next */
      throw new NoModel('Persona');
    }

    return {
      name: defaultTo<string|undefined>(document.name, undefined),
    };
  };
};
