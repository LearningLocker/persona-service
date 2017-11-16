import { ObjectID } from 'mongodb';
import GetPersonasOptions from '../repoFactory/options/GetPersonasOptions';
import GetPersonasResult from '../repoFactory/results/GetPersonasResult';
// tslint:disable-next-line:no-unused
import ServiceGetPersonasResult from '../serviceFactory/results/GetPersonasResult';

import Config from './Config';

export default (config: Config) => {
  return async ({
    organisation,
    filter = {},
    sort = {},
    skip = 0,
    limit = 0,
  }: GetPersonasOptions): Promise<GetPersonasResult> => {
    const db = await config.db;
    const collection = db.collection('personas');

    const documents = await collection.find({
      ...filter,
      organisation: new ObjectID(organisation),
    })
    .sort(sort)
    .skip(skip)
    .limit(limit);

    const formattedDocuments = documents.map((document: any) => ({
      id: document._id.toString(),
      name: document.name,
      organisation: document.organisation.toString(),
    }));

    const personas = await formattedDocuments.toArray();

    return {
      personas,
    };
  };
};
