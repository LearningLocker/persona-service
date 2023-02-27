import { ObjectId, type Sort } from 'mongodb';
import type GetPersonasOptions from '../repoFactory/options/GetPersonasOptions';
import type GetPersonasResult from '../repoFactory/results/GetPersonasResult';

import type Config from './Config';
import { PERSONAS_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async ({
    organisation,
    filter = {},
    sort = {},
    skip = 0,
    limit = 0,
  }: GetPersonasOptions): Promise<GetPersonasResult> => {
    const db = await config.db;
    const collection = db.collection(PERSONAS_COLLECTION);

    const documents = collection
      .find({
        ...filter,
        organisation: new ObjectId(organisation),
      })
      .sort(sort as Sort)
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
