import { ObjectID } from 'mongodb';
import GetPersonaIdentifierCountOptions from // tslint:disable-line:import-spacing
  '../repoFactory/options/GetPersonaIdentifierCountOptions';
import GetPersonaIdentifierCountResult from // tslint:disable-line:import-spacing
  '../repoFactory/results/GetPersonaIdentifierCountResult';
import Config from './Config';
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
