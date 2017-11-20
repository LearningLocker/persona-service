import { ObjectID } from 'mongodb';
import GetPersonaCountOptions from '../repoFactory/options/GetPersonaCountOptions';
import GetPersonaCountResult from '../repoFactory/results/GetPersonaCountResult';
// tslint:disable-next-line:no-unused
import _GetPersonaCountOptions from '../serviceFactory/options/GetPersonaCountOptions';
// tslint:disable-next-line:no-unused
import _GetPersonaCountResult from '../serviceFactory/results/GetPersonaCountResult';
import Config from './Config';

export default (config: Config) => {
  return async ({
    filter,
    organisation,
  }: GetPersonaCountOptions): Promise<GetPersonaCountResult> => {
    const collection = (await config.db).collection('personas');

    const result = await collection.count({
      ...filter,
      organisation: new ObjectID(organisation),
    });

    return {
      count: result,
    };
  };
};
