import { ObjectID } from 'mongodb';
import type GetPersonaIdentifierCountOptions from '../repoFactory/options/GetPersonaIdentifierCountOptions';
import type GetPersonaIdentifierCountResult from '../repoFactory/results/GetPersonaIdentifierCountResult';
import type Config from './Config';
import { PERSONA_IDENTIFIERS_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async ({
    filter,
    organisation,
  }: GetPersonaIdentifierCountOptions): Promise<GetPersonaIdentifierCountResult> => {
    const collection = (await config.db).collection(PERSONA_IDENTIFIERS_COLLECTION);

    const result = await collection.count({
      ...filter,
      organisation: new ObjectID(organisation),
    });

    return {
      count: result,
    };
  };
};
