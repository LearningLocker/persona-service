import NoModel from 'jscommons/dist/errors/NoModel';
import { ObjectId } from 'mongodb';
import type GetAttributeOptions from '../repoFactory/options/GetAttributeOptions';
import type GetAttributeResult from '../repoFactory/results/GetAttributeResult';
import type Config from './Config';
import { PERSONA_ATTRIBUTES_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async (opts: GetAttributeOptions): Promise<GetAttributeResult> => {
    const collection = (await config.db).collection(PERSONA_ATTRIBUTES_COLLECTION);

    const filter = {
      _id: new ObjectId(opts.id),
      organisation: new ObjectId(opts.organisation),
    };

    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find
    const document = await collection.findOne(filter, {});

    if (document === null || document === undefined) {
      throw new NoModel('Attribute');
    }

    const attribute = {
      id: document._id.toString(),
      key: document.key,
      organisation: document.organisation.toString(),
      personaId: document.personaId?.toString(),
      value: document.value,
    };
    return { attribute };
  };
};
