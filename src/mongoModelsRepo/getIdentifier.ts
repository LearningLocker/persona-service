import NoModel from 'jscommons/dist/errors/NoModel';
import { ObjectID } from 'mongodb';
import GetIdentifierOptions from '../repoFactory/options/GetIdentifierOptions';
import GetIdentifierResult from '../repoFactory/results/GetIdentifierResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetIdentifierOptions): Promise<GetIdentifierResult> => {
    const collection = (await config.db).collection('personaIdentifiers');

    const filter = {
      _id: new ObjectID(opts.id),
      organisation: new ObjectID(opts.organisation),
    };

    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find
    const document = await collection.findOne(filter, {});

    if (document === null || document === undefined) {
      throw new NoModel('Identifier');
    }

    const identifier = {
      id: document._id.toString(),
      ifi: document.ifi,
      locked: document.locked,
      organisation: document.organisation.toString(),
      persona: document.persona.toString(),
    };
    return { identifier };
  };
};
