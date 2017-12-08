import NoModel from 'jscommons/dist/errors/NoModel';
import { ObjectID } from 'mongodb';
import GetIdentifierOptions from '../repoFactory/options/GetIdentifierOptions';
import GetIdentifierResult from '../repoFactory/results/GetIdentifierResult';
import Lockable from '../repoFactory/utils/Lockable';
import Config from './Config';
import { PERSONA_IDENTIFIERS_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async (opts: GetIdentifierOptions): Promise<GetIdentifierResult & Lockable> => {
    const collection = (await config.db).collection(PERSONA_IDENTIFIERS_COLLECTION);

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
      organisation: document.organisation.toString(),
      /* istanbul ignore next */ // shouldnt be null..
      persona: document.persona === null ? undefined : document.persona.toString(),
    };
    return { identifier, locked: document.locked };
  };
};
