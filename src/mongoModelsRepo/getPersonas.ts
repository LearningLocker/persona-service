import { ObjectID } from 'mongodb';
import GetPersonasOptions from '../repoFactory/options/GetPersonasOptions';
// tslint:disable-next-line:no-unused
import GetPersonasResult, { SingleResult } from '../repoFactory/results/GetPersonasResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetPersonasOptions): Promise<GetPersonasResult> => {
    const collection = (await config.db).collection('personas');

    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOne
    const documents = await collection.find({
      organisation: new ObjectID(opts.organisation),
      ...opts.filter,
    })
    .sort(opts.sort)
    .skip(opts.skip)
    .limit(opts.limit);

    const formattedDocuments = documents.map((document: any) => ({
      id: document._id,
      name: document.name,
      organisation: document.organisation,
    }));

    return formattedDocuments.toArray();
  };
};
