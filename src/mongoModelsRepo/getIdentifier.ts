import NoModel from 'jscommons/dist/errors/NoModel';
import { ObjectID } from 'mongodb';
import GetIdentifierOptions from '../repoFactory/options/GetIdentifierOptions';
import GetIdentifierResult from '../repoFactory/results/GetIdentifierResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetIdentifierOptions): Promise<GetIdentifierResult> => {
    const collection = (await config.db).collection('personaIdentifiers');

    // Filters on the IFI and organisation.
    const filter = {
      id: new ObjectID(opts.id),
      organisation: new ObjectID(opts.client.organisation),
    };

    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find
    const document = await collection.findOne(filter, {});

    if (document === null || document === undefined) {
      throw new NoModel('Identifier');
    }

    const identifier = document;
    return { identifier };
  };
};
