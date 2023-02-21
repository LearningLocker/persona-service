import { ObjectID } from 'mongodb';
import type GetPersonaCountOptions from '../repoFactory/options/GetPersonaCountOptions';
import type GetPersonaCountResult from '../repoFactory/results/GetPersonaCountResult';
import type Config from './Config';
import { PERSONAS_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async ({
    filter,
    organisation,
  }: GetPersonaCountOptions): Promise<GetPersonaCountResult> => {
    const collection = (await config.db).collection(PERSONAS_COLLECTION);

    const result = await collection.count({
      ...filter,
      organisation: new ObjectID(organisation),
    });

    return {
      count: result,
    };
  };
};
