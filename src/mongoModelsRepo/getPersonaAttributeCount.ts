import { ObjectID } from 'mongodb';
import type GetPersonaAttributeCountOptions from '../repoFactory/options/GetPersonaAttributeCountOptions';
import type GetPersonaAttributeCountResult from '../repoFactory/results/GetPersonaAttributeCountResult';
import type Config from './Config';
import { PERSONA_ATTRIBUTES_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async ({
    filter,
    organisation,
  }: GetPersonaAttributeCountOptions): Promise<GetPersonaAttributeCountResult> => {
    const collection = (await config.db).collection(PERSONA_ATTRIBUTES_COLLECTION);

    const result = await collection.count({
      ...filter,
      organisation: new ObjectID(organisation),
    });

    return {
      count: result,
    };
  };
};
